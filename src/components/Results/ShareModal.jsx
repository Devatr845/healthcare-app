import React, { useState } from 'react';
import { 
  FiX, FiMail, FiCopy, FiCheck, FiFileText, 
  FiCalendar, FiShield, FiInfo 
} from 'react-icons/fi';
import { RiWhatsappLine } from 'react-icons/ri';
import './ResultsPage.css';

const ShareModal = ({ test, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareOption, setShareOption] = useState('email'); // email, whatsapp, link
  
  // Mock function to handle sending via email
  const handleSendEmail = (e) => {
    e.preventDefault();
    // In a real app, this would connect to an API to send the email
    console.log('Sending test results to:', email);
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmail('');
    }, 3000);
  };
  
  // Mock function to share via WhatsApp
  const handleShareWhatsApp = () => {
    // In a real app, this would generate a WhatsApp sharing link
    const message = `Check out my test results for ${test.name} from ${new Date(test.date).toLocaleDateString()}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Mock function to copy sharing link
  const handleCopyLink = () => {
    // In a real app, this would generate and copy a secure sharing link
    navigator.clipboard.writeText(`https://example.com/share/results/${test.id}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="share-modal" onClick={e => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Share Test Results</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        
        <div className="share-modal-content">
          <div className="test-share-info">
            <div className="share-test-icon">
              <FiFileText />
            </div>
            <div className="share-test-details">
              <h4>{test?.name || 'Test Results'}</h4>
              <div className="share-test-meta">
                <span className="share-test-date">
                  <FiCalendar />
                  {test?.date ? new Date(test.date).toLocaleDateString() : 'Date not available'}
                </span>
                <span className="share-test-doctor">Doctor: {test?.doctor || 'Unknown'}</span>
              </div>
            </div>
          </div>
          
          <div className="share-options-tabs">
            <button 
              className={`share-option-tab ${shareOption === 'email' ? 'active' : ''}`}
              onClick={() => setShareOption('email')}
            >
              <FiMail />
              <span>Email</span>
            </button>
            <button 
              className={`share-option-tab ${shareOption === 'whatsapp' ? 'active' : ''}`}
              onClick={() => setShareOption('whatsapp')}
            >
              <RiWhatsappLine />
              <span>WhatsApp</span>
            </button>
            <button 
              className={`share-option-tab ${shareOption === 'link' ? 'active' : ''}`}
              onClick={() => setShareOption('link')}
            >
              <FiCopy />
              <span>Copy Link</span>
            </button>
          </div>
          
          <div className="share-option-content">
            {shareOption === 'email' && (
              <form className="email-share-form" onSubmit={handleSendEmail}>
                <div className="form-field">
                  <label htmlFor="share-email">Recipient Email</label>
                  <input 
                    type="email" 
                    id="share-email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter recipient's email address"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="send-email-btn"
                  disabled={emailSent}
                >
                  {emailSent ? (
                    <>
                      <FiCheck />
                      <span>Email Sent</span>
                    </>
                  ) : (
                    <>
                      <FiMail />
                      <span>Send Email</span>
                    </>
                  )}
                </button>
              </form>
            )}
            
            {shareOption === 'whatsapp' && (
              <div className="whatsapp-share">
                <p>Share your test results directly via WhatsApp.</p>
                <button className="whatsapp-share-btn" onClick={handleShareWhatsApp}>
                  <RiWhatsappLine />
                  <span>Share via WhatsApp</span>
                </button>
              </div>
            )}
            
            {shareOption === 'link' && (
              <div className="link-share">
                <p>Generate a secure link to share your test results. The link will expire after 7 days.</p>
                <div className="copy-link-container">
                  <input 
                    type="text" 
                    value={`https://example.com/share/results/${test?.id || '123456'}`} 
                    readOnly
                  />
                  <button 
                    className="copy-link-btn"
                    onClick={handleCopyLink}
                  >
                    {linkCopied ? <FiCheck /> : <FiCopy />}
                  </button>
                </div>
                {linkCopied && (
                  <div className="copy-confirmation">
                    <FiCheck />
                    <span>Link copied to clipboard</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="share-privacy-notice">
            <FiShield />
            <p>
              Your medical data is encrypted and secure. Recipients will need to verify their 
              identity to access the results.
              <a href="#privacy-policy" onClick={(e) => e.preventDefault()}>Learn more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 