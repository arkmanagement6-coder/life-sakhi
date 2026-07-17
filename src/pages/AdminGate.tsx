import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminGate: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithEmail, mockLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Connect to auth context
      await loginWithEmail(email, password);
      
      // Auto-detect and run mock fallback if it is the admin credentials
      if (email.toLowerCase() === 'admin@gmail.com' && password === '123456') {
        mockLogin(email, 'admin', 'Ravi Dhakre');
      }

      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg('Invalid Administrator Credentials. Access Denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #051F5B 0%, #031030 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Outfit', 'Inter', sans-serif"
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(10, 60, 140, 0.1)',
            color: '#0A3C8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px auto'
          }}>
            <Lock size={30} />
          </div>
          <h3 style={{ margin: '0 0 8px 0', fontWeight: 800, color: '#0A3C8C', fontSize: '1.5rem' }}>Administration Gate</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '0.85rem', lineHeight: '1.4' }}>
            Authorized personnel only. Access logs are monitored.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            background: 'rgba(244, 67, 54, 0.08)',
            border: '1px solid rgba(244, 67, 54, 0.15)',
            color: '#f44336',
            padding: '10px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#444', marginBottom: '6px' }}>Secure Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#888' }} />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  border: '1px solid #dcdfe6',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0A3C8C'}
                onBlur={(e) => e.target.style.borderColor = '#dcdfe6'}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#444', marginBottom: '6px' }}>Secure Passkey</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#888' }} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 40px',
                  border: '1px solid #dcdfe6',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0A3C8C'}
                onBlur={(e) => e.target.style.borderColor = '#dcdfe6'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#0A3C8C',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#051F5B'}
            onMouseOut={(e) => e.currentTarget.style.background = '#0A3C8C'}
          >
            {loading ? 'Authenticating Gate...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminGate;
