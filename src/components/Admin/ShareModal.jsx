import React, { useState } from 'react';
import { FiX, FiMail, FiLink2, FiDownload } from 'react-icons/fi';
import './ShareModal.css';

const ShareModal = ({ onClose, activityData }) => {
  const [email, setEmail] = useState('');
  const [shareOption, setShareOption] = useState('link');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareLink = `${window.location.origin}/activity-logs/${activityData.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailShare = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would typically make an API call to send the email
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      alert(`Share link sent to ${email}`);
      onClose();
    } catch (error) {
      alert('Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="share-modal">
        <div className="modal-header">
          <h3>Share Activity Log</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="share-options">
          <button
            className={`share-option-btn ${shareOption === 'link' ? 'active' : ''}`}
            onClick={() => setShareOption('link')}
          >
            <FiLink2 /> Share Link
          </button>
          <button
            className={`share-option-btn ${shareOption === 'email' ? 'active' : ''}`}
            onClick={() => setShareOption('email')}
          >
            <FiMail /> Email
          </button>
        </div>

        {shareOption === 'link' ? (
          <div className="share-link-section">
            <div className="link-input-group">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="share-link-input"
              />
              <button 
                className="copy-btn"
                onClick={handleCopyLink}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailShare} className="email-share-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter recipient's email"
                required
              />
            </div>
            <button 
              type="submit" 
              className="share-submit-btn"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShareModal; 