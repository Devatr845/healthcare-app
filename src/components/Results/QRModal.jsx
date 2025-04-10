import React, { useState } from 'react';
import { FiX, FiDownload, FiShare2, FiCheckCircle, FiInfo, FiHelpCircle } from 'react-icons/fi';
import './QRModal.css';

const QRModal = ({ test, onClose }) => {
  // For a real app, you would use a library like qrcode.react to generate actual QR codes
  // Here we're just mocking the UI
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const handleDownloadQR = () => {
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
  };
  
  const handleShareQR = () => {
    // Share functionality would be implemented here
  };
  
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="qr-modal-title">
      <div className="qr-modal" onClick={e => e.stopPropagation()}>
        <div className="qr-modal-header">
          <h3 id="qr-modal-title" className="qr-modal-title">QR Code for Test Results</h3>
          <button className="close-button" onClick={onClose} aria-label="Close">
            <FiX aria-hidden="true" />
          </button>
        </div>
        
        <div className="qr-content">
          <div className="qr-test-info">
            <p className="qr-test-name">{test?.name || 'Test Results'}</p>
            <p className="qr-test-date">
              {test?.date ? new Date(test.date).toLocaleDateString() : 'Date not available'}
            </p>
          </div>
          
          <div className="qr-container">
            {/* Mock QR code - in a real app, would use an actual QR code library */}
            <div className="qr-code">
              <div className="qr-pattern">
                <div className="qr-corner top-left"></div>
                <div className="qr-corner top-right"></div>
                <div className="qr-corner bottom-left"></div>
                <div className="qr-corner bottom-right"></div>
                <div className="qr-center"></div>
              </div>
            </div>
          </div>
          
          <div className="qr-info">
            <p>Scan this QR code with your mobile device to securely access your test results.</p>
            <p className="qr-expiry">This QR code will expire in 24 hours for security reasons.</p>
            <button 
              className="help-button" 
              onClick={() => setShowHelp(!showHelp)}
              aria-expanded={showHelp}
              aria-label="How to use QR code"
            >
              <FiHelpCircle aria-hidden="true" /> How to use this QR code
            </button>
            
            {showHelp && (
              <div className="qr-help-panel">
                <h4><FiInfo aria-hidden="true" /> How to use this QR code:</h4>
                <ol>
                  <li>Open the camera app on your smartphone</li>
                  <li>Point your camera at the QR code</li>
                  <li>Tap the notification that appears</li>
                  <li>You'll be directed to a secure page with your test results</li>
                  <li>Log in with your patient credentials if prompted</li>
                </ol>
                <p className="qr-security-note">
                  <strong>Security Note:</strong> This QR code only works for authorized users and expires after 24 hours.
                </p>
              </div>
            )}
          </div>
          
          <div className="qr-actions">
            <button 
              className="qr-button download-button" 
              onClick={handleDownloadQR}
              aria-label="Download QR code"
            >
              <FiDownload aria-hidden="true" /> Download QR
            </button>
            <button 
              className="qr-button share-button" 
              onClick={handleShareQR}
              aria-label="Share QR code"
            >
              <FiShare2 aria-hidden="true" /> Share QR
            </button>
          </div>
          
          {showFeedback && (
            <div className="qr-feedback" role="status">
              <FiCheckCircle aria-hidden="true" /> QR code downloaded successfully
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRModal; 