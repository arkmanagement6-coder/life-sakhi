import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Health from './pages/Health';
import HealthDetail from './pages/HealthDetail';
import Education from './pages/Education';
import EducationDetail from './pages/EducationDetail';
import Employment from './pages/Employment';
import EmploymentDetail from './pages/EmploymentDetail';
import WomenEmpowerment from './pages/WomenEmpowerment';
import WomenEmpowermentDetail from './pages/WomenEmpowermentDetail';
import Projects from './pages/Projects';
import Campaigns from './pages/Campaigns';
import Donate from './pages/Donate';
import About from './pages/About';
import AboutDetail from './pages/AboutDetail';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import { LangProvider } from './context/LangContext';
import { AuthProvider } from './context/AuthContext';

// Helper to scroll to hash anchor tags or top when route changes
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? 'home-page-layout' : 'inner-page-layout'} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<Health />} />
          <Route path="/health/:subpage" element={<HealthDetail />} />
          <Route path="/education" element={<Education />} />
          <Route path="/education/:subpage" element={<EducationDetail />} />
          <Route path="/employment" element={<Employment />} />
          <Route path="/employment/:subpage" element={<EmploymentDetail />} />
          <Route path="/women-empowerment" element={<WomenEmpowerment />} />
          <Route path="/women-empowerment/:subpage" element={<WomenEmpowermentDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:subpage" element={<AboutDetail />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LangProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LangProvider>
    </Router>
  );
};

export default App;
