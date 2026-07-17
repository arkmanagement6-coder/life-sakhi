import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { loginWithEmail, loginWithGoogle, mockLogin } = useAuth();
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');

  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      // In mock mode, update profile with selected role from helper dropdown
      mockLogin(email, selectedRole);
      navigate('/');
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
      navigate('/');
    } catch (err) {
      alert("Google Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      // Simulate sending OTP
      setOtpSent(true);
      alert("OTP sent to mobile: +91 " + phone + ". Enter '123456' to confirm.");
    } else {
      if (otpCode === '123456') {
        mockLogin(`${phone}@mobile.lifechangingtrust.org`, selectedRole);
        navigate('/');
      } else {
        alert("Invalid OTP code. Please enter '123456' to simulate success.");
      }
    }
  };

  const roles = [
    { code: 'user', name: 'Normal User' },
    { code: 'volunteer', name: 'Volunteer' },
    { code: 'donor', name: 'Donor' },
    { code: 'women_distributor', name: 'Women Distributor (Life Sakhi)' },
    { code: 'district_coordinator', name: 'District Coordinator' },
    { code: 'block_coordinator', name: 'Block Coordinator' },
    { code: 'state_coordinator', name: 'State Coordinator' },
    { code: 'csr_partner', name: 'CSR Partner' },
    { code: 'corporate_partner', name: 'Corporate Partner' },
    { code: 'hospital', name: 'Hospital Partner' },
    { code: 'school', name: 'School Partner' },
    { code: 'ngo_partner', name: 'NGO Partner' },
    { code: 'doctor', name: 'Doctor / Medical Volunteer' }
  ];

  return (
    <div style={{ background: 'var(--color-light-gray)', minHeight: '80vh', padding: '60px 0', display: 'flex', alignItems: 'center' }}>
      <div className="form-container">
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

        {/* Auth Role Select Helper */}
        <div className="form-group">
          <label className="form-label">Sign in as Role (Simulated)</label>
          <select 
            value={selectedRole} 
            onChange={(e) => setSelectedRole(e.target.value)} 
            className="form-control form-select"
            style={{ background: 'rgba(140, 198, 62, 0.08)', borderColor: 'var(--color-green)' }}
          >
            {roles.map(r => (
              <option key={r.code} value={r.code}>{r.name}</option>
            ))}
          </select>
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
                <a href="#" onClick={(e) => { e.preventDefault(); alert("Simulating forgot password email trigger..."); }} style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>Forgot Password?</a>
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
    </div>
  );
};

export default Login;
