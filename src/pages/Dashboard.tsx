import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, ShoppingBag, DollarSign, ClipboardList, 
  FileText, Download, Calendar, Activity, 
  Heart, LogOut, Check, X, Menu, Home, User, Landmark, 
  Sparkles, CheckCircle2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Common forms state
  const [sakhiOrder, setSakhiOrder] = useState({ quantity: '100', block: 'Rohtak', notes: '' });
  const [salesLog, setSalesLog] = useState({ date: new Date().toISOString().split('T')[0], packs: '5', earnings: '60', buyer: 'Individual' });
  const [campForm, setCampForm] = useState({ date: '', location: '', specialist: '', doctorsRequired: '2' });
  const [diagnosticsForm, setDiagnosticsForm] = useState({ patientName: '', age: '', symptom: 'Anemia', prescription: '', referralRequired: 'No' });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--color-light-gray)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-primary)', fontFamily: 'Outfit, sans-serif' }}>Loading Portal Session...</div>
      </div>
    );
  }

  if (!userProfile) {
    return <Navigate to="/login" replace />;
  }

  const role = userProfile.role || 'user';
  const name = userProfile.displayName || 'Trust Member';
  const email = userProfile.email || '';
  const phone = userProfile.phone || '';

  const handleInputChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setter((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'women_distributor':
        return 'Life Sakhi Distributor';
      case 'block_coordinator':
        return 'Block Coordinator';
      case 'district_coordinator':
        return 'District Coordinator';
      case 'state_coordinator':
        return 'State Coordinator';
      case 'donor':
        return 'Trust Donor';
      case 'csr_partner':
        return 'CSR Partner';
      case 'corporate_partner':
        return 'Corporate Partner';
      case 'doctor':
        return 'Clinical Volunteer / Doctor';
      case 'volunteer':
        return 'Active Volunteer';
      case 'user':
      default:
        return 'Supporter Member';
    }
  };

  // Define sidebar menu options based on role
  const getSidebarMenuItems = () => {
    const common = [
      { id: 'overview', label: 'Overview', icon: <Activity size={18} /> }
    ];

    switch (role) {
      case 'women_distributor':
        return [
          ...common,
          { id: 'place_order', label: 'Order Pad Stock', icon: <ShoppingBag size={18} /> },
          { id: 'sales_log', label: 'Log Daily Sales', icon: <ClipboardList size={18} /> },
          { id: 'sales_ledger', label: 'Earnings Ledger', icon: <DollarSign size={18} /> }
        ];
      case 'block_coordinator':
        return [
          ...common,
          { id: 'approve_orders', label: 'Approve Orders', icon: <CheckCircle2 size={18} /> },
          { id: 'sakhi_inventory', label: 'Sakhi Directory', icon: <Users size={18} /> }
        ];
      case 'district_coordinator':
      case 'state_coordinator':
        return [
          ...common,
          { id: 'schedule_camps', label: 'Register Camps', icon: <Calendar size={18} /> },
          { id: 'applicant_review', label: 'Review Applicants', icon: <User size={18} /> }
        ];
      case 'donor':
      case 'csr_partner':
      case 'corporate_partner':
        return [
          ...common,
          { id: 'tax_certificates', label: '80G Certificates', icon: <FileText size={18} /> },
          { id: 'fund_allocation', label: 'Fund Allocations', icon: <Landmark size={18} /> }
        ];
      case 'doctor':
        return [
          ...common,
          { id: 'patient_diagnostics', label: 'Patient Diagnostics', icon: <Heart size={18} /> },
          { id: 'my_camps', label: 'Camps Schedule', icon: <Calendar size={18} /> }
        ];
      case 'volunteer':
      case 'user':
      default:
        return [
          ...common,
          { id: 'join_drives', label: 'Join Camp Drives', icon: <Users size={18} /> },
          { id: 'handbooks', label: 'Advocacy Library', icon: <FileText size={18} /> }
        ];
    }
  };

  // Render Sub-Views based on activeTab
  const renderOverview = () => {
    // Render role-specific stats cards
    const renderStatsGrid = () => {
      if (role === 'women_distributor') {
        return (
          <div className="grid-4" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-green">
              <span>Total Distributed</span>
              <h3>320 Packs</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Total Earnings</span>
              <h3>₹3,840</h3>
            </div>
            <div className="stat-card card-green">
              <span>Current Stock</span>
              <h3>45 Packs</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Shipment ETA</span>
              <h3>2 Days</h3>
            </div>
          </div>
        );
      }
      if (role === 'block_coordinator') {
        return (
          <div className="grid-4" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-blue">
              <span>Sakhis Supervised</span>
              <h3>24 Sakhis</h3>
            </div>
            <div className="stat-card card-green">
              <span>Block Inventory</span>
              <h3>1,500 Packs</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Pending Orders</span>
              <h3>3 Requests</h3>
            </div>
            <div className="stat-card card-green">
              <span>Monthly Sales</span>
              <h3>420 Packs</h3>
            </div>
          </div>
        );
      }
      if (role === 'district_coordinator' || role === 'state_coordinator') {
        return (
          <div className="grid-4" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-blue">
              <span>Supervised Blocks</span>
              <h3>8 Blocks</h3>
            </div>
            <div className="stat-card card-green">
              <span>Active Sakhis</span>
              <h3>128 Sakhis</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Warehouse Stock</span>
              <h3>8,500 Packs</h3>
            </div>
            <div className="stat-card card-green">
              <span>Approved Budget</span>
              <h3>₹1.2 Lakhs</h3>
            </div>
          </div>
        );
      }
      if (role === 'donor' || role === 'csr_partner' || role === 'corporate_partner') {
        return (
          <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-green">
              <span>Total Contributed</span>
              <h3>₹1,50,000</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Smart Schools Funded</span>
              <h3>3 Labs</h3>
            </div>
            <div className="stat-card card-green">
              <span>80G Deductions</span>
              <h3>₹75,000</h3>
            </div>
          </div>
        );
      }
      if (role === 'doctor') {
        return (
          <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-blue">
              <span>Patients Diagnosed</span>
              <h3>145 patients</h3>
            </div>
            <div className="stat-card card-green">
              <span>Camps Attended</span>
              <h3>6 Camps</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Pending Referrals</span>
              <h3>4 Patients</h3>
            </div>
          </div>
        );
      }
      return (
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="stat-card card-green">
            <span>Volunteering Hours</span>
            <h3>24 Hours</h3>
          </div>
          <div className="stat-card card-blue">
            <span>Camps Assisted</span>
            <h3>3 Camps</h3>
          </div>
          <div className="stat-card card-green">
            <span>Community Points</span>
            <h3>120 Points</h3>
          </div>
        </div>
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Welcome message */}
        <div className="card welcome-banner" style={{ padding: '35px' }}>
          <span className="welcome-badge">{getRoleDisplayName()}</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '10px 0 5px 0', color: 'var(--color-white)' }}>
            Welcome Back, {name}!
          </h2>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', margin: 0 }}>
            Life Changing Educational & Charitable Trust administration portal. Use the sidebar menu to coordinate operations.
          </p>
        </div>

        {/* Stats Grid */}
        {renderStatsGrid()}

        {/* Quick summaries */}
        <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
          <div className="card" style={{ padding: '30px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Account Profile</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Full Name:</span>
                <strong>{name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Registered Role:</span>
                <span style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{getRoleDisplayName()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Email Address:</span>
                <strong>{email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Phone Number:</span>
                <strong>{phone || 'Not Configured'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--color-muted)' }}>Portal Status:</span>
                <span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>VERIFIED ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '30px' }}>
            <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Trust Notice Board</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'rgba(10, 60, 140, 0.1)', color: 'var(--color-primary)', borderRadius: '6px', height: 'fit-content' }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h5 style={{ margin: '0 0 4px 0', fontWeight: 700 }}>July Awareness Targets Met!</h5>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-muted)' }}>Our block coordinators distributed over 3,000 biodegradable pads this month. Great job!</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ padding: '8px', background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', borderRadius: '6px', height: 'fit-content' }}>
                  <Heart size={18} />
                </div>
                <div>
                  <h5 style={{ margin: '0 0 4px 0', fontWeight: 700 }}>Upcoming Camp Registrations</h5>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-muted)' }}>Coordinators can register upcoming medical camps. Doctors and volunteers will see schedules automatically.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      {/* Dynamic Embed CSS Styles */}
      <style>{`
        .dashboard-wrapper {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f9;
          font-family: 'Outfit', 'Inter', sans-serif;
          width: 100%;
        }
        .dashboard-sidebar {
          width: 280px;
          background: linear-gradient(180deg, #0A3C8C 0%, #051F5B 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          flex-shrink: 0;
          z-index: 100;
        }
        .dashboard-sidebar-header {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dashboard-menu {
          list-style: none;
          padding: 20px 0;
          margin: 0;
          flex: 1;
        }
        .dashboard-menu-item {
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }
        .dashboard-menu-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .dashboard-menu-item.active {
          background: rgba(140, 198, 62, 0.15);
          color: #8CC63E;
          border-left-color: #8CC63E;
          font-weight: 600;
        }
        .dashboard-menu-item svg {
          flex-shrink: 0;
        }
        .dashboard-content-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .dashboard-topbar {
          height: 70px;
          background: #ffffff;
          border-bottom: 1px solid #e1e4e8;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .dashboard-body {
          padding: 30px;
          flex: 1;
          overflow-y: auto;
        }
        .welcome-banner {
          background: linear-gradient(135deg, #0A3C8C 0%, #06214d 100%);
          color: #ffffff;
          position: relative;
          overflow: hidden;
          border-radius: var(--border-radius-lg);
          border: none;
          box-shadow: var(--shadow-md);
        }
        .welcome-badge {
          background: var(--color-green);
          color: #ffffff;
          padding: 4px 12px;
          border-radius: var(--border-radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .stat-card {
          padding: 24px;
          background: #ffffff;
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-sm);
          border-left: 4px solid;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-card span {
          font-size: 0.85rem;
          color: var(--color-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .stat-card h3 {
          font-size: 2rem;
          color: var(--color-primary);
          margin: 0;
          font-weight: 800;
        }
        .card-green {
          border-left-color: var(--color-green);
        }
        .card-blue {
          border-left-color: var(--color-primary);
        }
        .dashboard-overlay {
          display: none;
        }

        /* Responsive sidebar drawers */
        @media (max-width: 992px) {
          .dashboard-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            width: 270px;
          }
          .dashboard-sidebar.open {
            transform: translateX(0);
          }
          .dashboard-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 90;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }
          .dashboard-overlay.show {
            opacity: 1;
            pointer-events: auto;
          }
        }
      `}</style>

      {/* Overlay Background for Mobile Drawer */}
      <div 
        className={`dashboard-overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="dashboard-sidebar-header">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/assets/logo.jpg" alt="Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x100/ffffff/0a3c8c?text=LS"; }} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Life Sakhi</h4>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Portal Dashboard</span>
          </div>
        </div>

        {/* Sidebar Menu items */}
        <ul className="dashboard-menu">
          {getSidebarMenuItems().map((item) => (
            <li key={item.id}>
              <div 
                className={`dashboard-menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer actions inside Sidebar */}
        <div style={{ padding: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={16} />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h6 style={{ margin: 0, fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{name}</h6>
              <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{email}</span>
            </div>
          </div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '10px' }}>
            <Home size={14} />
            <span>Portal Home</span>
          </Link>
          <div 
            onClick={logout} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            <LogOut size={14} />
            <span>Logout Account</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content-area">
        {/* Topbar navigation area */}
        <header className="dashboard-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--color-primary)' }}
              className="btn-mobile-menu"
            >
              <Menu size={24} />
            </button>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {activeTab === 'overview' ? 'Administration Desk' : getSidebarMenuItems().find(i => i.id === activeTab)?.label}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Direct Home shortcut */}
            <Link to="/" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Home size={14} />
              <span className="hidden-mobile">View Website</span>
            </Link>

            {/* Profile Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f4f6f9', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e1e4e8' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={12} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>{name}</span>
            </div>

            {/* Direct Logout */}
            <button 
              onClick={logout} 
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700 }}
            >
              <LogOut size={14} />
              <span className="hidden-mobile">Logout</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body container */}
        <main className="dashboard-body">
          {activeTab === 'overview' && renderOverview()}

          {/* 1. Distributor views */}
          {activeTab === 'place_order' && (
            <div className="card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Order Sanitary Pad Stock</h4>
              {formSubmitted ? (
                <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
                  Stock Request Submitted Successfully to Block Coordinator!
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Quantity (Packets)</label>
                    <select name="quantity" value={sakhiOrder.quantity} onChange={handleInputChange(setSakhiOrder)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                      <option value="50">50 Packs (Subsidized Price: ₹1,250)</option>
                      <option value="100">100 Packs (Subsidized Price: ₹2,300)</option>
                      <option value="200">200 Packs (Subsidized Price: ₹4,000)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Block Area</label>
                    <input type="text" name="block" required value={sakhiOrder.block} onChange={handleInputChange(setSakhiOrder)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Notes / Directions</label>
                    <textarea name="notes" rows={3} value={sakhiOrder.notes} onChange={handleInputChange(setSakhiOrder)} placeholder="Provide special instructions..." style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', resize: 'none' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px', marginTop: '10px' }}>Request Stock</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'sales_log' && (
            <div className="card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Log Daily Sales Records</h4>
              {formSubmitted ? (
                <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
                  Sales Record Saved Successfully!
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Date of Sales</label>
                    <input type="date" name="date" required value={salesLog.date} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Packs Sold</label>
                      <input type="number" name="packs" required value={salesLog.packs} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Total Earned (₹)</label>
                      <input type="number" name="earnings" required value={salesLog.earnings} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Buyer Distribution Channel</label>
                    <select name="buyer" value={salesLog.buyer} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                      <option value="Individual">Individual Village Women</option>
                      <option value="School">Schoolgirls Drive</option>
                      <option value="SHG">Self Help Group Cooperative</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-secondary" style={{ padding: '10px', marginTop: '10px' }}>Log Sales Record</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'sales_ledger' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Recent Sales & Commission Logs</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Packs Sold</th>
                      <th style={{ padding: '12px' }}>Commission Margin</th>
                      <th style={{ padding: '12px' }}>Total Profit</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                      <td style={{ padding: '12px' }}>15 July 2026</td>
                      <td style={{ padding: '12px' }}>15 Packs</td>
                      <td style={{ padding: '12px' }}>₹12 per pack</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-green)' }}>₹180</td>
                      <td style={{ padding: '12px' }}><span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Received</span></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                      <td style={{ padding: '12px' }}>12 July 2026</td>
                      <td style={{ padding: '12px' }}>30 Packs</td>
                      <td style={{ padding: '12px' }}>₹12 per pack</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-green)' }}>₹360</td>
                      <td style={{ padding: '12px' }}><span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Received</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. Block Coordinator views */}
          {activeTab === 'approve_orders' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Approve Sakhis Stock Orders</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { id: 1, name: "Savitri Devi", qty: "100 Packs", date: "16 July 2026", area: "Gorakhpur Block A" },
                  { id: 2, name: "Kiran Sharma", qty: "50 Packs", date: "15 July 2026", area: "Gorakhpur Block B" }
                ].map((order) => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{order.name}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Request: <strong>{order.qty}</strong> | Area: {order.area} | Date: {order.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => alert("Approved Savitri Devi Stock")}>
                        <Check size={14} /> Approve
                      </button>
                      <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'red', borderColor: 'red' }}>
                        <X size={14} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sakhi_inventory' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Active Sakhis Inventory Directory</h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                      <th style={{ padding: '12px' }}>Sakhi Name</th>
                      <th style={{ padding: '12px' }}>Mobile Phone</th>
                      <th style={{ padding: '12px' }}>Assigned Area</th>
                      <th style={{ padding: '12px' }}>Current Stock</th>
                      <th style={{ padding: '12px' }}>Last Sales Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>Savitri Devi</td>
                      <td style={{ padding: '12px' }}>+91 98765 43210</td>
                      <td style={{ padding: '12px' }}>Block A Center</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'red' }}>5 Packs</td>
                      <td style={{ padding: '12px' }}>14 July 2026 (12 packs)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>Kiran Sharma</td>
                      <td style={{ padding: '12px' }}>+91 87654 32109</td>
                      <td style={{ padding: '12px' }}>Block B Center</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-green)' }}>80 Packs</td>
                      <td style={{ padding: '12px' }}>12 July 2026 (18 packs)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. District Coordinator views */}
          {activeTab === 'schedule_camps' && (
            <div className="card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Schedule Free Medical Camp Site</h4>
              {formSubmitted ? (
                <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
                  Free Medical Camp Scheduled & Registered Successfully!
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Camp Target Date</label>
                    <input type="date" name="date" required value={campForm.date} onChange={handleInputChange(setCampForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Village Site Location</label>
                    <input type="text" name="location" required value={campForm.location} onChange={handleInputChange(setCampForm)} placeholder="e.g. Village Choupal, Rohtak Block C" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Target Specialists</label>
                    <input type="text" name="specialist" required value={campForm.specialist} onChange={handleInputChange(setCampForm)} placeholder="e.g. Pediatricians, Gynecologists" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px', marginTop: '10px' }}>Register Camp Site</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'applicant_review' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Coordinators / Sakhi Applicants</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { id: 1, name: "Kusum Latha", role: "Sakhi", loc: "Rohtak Village 3", experience: "Social Volunteer" },
                  { id: 2, name: "Ramesh Kumar", role: "Block Coordinator", loc: "Jaipur Block B", experience: "2 Years NGO Management" }
                ].map((applicant) => (
                  <div key={applicant.id} style={{ borderBottom: '1px solid var(--color-gray-light)', paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{applicant.name}</h5>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(10, 60, 140, 0.1)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{applicant.role}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: '6px 0' }}>Location: {applicant.loc} | Background: {applicant.experience}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                      <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.75rem' }} onClick={() => alert("Approved Profile")}>Approve</button>
                      <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.75rem', color: 'red', borderColor: 'red' }}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Donor views */}
          {activeTab === 'tax_certificates' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>80G Tax-Exemption Receipts</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { id: 1, desc: "CSR Fund for smart panel projection systems", amt: "₹1,00,000", receiptNo: "80G-2026-00492" },
                  { id: 2, desc: "Scholarship funding support", amt: "₹50,000", receiptNo: "80G-2026-00381" }
                ].map((receipt) => (
                  <div key={receipt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px' }}>
                    <div>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{receipt.amt}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{receipt.desc} | Ref: {receipt.receiptNo}</span>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }} onClick={() => alert("Downloading PDF certificate")}>
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fund_allocation' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>CSR Funding Allocation Matrix</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { field: "Biodegradable sanitary pad logistics", pct: 45, color: 'var(--color-green)' },
                  { field: "Smart classrooms visual software mapping", pct: 35, color: 'var(--color-primary)' },
                  { field: "Rural medicine diagnostics and transport", pct: 20, color: 'var(--color-green)' }
                ].map((field, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                      <span>{field.field}</span>
                      <strong>{field.pct}%</strong>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: 'var(--color-light-gray)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${field.pct}%`, height: '100%', background: field.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Doctor views */}
          {activeTab === 'patient_diagnostics' && (
            <div className="card" style={{ padding: '30px', maxWidth: '650px', margin: '0 auto' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Enter Patient Diagnostic Record</h4>
              {formSubmitted ? (
                <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
                  Patient Diagnostic Report Saved Successfully!
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Patient Name</label>
                      <input type="text" name="patientName" required value={diagnosticsForm.patientName} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Age</label>
                      <input type="number" name="age" required value={diagnosticsForm.age} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Primary Symptom</label>
                    <select name="symptom" value={diagnosticsForm.symptom} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                      <option value="Anemia">Severe Anemia</option>
                      <option value="Malnutrition">Malnourishment</option>
                      <option value="PCOD">Polycystic Ovary Symptoms (PCOD)</option>
                      <option value="Infection">Reproductive/Sanitary Infection</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Prescription Details</label>
                    <input type="text" name="prescription" required value={diagnosticsForm.prescription} onChange={handleInputChange(setDiagnosticsForm)} placeholder="e.g. Iron Supplements, Vitamin B12" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Referral for Advanced Surgery Required?</label>
                    <select name="referralRequired" value={diagnosticsForm.referralRequired} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                      <option value="No">No (Treatable locally)</option>
                      <option value="Yes">Yes (Refer to District Hospital)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '10px', marginTop: '10px' }}>Save Patient Log</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'my_camps' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>My Registered Camps Schedule</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { date: "12 August 2026", area: "Rohtak Village Site B", role: "Lead Diagnostician", timing: "09:00 AM - 04:00 PM" },
                  { date: "05 September 2026", area: "Jaipur Village Site A", role: "Gynecology Consultant", timing: "10:00 AM - 05:00 PM" }
                ].map((camp, idx) => (
                  <div key={idx} style={{ background: 'var(--color-light-gray)', padding: '20px', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700, marginBottom: '5px' }}>
                      <span>{camp.date}</span>
                      <span>{camp.timing}</span>
                    </div>
                    <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: '5px 0', fontSize: '1.1rem' }}>{camp.area}</h5>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Assigned Role: <strong>{camp.role}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Volunteer views */}
          {activeTab === 'join_drives' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Register for Upcoming Sanitation Drives</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { date: "15 August 2026", title: "Independency Day Sanitation Campaign", area: "Rohtak Central Blocks" },
                  { date: "24 August 2026", title: "Village water chlorination drive", area: "Jaipur Blocks A & B" }
                ].map((drive, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{drive.title}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Date: {drive.date} | Location: {drive.area}</span>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => alert("Registered to join drive successfully!")}>Join Drive</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'handbooks' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Hygiene Advocacy Handbooks</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { name: "Menstrual Hygiene Handbook (Hindi)", size: "1.2 MB", type: "PDF" },
                  { name: "Vector Control & Water Safety Booklet", size: "850 KB", type: "PDF" }
                ].map((file, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px' }}>
                    <div>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{file.name}</h5>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Format: {file.type} | Size: {file.size}</span>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }} onClick={() => alert("Downloading PDF Handbook")}>
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
