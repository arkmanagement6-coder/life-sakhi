import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldAlert, Award, Send, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LangContext';

const Footer: React.FC = () => {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3>Life Changing Educational & Charitable Trust</h3>
            <p>
              Life Changing Educational & Charitable Trust is a registered non-profit organization (80G, 12A, CSR certified) working since 2022 to uplift rural communities through targeted programs.
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-green)', fontWeight: 600 }}>
              <Award size={16} />
              <span>Life Sakhi Initiative - 2026</span>
            </p>
            <div style={{ marginTop: '20px' }}>
              <h5 style={{ color: 'var(--color-white)', marginBottom: '8px' }}>Subscribe to Newsletter</h5>
              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-green)', fontSize: '0.85rem' }}>
                  <CheckCircle size={16} />
                  <span>Subscribed Successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="newsletter-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/">{t('home')}</Link></li>
              <li className="footer-link-item"><Link to="/health">{t('healthPrograms')}</Link></li>
              <li className="footer-link-item"><Link to="/education">{t('educationPrograms')}</Link></li>
              <li className="footer-link-item"><Link to="/employment">{t('employmentPrograms')}</Link></li>
              <li className="footer-link-item"><Link to="/women-empowerment">{t('womenEmpowerment')}</Link></li>
              <li className="footer-link-item"><Link to="/projects">{t('projects')}</Link></li>
              <li className="footer-link-item"><Link to="/campaigns">{t('campaigns')}</Link></li>
              <li className="footer-link-item"><Link to="/about">{t('about')}</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div className="footer-links-col">
            <h4>Our Programs</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><Link to="/health#life-sakhi">Life Sakhi (Women Health)</Link></li>
              <li className="footer-link-item"><Link to="/health#menstrual">Menstrual Hygiene Awareness</Link></li>
              <li className="footer-link-item"><Link to="/health#distribution">Sanitary Pad Distribution</Link></li>
              <li className="footer-link-item"><Link to="/education#child">Rural Education Support</Link></li>
              <li className="footer-link-item"><Link to="/education#digital">Digital Literacy Camps</Link></li>
              <li className="footer-link-item"><Link to="/employment#women">Women Livelihood Projects</Link></li>
              <li className="footer-link-item"><Link to="/about#legal">CSR & Institutional Funding</Link></li>
            </ul>
          </div>

          {/* Contact & Map */}
          <div className="footer-links-col">
            <h4>Get In Touch</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="footer-contact-icon" />
              <span>Head Office: Plot 45, LGF, Sector-5, Rohini, New Delhi, India 110085</span>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="footer-contact-icon" />
              <span>+91 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} className="footer-contact-icon" />
              <span>support@lifechangingtrust.org</span>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--border-radius-sm)', borderLeft: '3px solid var(--color-green)' }}>
              <h5 style={{ color: 'var(--color-white)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', marginBottom: '4px' }}>
                <ShieldAlert size={14} style={{ color: '#ff4d4d' }} />
                <span>Emergency Help Numbers</span>
              </h5>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                Women Helpline: 1091<br />
                Ambulance Service: 102 / 108<br />
                Childline Support: 1098
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Life Changing Educational & Charitable Trust. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/refund-policy">Refund Policy</Link>
            <span>|</span>
            <Link to="/terms-conditions">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
