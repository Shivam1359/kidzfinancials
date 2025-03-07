import { useState } from 'react';
import useAsync from '../../hooks/useAsync';
import { sendOtp, verifyOtp } from '../../services/authService';

const OtpForm = ({ email, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  
  const { loading: sendingOtp, error: sendError, execute: sendOtpAsync } = useAsync(sendOtp);
  const { loading: verifying, error: verifyError, execute: verifyOtpAsync } = useAsync(verifyOtp);

  const handleSendOtp = async () => {
    try {
      await sendOtpAsync(email);
      setOtpSent(true);
    } catch (error) {
      // Error is already handled by useAsync
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtpAsync(email, otp);
      onVerified();
    } catch (error) {
      // Error is already handled by useAsync
    }
  };

  return (
    <div className="otp-section">
      {!otpSent ? (
        <button 
          onClick={handleSendOtp} 
          className="btn dark-btn"
          disabled={sendingOtp}
        >
          {sendingOtp ? 'Sending...' : 'Send OTP'}
        </button>
      ) : (
        <>
          <input 
            type='text' 
            placeholder='Enter OTP' 
            value={otp}
            onChange={(e) => setOtp(e.target.value)} 
          />
          <button 
            onClick={handleVerifyOtp} 
            className="btn dark-btn"
            disabled={verifying}
          >
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </button>
          {sendError && <p className="error-message">{sendError}</p>}
          {verifyError && <p className="error-message">{verifyError}</p>}
        </>
      )}
    </div>
  );
};

export default OtpForm;
