const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Import routes
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/emergency', emergencyRoutes);

// OAuth2 configuration
const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      "844848248579-aqdb8bub62lse9r1ei926nu2ilan4lho.apps.googleusercontent.com",
      "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",
      "https://developers.google.com/oauthplayground"
    );

    // Add required scopes
    const SCOPES = [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.modify'
    ];

    oauth2Client.setCredentials({
      refresh_token: "1//040A1Zgnx1bs4CgYIARAAGAQSNwF-L9Ir7irYjP5D1dBkLi7bjqZKNWLjoaeGRx9HIIR6YYh4rzy0izRHZGLnWLyeGkGPI6qy0bQ"
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.error('Failed to get access token:', err);
          reject(err);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "devtree741@gmail.com",
        clientId: "844848248579-aqdb8bub62lse9r1ei926nu2ilan4lho.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//040A1Zgnx1bs4CgYIARAAGAQSNwF-L9Ir7irYjP5D1dBkLi7bjqZKNWLjoaeGRx9HIIR6YYh4rzy0izRHZGLnWLyeGkGPI6qy0bQ",
        accessToken: accessToken
      }
    });

    // Verify the connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    return transporter;
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
};

// Email endpoint
app.post('/api/email/send', async (req, res) => {
  try {
    const { to, from, subject, body } = req.body;
    
    // Get transporter with OAuth2
    const transporter = await createTransporter();

    const mailOptions = {
      from: {
        name: "Medical Center Admin",
        address: "devtree741@gmail.com" // Always use the authenticated email as sender
      },
      to: to,
      subject: subject,
      text: body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    res.json({
      success: true,
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Emergency API available at http://localhost:${PORT}/api/emergency`);
}); 