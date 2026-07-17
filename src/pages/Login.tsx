import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { loginWithEmail, loginWithGoogle, mockLogin, sendPasswordReset } = useAuth();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Password reset states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      
      // Automatic role lookup in our users list
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const dbUser = allUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      if (dbUser) {
        mockLogin(email, dbUser.role, dbUser.displayName);
      } else {
        // Fallback for new email
        mockLogin(email, 'user', email.split('@')[0]);
      }
      navigate('/dashboard');
    } catch (err) {
      alert("Failed to login. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const googleEmail = "googleuser@gmail.com";
      const dbUser = allUsers.find((u: any) => u.email.toLowerCase() === googleEmail.toLowerCase());

      if (dbUser) {
        mockLogin(googleEmail, dbUser.role, dbUser.displayName);
      } else {
        mockLogin(googleEmail, 'user', 'Google Supporter');
      }
      navigate('/dashboard');
    } catch (err) {
      alert("Google Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      alert("OTP sent to mobile: +91 " + phone + ". Enter '123456' to confirm.");
    } else {
      if (otpCode === '123456') {
        const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
        const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
        const dbUser = allUsers.find((u: any) => u.phone && u.phone.replace(/\s+/g, '').includes(phone));

        const userEmail = `${phone}@mobile.lifechangingtrust.org`;
        if (dbUser) {
          mockLogin(dbUser.email || userEmail, dbUser.role, dbUser.displayName);
        } else {
          mockLogin(userEmail, 'user', `User ${phone}`);
        }
        navigate('/dashboard');
      } else {
        alert("Invalid OTP code. Please enter '123456' to simulate success.");
      }
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(resetEmail);
      setResetSuccess(true);
    } catch (err: any) {
      alert(err.message || "Failed to send reset link. User may not exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-light-gray)', minHeight: '80vh', padding: '60px 0', display: 'flex', alignItems: 'center' }}>
      <div className="form-container">
        {isForgotPassword ? (
          <div>
            <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '10px' }}>Reset Password</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Enter your registered email address to receive a secure password reset link.
            </p>

            {resetSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: '6px', border: '1px solid var(--color-green)', marginBottom: '20px' }}>
                <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Reset Link Sent!</h5>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: '0 0 15px 0' }}>We have sent a recovery email to {resetEmail}.</p>
                <button className="btn btn-outline" style={{ padding: '6px 15px', fontSize: '0.8rem' }} onClick={() => { setIsForgotPassword(false); setResetSuccess(false); setResetEmail(''); }}>Back to Login</button>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--color-muted)' }} />
                    <input
                      type="email"
                      className="form-control"
                      style={{ paddingLeft: '45px' }}
                      placeholder="name@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                  {loading ? "Sending..." : "Send Password Reset Link"}
                </button>
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(false); }} style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>Back to Login</a>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '10px' }}>Sign In to Portal</h2>
            <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
              Access your coordinator dashboard, order records, or tax receipts.
            </p>

            {/* Toggle Login Method */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', background: 'var(--color-light-gray)', padding: '4px', borderRadius: 'var(--border-radius-sm)' }}>
              <button
                className={`btn ${loginMethod === 'email' ? 'btn-white' : ''}`}
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: loginMethod === 'email' ? 'white' : 'transparent', border: 'none', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}
                onClick={() => setLoginMethod('email')}
              >
                Email Login
              </button>
              <button
                className={`btn ${loginMethod === 'mobile' ? 'btn-white' : ''}`}
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: loginMethod === 'mobile' ? 'white' : 'transparent', border: 'none', borderRadius: 'var(--border-radius-sm)', cursor: 'pointer' }}
                onClick={() => setLoginMethod('mobile')}
              >
                Mobile & OTP
              </button>
            </div>

            {loginMethod === 'email' ? (
              <form onSubmit={handleEmailLogin}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--color-muted)' }} />
                    <input
                      type="email"
                      className="form-control"
                      style={{ paddingLeft: '45px' }}
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label className="form-label" style={{ margin: 0 }}>Password</label>
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsForgotPassword(true); }} style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>Forgot Password?</a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--color-muted)' }} />
                    <input
                      type="password"
                      className="form-control"
                      style={{ paddingLeft: '45px' }}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
                  {loading ? "Verifying..." : "Login With Email"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleMobileSubmit}>
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-muted)' }}>+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ paddingLeft: '55px' }}
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      disabled={otpSent}
                      required
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="form-group">
                    <label className="form-label">Confirmation OTP Code</label>
                    <div style={{ position: 'relative' }}>
                      <KeyRound size={16} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--color-muted)' }} />
                      <input
                        type="text"
                        className="form-control"
                        style={{ paddingLeft: '45px' }}
                        placeholder="Enter 123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
                  {otpSent ? "Verify OTP Code" : "Send OTP"}
                </button>
              </form>
            )}

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--color-muted)', fontSize: '0.8rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-light)' }}></div>
              <span style={{ padding: '0 10px' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-gray-light)' }}></div>
            </div>

            {/* Google Login */}
            <button onClick={handleGoogleLogin} className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--color-gray-light)', color: 'var(--color-dark)', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.182 4.2a5.724 5.724 0 0 1-5.718-5.73 5.724 5.724 0 0 1 5.718-5.73c2.25 0 4.238 1.155 5.373 2.903l3.324-3.325A11.168 11.168 0 0 0 13.945 2C7.79 2 2.8 6.99 2.8 13.14s4.99 11.14 11.145 11.14c6.409 0 11.082-4.5 11.082-11.28a9.42 9.42 0 0 0-.17-1.715H12.24z"/></svg>
              <span>Login with Google</span>
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '25px' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Register Now</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
