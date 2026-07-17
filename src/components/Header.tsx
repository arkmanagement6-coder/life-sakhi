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
                  <Link to="/dashboard" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-light-green)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                    <User size={12} />
                    <span>Hi, {userProfile?.displayName || 'User'} ({userProfile?.role.replace('_', ' ')})</span>
                  </Link>
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
          <Link to="/" className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src="/assets/logo.jpg" 
              alt="Life Changing Educational & Charitable Trust Logo" 
              style={{ 
                height: '60px', 
                width: '60px', 
                borderRadius: '50%', 
                objectFit: 'cover', 
                border: '2px solid var(--color-green)',
                background: '#ffffff',
                flexShrink: 0
              }} 
            />
            <div>
              <div className="logo-main">Life Changing</div>
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
            <li className="dropdown-container">
              <NavLink to="/health" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('healthPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/health/life-sakhi">Life Sakhi Program</Link></li>
                <li className="dropdown-item"><Link to="/health/menstrual-hygiene">Menstrual Hygiene</Link></li>
                <li className="dropdown-item"><Link to="/health/medical-camps">Medical Camps</Link></li>
                <li className="dropdown-item"><Link to="/health/nutrition-program">Nutrition Program</Link></li>
                <li className="dropdown-item"><Link to="/health/health-awareness">Health Awareness</Link></li>
                <li className="dropdown-item"><Link to="/health/pad-distribution">Pad Distribution</Link></li>
                <li className="dropdown-item"><Link to="/health/mental-health">Mental Health</Link></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <NavLink to="/education" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('educationPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/education/child-education">Child Education</Link></li>
                <li className="dropdown-item"><Link to="/education/digital-learning">Digital Education</Link></li>
                <li className="dropdown-item"><Link to="/education/scholarships">Scholarships</Link></li>
                <li className="dropdown-item"><Link to="/education/skill-development">Skill Development</Link></li>
                <li className="dropdown-item"><Link to="/education/computer-training">Computer Training</Link></li>
                <li className="dropdown-item"><Link to="/education/career-guidance">Career Guidance</Link></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <NavLink to="/employment" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('employmentPrograms')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/employment/women-employment">Women Employment</Link></li>
                <li className="dropdown-item"><Link to="/employment/self-help-groups">Self Help Groups</Link></li>
                <li className="dropdown-item"><Link to="/employment/vocational-training">Vocational Training</Link></li>
                <li className="dropdown-item"><Link to="/employment/micro-business">Micro Business Support</Link></li>
                <li className="dropdown-item"><Link to="/employment/distributors">Women Distributors</Link></li>
                <li className="dropdown-item"><Link to="/employment/coordinator-program">District Coordinator Program</Link></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <NavLink to="/women-empowerment" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('womenEmpowerment')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/women-empowerment/life-sakhi-campaign">Life Sakhi Initiative</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment/distributor-program">Women Distributors</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment/shg-support">Self Help Groups (SHG)</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment/vocational-skills">Vocational Training</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment/livelihood-capital">Livelihood Opportunities</Link></li>
                <li className="dropdown-item"><Link to="/women-empowerment/hygiene-awareness">Hygiene Advocacy</Link></li>
              </ul>
            </li>
            <li className="dropdown-container">
              <NavLink to="/about" className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}>
                {t('about')}
              </NavLink>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><Link to="/about/founder">Founder Message</Link></li>
                <li className="dropdown-item"><Link to="/about/vision-mission">Vision & Mission</Link></li>
                <li className="dropdown-item"><Link to="/about/legal">80G, 12A & CSR Status</Link></li>
                <li className="dropdown-item"><Link to="/about/team">Our Team</Link></li>
                <li className="dropdown-item"><Link to="/about/partners">Partners & Board</Link></li>
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
          .nav-container {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 10px 15px !important;
            gap: 0 !important;
            width: 100% !important;
          }
          .mobile-menu-toggle {
            display: block !important;
            z-index: 1010;
          }
          .menu-items {
            display: none !important;
            flex-direction: column !important;
            width: 100% !important;
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            background: linear-gradient(180deg, var(--color-primary) 0%, #07255a 100%) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
            padding: 20px !important;
            z-index: 1000 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
            margin: 0 !important;
          }
          .menu-items.mobile-open {
            display: flex !important;
          }
          .menu-items li {
            width: 100% !important;
          }
          .menu-link {
            color: var(--color-white) !important;
            font-size: 1.05rem !important;
            padding: 12px 18px !important;
            margin: 4px 0 !important;
            border-radius: 6px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            width: 100% !important;
            background: transparent !important;
          }
          .menu-link:hover, 
          .menu-link.active {
            background: var(--color-green) !important;
            color: var(--color-white) !important;
          }
          .dropdown-menu {
            position: static !important;
            display: none !important;
            box-shadow: none !important;
            border: none !important;
            padding: 10px 15px !important;
            background: rgba(255, 255, 255, 0.08) !important;
            margin: 5px 0 10px 0 !important;
            border-left: 3px solid var(--color-green) !important;
            border-radius: 6px !important;
            width: 100% !important;
          }
          .dropdown-container:hover .dropdown-menu {
            display: block !important;
          }
          .dropdown-item {
            padding: 0 !important;
          }
          .dropdown-item a {
            color: rgba(255, 255, 255, 0.85) !important;
            padding: 10px 15px !important;
            font-size: 0.95rem !important;
            border-radius: 4px !important;
            display: block !important;
            text-decoration: none !important;
          }
          .dropdown-item a:hover {
            background: rgba(140, 198, 62, 0.15) !important;
            color: var(--color-light-green) !important;
            padding-left: 20px !important;
          }
          .nav-actions {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
