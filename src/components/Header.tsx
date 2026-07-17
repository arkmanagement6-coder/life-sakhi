import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, User, LogOut, Heart, FileText, Menu, X } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { useAuth } from '../context/AuthContext';
import LanguageSelect from './LanguageSelect';

const Header: React.FC = () => {
  const { t } = useLang();
  const { user, logout, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && scrollY < 80;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={isTransparent ? 'header-transparent' : ''}>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <Phone size={14} />
              <span>📞 +91 98765 43210</span>
            </div>
            <div className="top-bar-item">
              <Mail size={14} />
              <span>info@lifechangingtrust.org</span>
            </div>
            <div className="top-bar-item">
              <Clock size={14} />
              <span>{t('officeTiming')}</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon" aria-label="Linkedin">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
            
            <LanguageSelect />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '12px' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-light-green)' }}>
                    Hi, {userProfile?.displayName || 'User'} ({userProfile?.role.replace('_', ' ')})
                  </span>
                  <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    <LogOut size={12} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-white)', fontWeight: 600 }}>
                    <User size={12} />
                    <span>{t('login')}</span>
                  </Link>
                  <Link to="/register" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-white)', fontWeight: 600 }}>
                    <FileText size={12} />
                    <span>{t('register')}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="header-nav">
        <div className="container nav-container">
          <Link to="/" className="logo-section">
            <div>
              <div className="logo-main">Life Changing Trust</div>
              <div className="logo-sub">Educational & Charitable Trust</div>
            </div>
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Menu Items */}
          <ul className={`menu-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>{t('home')}</NavLink>
            </li>

            {/* Health Programs Submenu */}
            <li className="dropdown-container">
              <NavLink to="/health" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('healthPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/health#life-sakhi">Life Sakhi Program</Link></li>
                <li className="dropdown-item"><Link to="/health#menstrual">Menstrual Hygiene</Link></li>
                <li className="dropdown-item"><Link to="/health#camps">Medical Camps</Link></li>
                <li className="dropdown-item"><Link to="/health#nutrition">Nutrition Program</Link></li>
                <li className="dropdown-item"><Link to="/health#awareness">Health Awareness</Link></li>
                <li className="dropdown-item"><Link to="/health#distribution">Pad Distribution</Link></li>
                <li className="dropdown-item"><Link to="/health#mental-health">Mental Health</Link></li>
              </ul>
            </li>

            {/* Education Submenu */}
            <li className="dropdown-container">
              <NavLink to="/education" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('educationPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/education#child">Child Education</Link></li>
                <li className="dropdown-item"><Link to="/education#digital">Digital Education</Link></li>
                <li className="dropdown-item"><Link to="/education#scholarship">Scholarships</Link></li>
                <li className="dropdown-item"><Link to="/education#skills">Skill Development</Link></li>
                <li className="dropdown-item"><Link to="/education#computer">Computer Training</Link></li>
                <li className="dropdown-item"><Link to="/education#guidance">Career Guidance</Link></li>
              </ul>
            </li>

            {/* Employment Submenu */}
            <li className="dropdown-container">
              <NavLink to="/employment" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('employmentPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/employment#women">Women Employment</Link></li>
                <li className="dropdown-item"><Link to="/employment#shg">Self Help Groups</Link></li>
                <li className="dropdown-item"><Link to="/employment#training">Vocational Training</Link></li>
                <li className="dropdown-item"><Link to="/employment#micro-business">Micro Business Support</Link></li>
                <li className="dropdown-item"><Link to="/employment#distributors">Women Distributors</Link></li>
                <li className="dropdown-item"><Link to="/employment#coordinator">District Coordinator Program</Link></li>
              </ul>
            </li>

            {/* Women Empowerment Submenu */}
            <li className="dropdown-container">
              <NavLink to="/women-empowerment" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('womenEmpowerment')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/women-empowerment#initiative">Life Sakhi Initiative</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment#distributors">Women Distributors</Link></li>
                <li className="dropdown-item"><Link to="/employment#shg">Self Help Groups (SHG)</Link></li>
                <li className="dropdown-item"><Link to="/employment#training">Vocational Training</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment#livelihood">Livelihood Opportunities</Link></li>
                <li className="dropdown-item"><Link to="/health#menstrual">Hygiene Advocacy</Link></li>
              </ul>
            </li>
            
            {/* About Submenu */}
            <li className="dropdown-container">
              <NavLink to="/about" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('about')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/about#founder">Founder Message</Link></li>
                <li className="dropdown-item"><Link to="/about#vision">Vision & Mission</Link></li>
                <li className="dropdown-item"><Link to="/about#legal">80G, 12A & CSR Status</Link></li>
                <li className="dropdown-item"><Link to="/about#team">Our Team</Link></li>
                <li className="dropdown-item"><Link to="/about#partners">Partners & Board</Link></li>
                <li className="dropdown-item" style={{ borderTop: '1px solid var(--color-gray-light)', paddingTop: '10px' }}><Link to="/projects">Our Projects</Link></li>
                <li className="dropdown-item"><Link to="/campaigns">Our Campaigns</Link></li>
                <li className="dropdown-item"><Link to="/media">Media & Publications</Link></li>
              </ul>
            </li>

            <li>
              <NavLink to="/contact" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>{t('contact')}</NavLink>
            </li>
          </ul>

          <div className="nav-actions">
            <Link to="/donate" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
              <Heart size={14} fill="white" />
              <span>{t('donateNow')}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* CSS adjustments to handle mobile view toggle natively inside header */}
      <style>{`
        @media (max-width: 992px) {
          .mobile-menu-toggle {
            display: block !important;
          }
          .menu-items {
            display: none !important;
            flex-direction: column;
            width: 100%;
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            box-shadow: var(--shadow-xl);
            padding: 20px;
            z-index: 1000;
          }
          .menu-items.mobile-open {
            display: flex !important;
          }
          .dropdown-menu {
            position: static;
            display: none;
            box-shadow: none;
            border: none;
            padding-left: 20px;
            background: var(--color-light-gray);
          }
          .dropdown-container:hover .dropdown-menu {
            display: block;
          }
          .nav-actions {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
