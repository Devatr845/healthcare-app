const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_EMAIL,
      accessToken,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN
    }
  });

  return transporter;
};

const generateEmailContent = (appointment) => {
  const appointmentDate = new Date(appointment.date).toLocaleDateString();
  const googleCalendarLink = generateGoogleCalendarLink(appointment);
  
  return {
    subject: `Appointment Confirmation - ${appointment.doctor}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3B82F6;">Your Appointment is Confirmed!</h2>
        
        <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Appointment Details</h3>
          <p><strong>Doctor:</strong> ${appointment.doctor}</p>
          <p><strong>Date:</strong> ${appointmentDate}</p>
          <p><strong>Time:</strong> ${appointment.time}</p>
          <p><strong>Type:</strong> ${
            appointment.type === 'video' ? 'Video Consultation' : 'In-person Visit'
          }</p>
          ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
        </div>

        <div style="margin: 20px 0;">
          <a href="${googleCalendarLink}" 
             style="background: #3B82F6; color: white; padding: 10px 20px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Add to Google Calendar
          </a>
        </div>

        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 14px;">
            Need to make changes? You can 
            <a href="#" style="color: #3B82F6; text-decoration: none;">reschedule</a> 
            or 
            <a href="#" style="color: #3B82F6; text-decoration: none;">cancel</a> 
            your appointment.
          </p>
        </div>
      </div>
    `
  };
};

const generateGoogleCalendarLink = (appointment) => {
  const startTime = `${appointment.date}T${appointment.time}:00`;
  const endTime = new Date(new Date(startTime).getTime() + 30 * 60000).toISOString();

  const event = {
    text: `Appointment with ${appointment.doctor}`,
    details: appointment.notes || '',
    location: appointment.type === 'video' ? 'Video Call' : 'Hospital Address',
    dates: `${startTime}/${endTime}`
  };

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
    encodeURIComponent(event.text)
  }&details=${
    encodeURIComponent(event.details)
  }&location=${
    encodeURIComponent(event.location)
  }&dates=${
    event.dates.replace(/[-:]/g, '')
  }`;
};

const sendEmail = async (to, subject, body, from = 'devtree741@gmail.com') => {
  try {
    // Create mail options
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: body
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

module.exports = {
  sendEmail
}; 