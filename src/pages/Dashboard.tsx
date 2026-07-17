import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { 
  Users, ShoppingBag, DollarSign, ClipboardList, 
  FileText, Download, Calendar, Activity, 
  Heart, LogOut, Check, X, Menu, Home, User, Landmark, 
  Sparkles, CheckCircle2
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile, loading, updateUserProfileDetails, approveUserStatus, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEmail, setProfileEmail] = useState(userProfile?.email || '');
  const [profilePhone, setProfilePhone] = useState(userProfile?.phone || '');
  const [profileAddress, setProfileAddress] = useState(userProfile?.address || 'Not Configured');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Admin user list state
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const loadAllUsers = () => {
    const raw = localStorage.getItem('life_sakhi_all_users');
    if (raw) {
      setAllUsers(JSON.parse(raw));
    }
  };

  React.useEffect(() => {
    loadAllUsers();
  }, []);

  React.useEffect(() => {
    if (userProfile) {
      setProfileEmail(userProfile.email || '');
      setProfilePhone(userProfile.phone || '');
      setProfileAddress(userProfile.address || 'Not Configured');
    }
  }, [userProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfileDetails(profileEmail, profilePhone, profileAddress);
      setProfileSaveSuccess(true);
      setIsEditingProfile(false);
      loadAllUsers(); // Reload lists
      setTimeout(() => setProfileSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save profile changes.");
    }
  };

  // Admin CRUD states
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberAddress, setNewMemberAddress] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('block_coordinator');

  const [editingMemberUid, setEditingMemberUid] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [editMemberEmail, setEditMemberEmail] = useState('');
  const [editMemberPhone, setEditMemberPhone] = useState('');
  const [editMemberAddress, setEditMemberAddress] = useState('');
  const [editMemberRole, setEditMemberRole] = useState('block_coordinator');
  const [editMemberStatus, setEditMemberStatus] = useState('active');

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const uid = "mock-uid-" + Math.random().toString(36).substring(7);
    const userDoc = {
      uid,
      email: newMemberEmail,
      displayName: newMemberName,
      phone: newMemberPhone,
      address: newMemberAddress,
      role: newMemberRole as any,
      status: 'active' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsersList = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    allUsersList.push(userDoc);
    localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsersList));

    try {
      await setDoc(doc(db, "users", uid), userDoc);
    } catch (err) {
      console.warn("Failed manual user Firestore write", err);
    }

    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberPhone('');
    setNewMemberAddress('');
    setShowAddMember(false);
    loadAllUsers();
  };

  const handleSaveEditMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemberUid) return;

    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsersList = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    const updatedList = allUsersList.map((u: any) => {
      if (u.uid === editingMemberUid) {
        return {
          ...u,
          displayName: editMemberName,
          email: editMemberEmail,
          phone: editMemberPhone,
          address: editMemberAddress,
          role: editMemberRole as any,
          status: editMemberStatus as any,
          updatedAt: new Date().toISOString()
        };
      }
      return u;
    });
    localStorage.setItem('life_sakhi_all_users', JSON.stringify(updatedList));

    try {
      const targetUser = updatedList.find((u: any) => u.uid === editingMemberUid);
      await setDoc(doc(db, "users", editingMemberUid), targetUser, { merge: true });
    } catch (err) {
      console.warn("Failed to update user in Firestore", err);
    }

    setEditingMemberUid(null);
    loadAllUsers();
  };

  const handleDeleteMember = async (uid: string) => {
    if (confirm("Are you sure you want to delete this team member? This action is permanent.")) {
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsersList = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const filtered = allUsersList.filter((u: any) => u.uid !== uid);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(filtered));

      try {
        await setDoc(doc(db, "users", uid), { status: 'rejected' }, { merge: true });
      } catch (err) {
        console.warn("Failed to delete user in Firestore", err);
      }

      loadAllUsers();
    }
  };

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

  const getRoleDisplayName = () => {
    switch (userProfile.role) {
      case 'admin':
        return 'System Admin';
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

  if (userProfile.status === 'pending') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--color-light-gray)', padding: '20px', fontFamily: 'Outfit, sans-serif' }}>
        <div className="card" style={{ background: 'white', borderRadius: '8px', border: '1px solid #eee', width: '100%', maxWidth: '550px', padding: '40px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          </div>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '10px' }}>Approval Pending</h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
            Thank you for registering as a <strong>{getRoleDisplayName()}</strong>.
          </p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '25px' }}>
            Your account is currently pending administrator verification. Once the Trust management reviews and approves your credentials, you will be granted access to this portal.
          </p>
          <div style={{ background: '#f4f6f9', padding: '15px', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '30px', borderLeft: '4px solid #ffc107', textAlign: 'left' }}>
            <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--color-primary)' }}>Application Details:</strong>
            <div>• Name: {userProfile.displayName || 'Trust Member'}</div>
            <div>• Role: {getRoleDisplayName()}</div>
            <div>• Email: {userProfile.email}</div>
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary" style={{ padding: '8px 24px' }}>Back to Home</Link>
            <button onClick={logout} className="btn btn-outline" style={{ padding: '8px 24px' }}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  const role = userProfile.role || 'user';
  const name = userProfile.displayName || 'Trust Member';
  const email = userProfile.email || '';

  const handleInputChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setter((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  // Define sidebar menu options based on role
  const getSidebarMenuItems = () => {
    const common = [
      { id: 'overview', label: 'Overview', icon: <Activity size={18} /> }
    ];

    switch (role) {
      case 'admin':
        return [
          ...common,
          { id: 'approve_registrations', label: 'Approve Registrations', icon: <CheckCircle2 size={18} /> },
          { id: 'all_coordinators', label: 'Team Directory', icon: <Users size={18} /> }
        ];
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
      if (role === 'admin') {
        const pendingCount = allUsers.filter(u => u.status === 'pending').length;
        const activeCount = allUsers.filter(u => u.status === 'active').length;
        const totalCount = allUsers.length;
        return (
          <div className="grid-4" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card" style={{ borderLeftColor: '#ffc107', background: 'white' }}>
              <span style={{ color: 'var(--color-muted)', fontSize: '0.85rem', fontWeight: 600 }}>Pending Approvals</span>
              <h3 style={{ color: '#ffc107', fontSize: '2rem', fontWeight: 800, margin: 0 }}>{pendingCount} Signups</h3>
            </div>
            <div className="stat-card card-green">
              <span>Active Coordinators</span>
              <h3>{activeCount} Active</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Total Database Size</span>
              <h3>{totalCount} Users</h3>
            </div>
            <div className="stat-card card-green">
              <span>Trust Impact Reach</span>
              <h3>15+ Districts</h3>
            </div>
          </div>
        );
      }
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
            
            {profileSaveSuccess && (
              <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>
                Profile Updated Successfully!
              </div>
            )}

            {!isEditingProfile ? (
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
                  <strong>{userProfile?.email}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Phone Number:</span>
                  <strong>{userProfile?.phone || 'Not Configured'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Address:</span>
                  <strong style={{ maxWidth: '180px', textAlign: 'right', wordBreak: 'break-word' }}>{userProfile?.address || 'Not Configured'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--color-muted)' }}>Portal Status:</span>
                  <span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>VERIFIED ACTIVE</span>
                </div>
                <button className="btn btn-outline" onClick={() => setIsEditingProfile(true)} style={{ width: '100%', marginTop: '10px', padding: '8px 16px' }}>
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Full Name (Cannot be changed)</label>
                  <input type="text" value={name} disabled style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', background: '#f4f6f9', color: '#888', cursor: 'not-allowed' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Email Address</label>
                  <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Phone Number</label>
                  <input type="text" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Physical Address</label>
                  <textarea rows={2} value={profileAddress} onChange={(e) => setProfileAddress(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', resize: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '8px' }}>Save</button>
                  <button type="button" className="btn btn-outline" onClick={() => {
                    setProfileEmail(userProfile?.email || '');
                    setProfilePhone(userProfile?.phone || '');
                    setProfileAddress(userProfile?.address || 'Not Configured');
                    setIsEditingProfile(false);
                  }} style={{ flex: 1, padding: '8px' }}>Cancel</button>
                </div>
              </form>
            )}
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
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
          position: sticky;
          top: 0;
          z-index: 10;
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

        .btn-mobile-menu {
          display: none;
        }

        @media (max-width: 992px) {
          .btn-mobile-menu {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .dashboard-topbar {
            padding: 0 15px !important;
          }
          .dashboard-topbar > div {
            gap: 10px !important;
          }
          .dashboard-body {
            padding: 15px !important;
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
              <h6 style={{ margin: 0, fontWeight: 700, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: '#ffffff' }}>{name}</h6>
              <div style={{ fontSize: '0.75rem', color: '#8CC63E', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{getRoleDisplayName()}</div>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{email}</span>
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
        <div className="dashboard-topbar">
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
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                {name} <span style={{ opacity: 0.6, fontSize: '0.75rem', fontWeight: 400 }}>({getRoleDisplayName()})</span>
              </span>
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
        </div>

        {/* Dashboard Body container */}
        <main className="dashboard-body">
          {activeTab === 'overview' && renderOverview()}

          {/* Admin sub-views */}
          {activeTab === 'approve_registrations' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Approve Registrations (Approval Desk)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '25px' }}>
                Review and manage newly registered team members, distributors, and coordinators. These accounts cannot sign in or access their desks until you approve their status.
              </p>
              
              {allUsers.filter(u => u.status === 'pending').length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8f9fa', borderRadius: '8px', color: 'var(--color-muted)' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '15px', color: 'var(--color-green)' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <h5 style={{ fontWeight: 700, margin: '0 0 5px 0', color: 'var(--color-primary)' }}>All Caught Up!</h5>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>There are no pending coordinator or distributor registrations awaiting review.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e1e4e8', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Full Name</th>
                        <th style={{ padding: '12px' }}>Role / Designation</th>
                        <th style={{ padding: '12px' }}>Email Address</th>
                        <th style={{ padding: '12px' }}>Phone Number</th>
                        <th style={{ padding: '12px' }}>Registered On</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.filter(u => u.status === 'pending').map((u) => (
                        <tr key={u.uid} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '12px', fontWeight: 600 }}>{u.displayName}</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: 'rgba(10, 60, 140, 0.08)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                              {u.role === 'women_distributor' ? 'Life Sakhi Distributor' :
                               u.role === 'block_coordinator' ? 'Block Coordinator' :
                               u.role === 'district_coordinator' ? 'District Coordinator' :
                               u.role === 'state_coordinator' ? 'State Coordinator' :
                               u.role === 'doctor' ? 'Clinical Doctor' :
                               u.role === 'volunteer' ? 'Active Volunteer' : u.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>{u.email}</td>
                          <td style={{ padding: '12px' }}>{u.phone}</td>
                          <td style={{ padding: '12px' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button 
                                onClick={() => { approveUserStatus(u.uid, 'active'); loadAllUsers(); }} 
                                className="btn btn-primary" 
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => { approveUserStatus(u.uid, 'rejected'); loadAllUsers(); }} 
                                className="btn btn-outline" 
                                style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: '#ff4d4d', color: '#ff4d4d' }}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'all_coordinators' && (
            <div className="card" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                <h4 style={{ color: 'var(--color-primary)', margin: 0, fontWeight: 800 }}>Team Directory</h4>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button 
                    onClick={() => { setShowAddMember(!showAddMember); setEditingMemberUid(null); }} 
                    className="btn btn-primary" 
                    style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                  >
                    {showAddMember ? 'Close Form' : 'Add New Member'}
                  </button>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                    Total Registered: <strong>{allUsers.length} members</strong>
                  </div>
                </div>
              </div>

              {/* Add Member Form */}
              {showAddMember && (
                <div style={{ background: '#f8f9fa', border: '1px solid #eee', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
                  <h5 style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: 'var(--color-primary)' }}>Add New Team Member</h5>
                  <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Full Name</label>
                        <input type="text" required value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="e.g. Dinesh Pahwa" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Email Address</label>
                        <input type="email" required value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} placeholder="name@example.com" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Phone Number</label>
                        <input type="text" required value={newMemberPhone} onChange={(e) => setNewMemberPhone(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>City / Address</label>
                        <input type="text" required value={newMemberAddress} onChange={(e) => setNewMemberAddress(e.target.value)} placeholder="e.g. Agra" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Designation (Role)</label>
                        <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', height: '36px', boxSizing: 'border-box' }}>
                          <option value="block_coordinator">Block Coordinator</option>
                          <option value="district_coordinator">District Coordinator</option>
                          <option value="state_coordinator">State Coordinator</option>
                          <option value="women_distributor">Life Sakhi Distributor</option>
                          <option value="doctor">Clinical Doctor</option>
                          <option value="volunteer">Active Volunteer</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px' }}>Save Member</button>
                      <button type="button" className="btn btn-outline" onClick={() => setShowAddMember(false)} style={{ padding: '8px 24px' }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Edit Member Form */}
              {editingMemberUid && (
                <div style={{ background: '#fff9e6', border: '1px solid #ffeeba', borderRadius: '8px', padding: '20px', marginBottom: '25px' }}>
                  <h5 style={{ margin: '0 0 15px 0', fontWeight: 'bold', color: '#856404' }}>Edit Team Member Details</h5>
                  <form onSubmit={handleSaveEditMember} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Full Name</label>
                        <input type="text" required value={editMemberName} onChange={(e) => setEditMemberName(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Email Address</label>
                        <input type="email" required value={editMemberEmail} onChange={(e) => setEditMemberEmail(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Phone Number</label>
                        <input type="text" required value={editMemberPhone} onChange={(e) => setEditMemberPhone(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>City / Address</label>
                        <input type="text" required value={editMemberAddress} onChange={(e) => setEditMemberAddress(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Designation</label>
                        <select value={editMemberRole} onChange={(e) => setEditMemberRole(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', height: '36px', boxSizing: 'border-box' }}>
                          <option value="block_coordinator">Block Coordinator</option>
                          <option value="district_coordinator">District Coordinator</option>
                          <option value="state_coordinator">State Coordinator</option>
                          <option value="women_distributor">Life Sakhi Distributor</option>
                          <option value="doctor">Clinical Doctor</option>
                          <option value="volunteer">Active Volunteer</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Status</label>
                        <select value={editMemberStatus} onChange={(e) => setEditMemberStatus(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #ffeeba', borderRadius: '4px', height: '36px', boxSizing: 'border-box' }}>
                          <option value="active">Approved Active</option>
                          <option value="pending">Approval Pending</option>
                          <option value="rejected">Suspended / Rejected</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px' }}>Save Changes</button>
                      <button type="button" className="btn btn-outline" onClick={() => setEditingMemberUid(null)} style={{ padding: '8px 24px' }}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
              
              <div style={{ overflowX: 'auto' }}>
                <table className="table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e1e4e8', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Name</th>
                      <th style={{ padding: '12px' }}>Designation</th>
                      <th style={{ padding: '12px' }}>Email Address</th>
                      <th style={{ padding: '12px' }}>Phone</th>
                      <th style={{ padding: '12px' }}>City / Location</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((u) => (
                      <tr key={u.uid} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{u.displayName}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ textTransform: 'capitalize' }}>
                            {u.role === 'admin' ? 'System Admin' :
                             u.role === 'women_distributor' ? 'Life Sakhi Distributor' :
                             u.role === 'block_coordinator' ? 'Block Coordinator' :
                             u.role === 'district_coordinator' ? 'District Coordinator' :
                             u.role === 'state_coordinator' ? 'State Coordinator' :
                             u.role === 'doctor' ? 'Clinical Doctor' :
                             u.role === 'volunteer' ? 'Active Volunteer' : u.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>{u.email}</td>
                        <td style={{ padding: '12px' }}>{u.phone}</td>
                        <td style={{ padding: '12px' }}>{u.address || 'Agra'}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ 
                            background: u.status === 'active' ? 'rgba(140, 198, 62, 0.1)' : u.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' : 'rgba(244, 67, 54, 0.1)', 
                            color: u.status === 'active' ? 'var(--color-green)' : u.status === 'pending' ? '#ffc107' : '#f44336', 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem', 
                            fontWeight: 700 
                          }}>
                            {u.status === 'active' ? 'Approved Active' : u.status === 'pending' ? 'Approval Pending' : 'Suspended / Rejected'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          {u.role !== 'admin' ? (
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button 
                                onClick={() => {
                                  setEditingMemberUid(u.uid);
                                  setEditMemberName(u.displayName);
                                  setEditMemberEmail(u.email);
                                  setEditMemberPhone(u.phone || '');
                                  setEditMemberAddress(u.address || 'Agra');
                                  setEditMemberRole(u.role);
                                  setEditMemberStatus(u.status);
                                  setShowAddMember(false);
                                }}
                                className="btn btn-outline" 
                                style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteMember(u.uid)}
                                className="btn btn-outline" 
                                style={{ padding: '4px 8px', fontSize: '0.7rem', color: '#ff4d4d', borderColor: '#ff4d4d' }}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>System Owner</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

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
