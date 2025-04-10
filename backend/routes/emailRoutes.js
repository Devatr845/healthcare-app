const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/emailService');

router.post('/send', async (req, res) => {
  try {
    const { to, from, subject, body } = req.body;
    
    const result = await sendEmail(to, subject, body, from);
    
    if (result.success) {
      res.json({ success: true, messageId: result.messageId });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Email route error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 