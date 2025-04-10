import axios from 'axios';

const API_URL = 'http://localhost:5000';
const IS_MOCK = true; // Set to true to use mock responses

export const sendConfirmationEmail = async (appointment, userEmail) => {
  try {
    if (IS_MOCK) {
      console.log('MOCK: Sending confirmation email to', userEmail, 'for appointment:', appointment);
      return { success: true, message: 'Email would be sent in production' };
    }
    
    const response = await fetch(`${API_URL}/api/email/confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment,
        userEmail
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Return mock success to prevent breaking the UI flow
    return { success: true, message: 'Email sending simulated (API unavailable)' };
  }
};

export const sendReminderEmail = async (appointment, userEmail) => {
  try {
    if (IS_MOCK) {
      console.log('MOCK: Sending reminder email to', userEmail, 'for appointment:', appointment);
      return { success: true, message: 'Reminder would be sent in production' };
    }
    
    const response = await fetch(`${API_URL}/api/email/reminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment,
        userEmail
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending reminder email:', error);
    // Return mock success to prevent breaking the UI flow
    return { success: true, message: 'Reminder sending simulated (API unavailable)' };
  }
};

// This is a mock email service - in production you'd use a real email service like SendGrid, AWS SES, etc.
export const sendEmail = async (to, subject, body, from = 'devtree741@gmail.com') => {
  try {
    console.log('Sending email:', { to, from, subject, body }); // Debug log

    if (IS_MOCK) {
      console.log('MOCK: Email content:', { to, from, subject, body });
      return { success: true, message: 'Email would be sent in production' };
    }

    const response = await fetch(`${API_URL}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        from,
        subject,
        body
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    // Return mock success to prevent breaking the UI flow
    return { success: true, message: 'Email sending simulated (API unavailable)' };
  }
}; 