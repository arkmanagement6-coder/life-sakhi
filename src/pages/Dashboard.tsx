import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { 
  Users, ShoppingBag, DollarSign, ClipboardList, 
  FileText, Download, Calendar, Activity, 
  Heart, LogOut, Check, X, Menu, Home, User, Landmark, 
  Sparkles, CheckCircle2, Truck, Shield
} from 'lucide-react';
import statesData from '../utils/states-and-districts.json';

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
  const [profileImage, setProfileImage] = useState(userProfile?.profileImageUrl || '');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Candidate data type for Recruitment Hub
  interface Candidate {
    id: string;
    name: string;
    email: string;
    phone: string;
    state: string;
    district: string;
    city: string;
    address: string;
    pincode: string;
    aadhaar: string;
    recruiterEmail: string;
    position: string;
    source: string;
    status: 'applied' | 'interview_scheduled' | 'hired' | 'rejected';
    createdAt: string;
  }

  // Seeding candidates state
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const raw = localStorage.getItem('life_sakhi_candidates');
    if (raw) return JSON.parse(raw);
    const defaultCandidates: Candidate[] = [
      { id: '1', name: 'Ramesh Yadav', email: 'ramesh@gmail.com', phone: '9876543210', state: 'Uttar Pradesh', district: 'Agra', city: 'Agra', address: '12, Sanjay Place', pincode: '282002', aadhaar: '123456789012', recruiterEmail: 'admin@gmail.com', position: 'Volunteer Advocate', source: 'NGO Allocated', status: 'applied', createdAt: new Date().toISOString() },
      { id: '2', name: 'Sunita Patel', email: 'sunita@gmail.com', phone: '9988776655', state: 'Uttar Pradesh', district: 'Mathura', city: 'Mathura', address: '45, Krishna Nagar', pincode: '281001', aadhaar: '234567890123', recruiterEmail: 'admin@gmail.com', position: 'Block Coordinator', source: 'Self Sourced', status: 'interview_scheduled', createdAt: new Date().toISOString() },
      { id: '3', name: 'Karan Singh', email: 'karan@gmail.com', phone: '8877665544', state: 'Maharashtra', district: 'Pune', city: 'Pune', address: '78, MG Road', pincode: '411001', aadhaar: '345678901234', recruiterEmail: 'admin@gmail.com', position: 'Volunteer Advocate', source: 'Self Sourced', status: 'hired', createdAt: new Date().toISOString() },
      { id: '4', name: 'Priya Sharma', email: 'priya@gmail.com', phone: '7766554433', state: 'Delhi', district: 'New Delhi', city: 'New Delhi', address: '90, Connaught Place', pincode: '110001', aadhaar: '456789012345', recruiterEmail: 'admin@gmail.com', position: 'Life Sakhi Distributor', source: 'NGO Allocated', status: 'rejected', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('life_sakhi_candidates', JSON.stringify(defaultCandidates));
    return defaultCandidates;
  });

  // Recruitment Add Candidate states
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candState, setCandState] = useState('Uttar Pradesh');
  const [candDistrict, setCandDistrict] = useState('Agra');
  const [candCity, setCandCity] = useState('');
  const [candAddress, setCandAddress] = useState('');
  const [candPincode, setCandPincode] = useState('');
  const [candAadhaar, setCandAadhaar] = useState('');
  const [candPosition, setCandPosition] = useState('Volunteer Advocate');
  const [candSource, setCandSource] = useState('Self Sourced');

  // Mobile verification states
  const [isVerifyingMobile, setIsVerifyingMobile] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [recruitmentSubTab, setRecruitmentSubTab] = useState<'applicants' | 'my_team'>('applicants');

  // Recruitment Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Order & Shipment Management States
  const [orders, setOrders] = useState<any[]>(() => {
    const raw = localStorage.getItem('life_sakhi_orders');
    if (raw) return JSON.parse(raw);
    const defaultOrders = [
      { id: 'ord-101', userEmail: 'sunita@gmail.com', userName: 'Sunita Patel', role: 'women_distributor', quantity: 50, amount: 1250, block: 'Achhnera', notes: 'Urgent medical camp distribution.', paymentMode: 'prepaid', paymentStatus: 'success', status: 'shipped', trackingId: 'DTDC765432109', createdAt: new Date().toISOString() },
      { id: 'ord-102', userEmail: 'karan@gmail.com', userName: 'Karan Singh', role: 'women_distributor', quantity: 100, amount: 2300, block: 'Fatehabad', notes: 'School health drive stock.', paymentMode: 'cod', paymentStatus: 'pending', status: 'pending_approval', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('life_sakhi_orders', JSON.stringify(defaultOrders));
    return defaultOrders;
  });

  const [paymentMode, setPaymentMode] = useState<'prepaid' | 'cod'>('prepaid');
  const [paymentProof, setPaymentProof] = useState<string>('');
  const [inputTrackingId, setInputTrackingId] = useState('');

  // Role Permissions Toggles configuration (Admin customized)
  const [permissions, setPermissions] = useState<any>(() => {
    const raw = localStorage.getItem('life_sakhi_role_permissions');
    if (raw) return JSON.parse(raw);
    const defaultPermissions = {
      admin: { approve_registrations: true, all_coordinators: true, shipment_desk: true },
      delivery_staff: { approve_registrations: false, all_coordinators: false, shipment_desk: true },
      state_coordinator: { schedule_camps: true, applicant_review: true, recruitment_hub: true },
      district_coordinator: { schedule_camps: true, applicant_review: true, recruitment_hub: true },
      hiring_partner: { recruitment_hub: true }
    };
    localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(defaultPermissions));
    return defaultPermissions;
  });

  // Admin user list state
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const loadAllUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList: any[] = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ uid: doc.id, ...doc.data() });
      });
      setAllUsers(usersList);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(usersList));
    } catch (err) {
      console.warn("Failed to fetch users from Firestore, fallback to local storage:", err);
      const raw = localStorage.getItem('life_sakhi_all_users');
      if (raw) {
        setAllUsers(JSON.parse(raw));
      }
    }
  };

  const loadCandidates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const cList: Candidate[] = [];
      querySnapshot.forEach((doc) => {
        cList.push({ id: doc.id, ...doc.data() } as Candidate);
      });
      if (cList.length > 0) {
        setCandidates(cList);
        localStorage.setItem('life_sakhi_candidates', JSON.stringify(cList));
      }
    } catch (err) {
      console.warn("Failed to fetch candidates from Firestore, fallback to local storage:", err);
    }
  };

  const loadOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const oList: any[] = [];
      querySnapshot.forEach((doc) => {
        oList.push({ id: doc.id, ...doc.data() });
      });
      if (oList.length > 0) {
        setOrders(oList);
        localStorage.setItem('life_sakhi_orders', JSON.stringify(oList));
      }
    } catch (err) {
      console.warn("Failed to fetch orders from Firestore, fallback to local storage:", err);
    }
  };

  const loadPermissions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "permissions"));
      const pObj: any = {};
      querySnapshot.forEach((doc) => {
        pObj[doc.id] = doc.data();
      });
      if (Object.keys(pObj).length > 0) {
        setPermissions(pObj);
        localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(pObj));
      }
    } catch (err) {
      console.warn("Failed to fetch permissions from Firestore:", err);
    }
  };

  React.useEffect(() => {
    loadAllUsers();
    loadCandidates();
    loadOrders();
    loadPermissions();
  }, []);

  React.useEffect(() => {
    if (userProfile) {
      setProfileEmail(userProfile.email || '');
      setProfilePhone(userProfile.phone || '');
      setProfileAddress(userProfile.address || 'Not Configured');
      setProfileImage(userProfile.profileImageUrl || '');
    }
  }, [userProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfileDetails(profileEmail, profilePhone, profileAddress, profileImage);
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
  const [newMemberImage, setNewMemberImage] = useState('');

  const [editingMemberUid, setEditingMemberUid] = useState<string | null>(null);
  const [editMemberName, setEditMemberName] = useState('');
  const [editMemberEmail, setEditMemberEmail] = useState('');
  const [editMemberPhone, setEditMemberPhone] = useState('');
  const [editMemberAddress, setEditMemberAddress] = useState('');
  const [editMemberRole, setEditMemberRole] = useState('block_coordinator');
  const [editMemberStatus, setEditMemberStatus] = useState('active');
  const [editMemberImage, setEditMemberImage] = useState('');

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
      profileImageUrl: newMemberImage,
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
    setNewMemberImage('');
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
          profileImageUrl: editMemberImage,
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
    setEditMemberImage('');
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

  const getRoleDisplayName = (roleKey = userProfile?.role) => {
    switch (roleKey) {
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
      case 'hiring_partner':
        return 'Hiring Partner';
      case 'delivery_staff':
        return 'Delivery Department Staff';
      case 'hospital':
        return 'Hospital Partner';
      case 'school':
        return 'School Partner';
      case 'ngo_partner':
        return 'NGO Partner';
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

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(sakhiOrder.quantity) || 50;
    const amt = qty * 25;
    if (amt < 1000) {
      alert('Minimum order value is ₹1,000 (at least 40 packets).');
      return;
    }

    if (paymentMode === 'prepaid' && !paymentProof) {
      alert('Please upload a screenshot of your payment receipt.');
      return;
    }

    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substring(7).toUpperCase(),
      userEmail: userProfile?.email || '',
      userName: userProfile?.displayName || 'Distributor',
      role: userProfile?.role || 'women_distributor',
      quantity: qty,
      amount: amt,
      block: sakhiOrder.block,
      notes: sakhiOrder.notes || 'No extra notes.',
      paymentMode: paymentMode,
      paymentProofUrl: paymentProof || undefined,
      paymentStatus: paymentMode === 'prepaid' ? 'success' : 'pending',
      status: 'pending_approval',
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('life_sakhi_orders', JSON.stringify(updatedOrders));

    try {
      await setDoc(doc(db, "orders", newOrder.id), newOrder);
    } catch (err) {
      console.warn("Failed to save order in Firestore:", err);
    }

    // Reset fields
    setSakhiOrder({ quantity: '50', block: '', notes: '' });
    setPaymentProof('');
    setPaymentMode('prepaid');
    alert('Stock order placed successfully! Check "My Stock Orders" tab to track DTDC dispatch details.');
  };

  const getSidebarMenuItems = () => {
    const common = [
      { id: 'overview', label: 'Overview', icon: <Activity size={18} /> }
    ];

    switch (role) {
      case 'admin':
        return [
          ...common,
          { id: 'approve_registrations', label: 'Approve Registrations', icon: <CheckCircle2 size={18} /> },
          { id: 'all_coordinators', label: 'Team Directory', icon: <Users size={18} /> },
          { id: 'shipment_desk', label: 'Shipments Desk', icon: <Truck size={18} /> },
          { id: 'admin_permissions', label: 'Access Rules', icon: <Shield size={18} /> }
        ];
      case 'delivery_staff':
        return [
          ...common,
          { id: 'shipment_desk', label: 'Shipments Desk', icon: <Truck size={18} /> }
        ];
      case 'women_distributor':
        return [
          ...common,
          { id: 'place_order', label: 'Order Pad Stock', icon: <ShoppingBag size={18} /> },
          { id: 'my_orders', label: 'My Stock Orders', icon: <FileText size={18} /> },
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
      case 'state_coordinator': {
        const items = [];
        if (permissions.state_coordinator?.schedule_camps) {
          items.push({ id: 'schedule_camps', label: 'Register Camps', icon: <Calendar size={18} /> });
        }
        if (permissions.state_coordinator?.applicant_review) {
          items.push({ id: 'applicant_review', label: 'Review Applicants', icon: <User size={18} /> });
        }
        if (permissions.state_coordinator?.recruitment_hub) {
          items.push({ id: 'recruitment_hub', label: 'Recruitment Hub', icon: <Users size={18} /> });
        }
        return [...common, ...items];
      }
      case 'hiring_partner': {
        const items = [];
        if (permissions.hiring_partner?.recruitment_hub !== false) {
          items.push({ id: 'recruitment_hub', label: 'Recruitment Hub', icon: <Users size={18} /> });
        }
        return [
          ...common,
          ...items,
          { id: 'place_order', label: 'Order Pad Stock', icon: <ShoppingBag size={18} /> },
          { id: 'my_orders', label: 'My Stock Orders', icon: <FileText size={18} /> },
          { id: 'sales_log', label: 'Log Daily Sales', icon: <ClipboardList size={18} /> }
        ];
      }
      case 'donor':
      case 'csr_partner':
      case 'corporate_partner':
      case 'hospital':
      case 'school':
      case 'ngo_partner':
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
      if (
        role === 'donor' || 
        role === 'csr_partner' || 
        role === 'corporate_partner' || 
        role === 'hospital' || 
        role === 'school' || 
        role === 'ngo_partner'
      ) {
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
      if (role === 'hiring_partner') {
        return (
          <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
            <div className="stat-card card-blue">
              <span>Candidates Sourced</span>
              <h3>48 Candidates</h3>
            </div>
            <div className="stat-card card-green">
              <span>Interviews Scheduled</span>
              <h3>8 Scheduled</h3>
            </div>
            <div className="stat-card card-blue">
              <span>Successful Joinings</span>
              <h3>12 Hired</h3>
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
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                  {userProfile?.profileImageUrl ? (
                    <img 
                      src={userProfile.profileImageUrl} 
                      alt="Profile" 
                      style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-green)' }} 
                    />
                  ) : (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(10, 60, 140, 0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                      {name ? name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
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
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Profile Photo</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProfileImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                    style={{ fontSize: '0.8rem', width: '100%', padding: '4px 0' }} 
                  />
                  {profileImage && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={profileImage} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-green)' }}>Photo selected</span>
                    </div>
                  )}
                </div>
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
                    setProfileImage(userProfile?.profileImageUrl || '');
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

  const renderRecruitmentHub = () => {
    const selectedStateObj = statesData.states.find((s: any) => s.state === candState);
    const districtOptions = selectedStateObj ? selectedStateObj.districts : [];

    const filterStateObj = statesData.states.find((s: any) => s.state === filterState);
    const filterDistrictOptions = filterStateObj ? filterStateObj.districts : [];

    // Filter candidate list for Applicants Database
    const filteredCandidates = candidates.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
      const matchState = filterState ? c.state === filterState : true;
      const matchDistrict = filterDistrict ? c.district === filterDistrict : true;
      const matchStatus = filterStatus ? c.status === filterStatus : true;
      return matchSearch && matchState && matchDistrict && matchStatus;
    });

    // Filter team list for Hiring Partner's team
    const myTeamMembers = allUsers.filter(u => u.recruiterEmail && u.recruiterEmail.toLowerCase() === userProfile?.email?.toLowerCase());

    const triggerSendOtp = () => {
      if (!candPhone || candPhone.length !== 10) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
      }
      
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      const isDuplicateUser = allUsers.some((u: any) => u.phone && u.phone.replace(/\s+/g, '').includes(candPhone));
      const isDuplicateCandidate = candidates.some((c: any) => c.phone.includes(candPhone));

      if (isDuplicateUser || isDuplicateCandidate) {
        alert('Duplicate Entry Error: A team member or candidate is already registered with this mobile number.');
        return;
      }

      setIsVerifyingMobile(true);
      alert('Simulated Verification SMS Sent!\nUse verification code "123456" to verify the mobile number.');
    };

    const verifyOtp = () => {
      if (mobileOtp === '123456') {
        setIsMobileVerified(true);
        setIsVerifyingMobile(false);
        setMobileOtp('');
        alert('Mobile number verified successfully!');
      } else {
        alert('Invalid OTP code. Please enter "123456" to simulate verification.');
      }
    };

    const handleAddCandidate = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!candName || !candPhone || !candEmail) {
        alert('Please fill out all required fields.');
        return;
      }

      if (!isMobileVerified) {
        alert('Please verify the candidate\'s mobile number first.');
        return;
      }

      // Check duplicates
      const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
      
      const isDuplicateEmailUser = allUsers.some((u: any) => u.email.toLowerCase() === candEmail.toLowerCase());
      const isDuplicateEmailCand = candidates.some((c: any) => c.email.toLowerCase() === candEmail.toLowerCase());

      if (isDuplicateEmailUser || isDuplicateEmailCand) {
        alert('Duplicate Entry Error: A candidate or user with this email address already exists.');
        return;
      }

      const newCand: Candidate = {
        id: 'cand-' + Math.random().toString(36).substring(7),
        name: candName,
        email: candEmail,
        phone: candPhone,
        state: candState,
        district: candDistrict,
        city: candCity,
        address: candAddress,
        pincode: candPincode,
        aadhaar: candAadhaar,
        recruiterEmail: userProfile?.email || 'admin@gmail.com',
        position: candPosition,
        source: candSource,
        status: 'applied',
        createdAt: new Date().toISOString()
      };

      // Add to candidates list
      const updated = [newCand, ...candidates];
      setCandidates(updated);
      localStorage.setItem('life_sakhi_candidates', JSON.stringify(updated));

      // Also add to allUsers with status 'pending' so Admin can approve!
      const newPendingUser = {
        uid: 'user-' + Math.random().toString(36).substring(7),
        email: candEmail,
        displayName: candName,
        phone: candPhone,
        address: candAddress,
        role: candPosition === 'Life Sakhi Distributor' ? 'women_distributor' : 
              candPosition === 'District Coordinator' ? 'district_coordinator' :
              candPosition === 'Block Coordinator' ? 'block_coordinator' :
              candPosition === 'State Coordinator' ? 'state_coordinator' :
              candPosition === 'Clinical Volunteer / Doctor' ? 'doctor' : 'volunteer',
        status: 'pending',
        recruiterEmail: userProfile?.email || 'admin@gmail.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      allUsers.push(newPendingUser);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(allUsers));

      try {
        await setDoc(doc(db, "candidates", newCand.id), newCand);
        await setDoc(doc(db, "users", newPendingUser.uid), newPendingUser);
      } catch (err) {
        console.warn("Failed to save candidate / user in Firestore:", err);
      }

      loadAllUsers();

      // Reset form fields
      setCandName('');
      setCandEmail('');
      setCandPhone('');
      setCandCity('');
      setCandAddress('');
      setCandPincode('');
      setCandAadhaar('');
      setIsMobileVerified(false);

      alert('Candidate profile registered successfully under "Pending Approvals"!');
    };

    const handleUpdateStatus = async (id: string, newStatus: 'applied' | 'interview_scheduled' | 'hired' | 'rejected') => {
      const updated = candidates.map(c => c.id === id ? { ...c, status: newStatus } : c);
      setCandidates(updated);
      localStorage.setItem('life_sakhi_candidates', JSON.stringify(updated));
      try {
        await setDoc(doc(db, "candidates", id), { status: newStatus }, { merge: true });
      } catch (err) {
        console.warn("Failed to update candidate status in Firestore:", err);
      }
    };

    const toggleMemberStatus = async (uid: string, currentStatus: string) => {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const updatedUsers = allUsers.map(u => u.uid === uid ? { ...u, status: newStatus } : u);
      localStorage.setItem('life_sakhi_all_users', JSON.stringify(updatedUsers));
      try {
        await setDoc(doc(db, "users", uid), { status: newStatus }, { merge: true });
      } catch (err) {
        console.warn("Failed to toggle member status in Firestore:", err);
      }
      loadAllUsers();
      alert(`User status changed to ${newStatus === 'active' ? 'ACTIVE (Unlocked)' : 'INACTIVE (Suspended / Blocked)'}`);
    };

    return (
      <div style={{ background: 'white', padding: '30px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--box-shadow-sm)', marginTop: '20px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontWeight: 800, marginBottom: '5px' }}>Recruitment & Team Hub</h3>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '25px' }}>
          Manage your recruits, monitor team status, verify mobile contacts, and add new candidates.
        </p>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          <button 
            type="button"
            style={{ background: 'none', border: 'none', borderBottom: recruitmentSubTab === 'applicants' ? '2.5px solid var(--color-primary)' : 'none', fontWeight: recruitmentSubTab === 'applicants' ? 700 : 500, padding: '8px 16px', cursor: 'pointer', color: recruitmentSubTab === 'applicants' ? 'var(--color-primary)' : 'var(--color-muted)' }}
            onClick={() => setRecruitmentSubTab('applicants')}
          >
            Candidate Database
          </button>
          <button 
            type="button"
            style={{ background: 'none', border: 'none', borderBottom: recruitmentSubTab === 'my_team' ? '2.5px solid var(--color-primary)' : 'none', fontWeight: recruitmentSubTab === 'my_team' ? 700 : 500, padding: '8px 16px', cursor: 'pointer', color: recruitmentSubTab === 'my_team' ? 'var(--color-primary)' : 'var(--color-muted)' }}
            onClick={() => setRecruitmentSubTab('my_team')}
          >
            My Team (Performance & Status Desk)
          </button>
        </div>

        {isVerifyingMobile && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '8px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 800, marginBottom: '10px' }}>Verify Candidate Phone</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                Simulated confirmation code sent to +91 {candPhone}. Enter code <strong>123456</strong> to verify.
              </p>
              <input 
                type="text" 
                placeholder="Enter 123456" 
                className="form-control" 
                value={mobileOtp} 
                onChange={(e) => setMobileOtp(e.target.value)} 
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '4px', marginBottom: '20px' }} 
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={verifyOtp}>Confirm</button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setIsVerifyingMobile(false); setMobileOtp(''); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {recruitmentSubTab === 'applicants' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.3fr', gap: '30px', alignItems: 'start' }}>
            {/* Left Side: Candidates Database */}
            <div>
              {/* Filters panel */}
              <div style={{ background: 'var(--color-light-gray)', padding: '15px', borderRadius: 'var(--border-radius-sm)', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '4px' }}>Search Candidate</label>
                  <input
                    type="text"
                    placeholder="Name or phone..."
                    className="form-control"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', height: 'auto', background: 'white' }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '4px' }}>Filter State</label>
                  <select
                    className="form-control form-select"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', height: 'auto', background: 'white' }}
                    value={filterState}
                    onChange={(e) => { setFilterState(e.target.value); setFilterDistrict(''); }}
                  >
                    <option value="">All States</option>
                    {statesData.states.map((s: any) => (
                      <option key={s.state} value={s.state}>{s.state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '4px' }}>Filter District</label>
                  <select
                    className="form-control form-select"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', height: 'auto', background: 'white' }}
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    disabled={!filterState}
                  >
                    <option value="">All Districts</option>
                    {filterDistrictOptions.map((d: string) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted)', display: 'block', marginBottom: '4px' }}>Filter Status</label>
                  <select
                    className="form-control form-select"
                    style={{ padding: '6px 12px', fontSize: '0.8rem', height: 'auto', background: 'white' }}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="applied">Applied</option>
                    <option value="interview_scheduled">Interview Scheduled</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)' }}>
                <table className="table" style={{ margin: 0 }}>
                  <thead style={{ background: 'var(--color-light-gray)' }}>
                    <tr>
                      <th>Candidate</th>
                      <th>Applied Role</th>
                      <th>Contact</th>
                      <th>Location</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: 'var(--color-muted)' }}>No candidates found matching the filters.</td>
                      </tr>
                    ) : (
                      filteredCandidates.map(c => (
                        <tr key={c.id}>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{c.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Registered on {new Date(c.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'var(--color-light-gray)', borderRadius: '4px', fontWeight: 500 }}>
                              {c.position}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.8rem' }}>+91 {c.phone}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{c.email}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{c.district}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>{c.state}</div>
                          </td>
                          <td>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: c.source.includes('Self') ? 'var(--color-primary)' : 'var(--color-muted)' }}>
                              {c.source}
                            </span>
                          </td>
                          <td>
                            <span className={`status-badge status-${c.status === 'hired' ? 'active' : c.status === 'rejected' ? 'rejected' : c.status === 'interview_scheduled' ? 'pending' : 'pending'}`} style={{ textTransform: 'capitalize' }}>
                              {c.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              {c.status === 'applied' && (
                                <button
                                  type="button"
                                  className="btn btn-outline"
                                  style={{ padding: '4px 8px', fontSize: '0.7rem', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
                                  onClick={() => handleUpdateStatus(c.id, 'interview_scheduled')}
                                >
                                  Schedule
                                </button>
                              )}
                              {c.status === 'interview_scheduled' && (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  style={{ padding: '4px 8px', fontSize: '0.7rem', background: 'var(--color-green)' }}
                                  onClick={() => handleUpdateStatus(c.id, 'hired')}
                                >
                                  Hire
                                </button>
                              )}
                              {c.status !== 'hired' && c.status !== 'rejected' && (
                                <button
                                  type="button"
                                  className="btn btn-outline"
                                  style={{ padding: '4px 8px', fontSize: '0.7rem', borderColor: 'var(--color-red)', color: 'var(--color-red)' }}
                                  onClick={() => handleUpdateStatus(c.id, 'rejected')}
                                >
                                  Reject
                                </button>
                              )}
                              {(c.status === 'hired' || c.status === 'rejected') && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>No actions</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side: Add Candidate Form */}
            <div style={{ background: 'var(--color-light-gray)', padding: '20px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-gray-light)' }}>
              <h4 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '15px' }}>Add Candidate</h4>
              <form onSubmit={handleAddCandidate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: 'white' }}
                    placeholder="Enter full name"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    style={{ background: 'white' }}
                    placeholder="name@example.com"
                    value={candEmail}
                    onChange={(e) => setCandEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Phone Number</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="tel"
                      className="form-control"
                      style={{ background: 'white', flex: 1 }}
                      placeholder="10-digit phone"
                      maxLength={10}
                      value={candPhone}
                      onChange={(e) => { setCandPhone(e.target.value); setIsMobileVerified(false); }}
                      disabled={isMobileVerified}
                      required
                    />
                    <button 
                      type="button" 
                      onClick={triggerSendOtp}
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '0.75rem', background: isMobileVerified ? 'var(--color-green)' : 'var(--color-primary)' }}
                      disabled={isMobileVerified}
                    >
                      {isMobileVerified ? 'Verified ✓' : 'Send OTP'}
                    </button>
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Aadhaar Number (12-Digits)</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: 'white' }}
                    placeholder="XXXX XXXX XXXX"
                    maxLength={12}
                    value={candAadhaar}
                    onChange={(e) => setCandAadhaar(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Position / Role</label>
                  <select
                    className="form-control form-select"
                    style={{ background: 'white' }}
                    value={candPosition}
                    onChange={(e) => setCandPosition(e.target.value)}
                  >
                    <option value="Volunteer Advocate">Volunteer Advocate</option>
                    <option value="District Coordinator">District Coordinator</option>
                    <option value="Block Coordinator">Block Coordinator</option>
                    <option value="State Coordinator">State Coordinator</option>
                    <option value="Life Sakhi Distributor">Life Sakhi Distributor</option>
                    <option value="Clinical Volunteer / Doctor">Clinical Volunteer / Doctor</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>State</label>
                    <select
                      className="form-control form-select"
                      style={{ background: 'white' }}
                      value={candState}
                      onChange={(e) => { setCandState(e.target.value); setCandDistrict(statesData.states.find((s: any) => s.state === e.target.value)?.districts[0] || ''); }}
                    >
                      {statesData.states.map((s: any) => (
                        <option key={s.state} value={s.state}>{s.state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>District</label>
                    <select
                      className="form-control form-select"
                      style={{ background: 'white' }}
                      value={candDistrict}
                      onChange={(e) => setCandDistrict(e.target.value)}
                    >
                      {districtOptions.map((d: string) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>City</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ background: 'white' }}
                      placeholder="e.g. Mathura"
                      value={candCity}
                      onChange={(e) => setCandCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ background: 'white' }}
                      placeholder="6-Digits"
                      maxLength={6}
                      value={candPincode}
                      onChange={(e) => setCandPincode(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Physical Address</label>
                  <textarea
                    rows={2}
                    className="form-control"
                    style={{ background: 'white', resize: 'none' }}
                    placeholder="Enter complete house address"
                    value={candAddress}
                    onChange={(e) => setCandAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Source Mode</label>
                  <select
                    className="form-control form-select"
                    style={{ background: 'white' }}
                    value={candSource}
                    onChange={(e) => setCandSource(e.target.value)}
                  >
                    <option value="Self Sourced">Self Sourced (Brought by Me)</option>
                    <option value="NGO Allocated">NGO Allocated (Brought by NGO)</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '5px' }}>
                  Register Candidate
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* My Team list */
          <div style={{ overflowX: 'auto', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)' }}>
            <table className="table" style={{ margin: 0 }}>
              <thead style={{ background: 'var(--color-light-gray)' }}>
                <tr>
                  <th>Team Member</th>
                  <th>Designation</th>
                  <th>Contact Details</th>
                  <th>Location / Pincode</th>
                  <th>Sales (Subsidized Packs)</th>
                  <th>Portal Access Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTeamMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: 'var(--color-muted)' }}>
                      No active team members registered under your recruiter account yet.
                    </td>
                  </tr>
                ) : (
                  myTeamMembers.map(m => (
                    <tr key={m.uid}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--color-dark)' }}>{m.displayName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Joined {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'N/A'}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: 'rgba(140, 198, 62, 0.08)', color: 'var(--color-green)', borderRadius: '4px', fontWeight: 600 }}>
                          {getRoleDisplayName(m.role)}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>+91 {m.phone || 'N/A'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{m.email}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>{m.address || 'Not Configured'}</div>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                          {m.role === 'women_distributor' ? '320 Packs (Subsidized)' : 'N/A'}
                        </strong>
                      </td>
                      <td>
                        <span className={`status-badge status-${m.status === 'active' ? 'active' : 'rejected'}`}>
                          {m.status === 'active' ? 'Active' : m.status === 'inactive' ? 'Blocked' : m.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          type="button"
                          className="btn btn-outline" 
                          onClick={() => toggleMemberStatus(m.uid, m.status)}
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderColor: m.status === 'active' ? '#ff4d4d' : 'var(--color-green)', color: m.status === 'active' ? '#ff4d4d' : 'var(--color-green)' }}
                        >
                          {m.status === 'active' ? 'Block Member' : 'Unblock Member'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
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

          {activeTab === 'my_orders' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>My Stock Orders</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '25px' }}>
                Track payment approvals, processing status, DTDC tracking ids, and package delivery.
              </p>
              
              <div style={{ overflowX: 'auto', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)' }}>
                <table className="table" style={{ margin: 0 }}>
                  <thead style={{ background: 'var(--color-light-gray)' }}>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Quantity / Value</th>
                      <th>Payment Mode</th>
                      <th>Status</th>
                      <th>DTDC Shipment Tracking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(o => o.userEmail === userProfile?.email).length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', padding: '20px', color: 'var(--color-muted)' }}>You have not placed any stock orders yet.</td>
                      </tr>
                    ) : (
                      orders.filter(o => o.userEmail === userProfile?.email).map(o => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{o.id}</td>
                          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{o.quantity} Packets</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Total: ₹{o.amount}</div>
                          </td>
                          <td style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>{o.paymentMode}</td>
                          <td>
                            <span className={`status-badge status-${o.status === 'delivered' ? 'active' : o.status === 'shipped' ? 'pending' : 'pending'}`} style={{ textTransform: 'capitalize' }}>
                              {o.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            {o.status === 'shipped' || o.status === 'delivered' ? (
                              <div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>DTDC Tracking ID: {o.trackingId}</div>
                                <a 
                                  href={`https://www.dtdc.in/tracking/tracking_results.asp?ctc=${o.trackingId}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="btn btn-primary"
                                  style={{ display: 'inline-block', padding: '3px 8px', fontSize: '0.7rem', marginTop: '4px', textDecoration: 'none' }}
                                >
                                  Track DTDC Shipment 🡕
                                </a>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', fontStyle: 'italic' }}>Pending shipment dispatch</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'shipment_desk' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 800 }}>Shipments & Dispatch Manager</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '25px' }}>
                Verify prepaid order screenshot receipts, approve orders, allocate DTDC tracking numbers, and manage delivery status.
              </p>

              <div style={{ overflowX: 'auto', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)' }}>
                <table className="table" style={{ margin: 0 }}>
                  <thead style={{ background: 'var(--color-light-gray)' }}>
                    <tr>
                      <th>Order ID</th>
                      <th>Distributor Name</th>
                      <th>Quantity / Cost</th>
                      <th>Payment Detail</th>
                      <th>Shipping Block</th>
                      <th>Status</th>
                      <th>DTDC Tracking ID / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '20px', color: 'var(--color-muted)' }}>No stock orders registered in the system yet.</td>
                      </tr>
                    ) : (
                      orders.map(o => (
                        <tr key={o.id}>
                          <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{o.id}</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{o.userName}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{o.userEmail}</div>
                          </td>
                          <td>
                            <div>{o.quantity} Packets</div>
                            <strong style={{ fontSize: '0.75rem' }}>₹{o.amount}</strong>
                          </td>
                          <td>
                            <div style={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '0.8rem' }}>{o.paymentMode}</div>
                            {o.paymentProofUrl && (
                              <button 
                                type="button"
                                className="btn btn-outline" 
                                style={{ padding: '2px 6px', fontSize: '0.7rem', marginTop: '4px' }}
                                onClick={() => {
                                  const win = window.open();
                                  if (win) {
                                    win.document.write(`<iframe src="${o.paymentProofUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
                                  }
                                }}
                              >
                                View Payment Proof Receipt 🖼
                              </button>
                            )}
                          </td>
                          <td>{o.block}</td>
                          <td>
                            <span className={`status-badge status-${o.status === 'delivered' ? 'active' : o.status === 'shipped' ? 'pending' : 'pending'}`}>
                              {o.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            {o.status === 'pending_approval' && (
                              <button 
                                type="button"
                                className="btn btn-secondary" 
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                onClick={async () => {
                                  const updated = orders.map(order => order.id === o.id ? { ...order, status: 'processing', paymentStatus: 'success' } : order);
                                  setOrders(updated);
                                  localStorage.setItem('life_sakhi_orders', JSON.stringify(updated));
                                  try {
                                    await setDoc(doc(db, "orders", o.id), { status: 'processing', paymentStatus: 'success' }, { merge: true });
                                  } catch (err) {
                                    console.warn("Failed to update order in Firestore:", err);
                                  }
                                  alert('Payment Verified! Order moved to processing & dispatch queue.');
                                }}
                              >
                                Confirm Payment
                              </button>
                            )}

                            {o.status === 'processing' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <input 
                                  type="text" 
                                  placeholder="DTDC Tracking ID" 
                                  className="form-control" 
                                  style={{ padding: '4px 8px', fontSize: '0.75rem', height: 'auto', background: 'white' }}
                                  onChange={(e) => setInputTrackingId(e.target.value)} 
                                />
                                <button 
                                  type="button"
                                  className="btn btn-primary" 
                                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                  onClick={async () => {
                                    if (!inputTrackingId) {
                                      alert('Please enter a tracking ID first!');
                                      return;
                                    }
                                    const updated = orders.map(order => order.id === o.id ? { ...order, status: 'shipped', trackingId: inputTrackingId } : order);
                                    setOrders(updated);
                                    localStorage.setItem('life_sakhi_orders', JSON.stringify(updated));
                                    try {
                                      await setDoc(doc(db, "orders", o.id), { status: 'shipped', trackingId: inputTrackingId }, { merge: true });
                                    } catch (err) {
                                      console.warn("Failed to save tracking ID in Firestore:", err);
                                    }
                                    setInputTrackingId('');
                                    alert(`Order ${o.id} marked shipped via DTDC with Tracking ID: ${inputTrackingId}`);
                                  }}
                                >
                                  Dispatch Shipment
                                </button>
                              </div>
                            )}

                            {o.status === 'shipped' && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Tracking: {o.trackingId}</div>
                                <button 
                                  type="button"
                                  className="btn btn-secondary" 
                                  style={{ padding: '4px 10px', fontSize: '0.75rem', background: 'var(--color-green)' }}
                                  onClick={async () => {
                                    const updated = orders.map(order => order.id === o.id ? { ...order, status: 'delivered' } : order);
                                    setOrders(updated);
                                    localStorage.setItem('life_sakhi_orders', JSON.stringify(updated));
                                    try {
                                      await setDoc(doc(db, "orders", o.id), { status: 'delivered' }, { merge: true });
                                    } catch (err) {
                                      console.warn("Failed to update delivery status in Firestore:", err);
                                    }
                                    alert(`Order ${o.id} marked successfully delivered!`);
                                  }}
                                >
                                  Mark Delivered
                                </button>
                              </div>
                            )}

                            {o.status === 'delivered' && (
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 600 }}>Delivered ✓</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'admin_permissions' && (
            <div className="card" style={{ padding: '30px' }}>
              <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Access Control & Permissions Panel</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '25px' }}>
                Toggle which segments and dashboard features are visible to coordinators, delivery department staff, and hiring partners.
              </p>

              <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '8px', border: '1px solid #eee', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '10px' }}>State / District Coordinator Features</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={permissions.state_coordinator?.schedule_camps} 
                        onChange={(e) => {
                          const updated = { ...permissions, state_coordinator: { ...permissions.state_coordinator, schedule_camps: e.target.checked } };
                          setPermissions(updated);
                          localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(updated));
                        }} 
                      />
                      Access to "Register Camps" Tab
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={permissions.state_coordinator?.applicant_review} 
                        onChange={(e) => {
                          const updated = { ...permissions, state_coordinator: { ...permissions.state_coordinator, applicant_review: e.target.checked } };
                          setPermissions(updated);
                          localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(updated));
                        }} 
                      />
                      Access to "Review Applicants" Tab
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={permissions.state_coordinator?.recruitment_hub} 
                        onChange={(e) => {
                          const updated = { ...permissions, state_coordinator: { ...permissions.state_coordinator, recruitment_hub: e.target.checked } };
                          setPermissions(updated);
                          localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(updated));
                        }} 
                      />
                      Access to "Recruitment Hub" Tab
                    </label>
                  </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '5px 0' }} />

                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '10px' }}>Hiring Partner Features</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={permissions.hiring_partner?.recruitment_hub} 
                        onChange={(e) => {
                          const updated = { ...permissions, hiring_partner: { ...permissions.hiring_partner, recruitment_hub: e.target.checked } };
                          setPermissions(updated);
                          localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(updated));
                        }} 
                      />
                      Access to "Recruitment Hub" Tab
                    </label>
                  </div>
                </div>

                <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '5px 0' }} />

                <div>
                  <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '10px' }}>Delivery Department Staff Features</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={permissions.delivery_staff?.shipment_desk} 
                        onChange={(e) => {
                          const updated = { ...permissions, delivery_staff: { ...permissions.delivery_staff, shipment_desk: e.target.checked } };
                          setPermissions(updated);
                          localStorage.setItem('life_sakhi_role_permissions', JSON.stringify(updated));
                        }} 
                      />
                      Access to "Shipments Desk"
                    </label>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary" 
                  style={{ marginTop: '10px', padding: '10px' }}
                  onClick={async () => {
                    try {
                      await setDoc(doc(db, "permissions", "state_coordinator"), permissions.state_coordinator || {}, { merge: true });
                      await setDoc(doc(db, "permissions", "hiring_partner"), permissions.hiring_partner || {}, { merge: true });
                      await setDoc(doc(db, "permissions", "delivery_staff"), permissions.delivery_staff || {}, { merge: true });
                      alert('Permissions config saved successfully to Firebase Firestore!');
                    } catch (err) {
                      console.warn("Failed to save permissions to Firestore:", err);
                      alert('Permissions saved locally, but database sync failed.');
                    }
                  }}
                >
                  Save Access Settings
                </button>
              </div>
            </div>
          )}

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
                          <td style={{ padding: '12px', fontWeight: 600 }}>
                            <div>{u.displayName}</div>
                            {u.recruiterEmail && (
                              <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 500, fontStyle: 'italic', marginTop: '2px' }}>
                                Sourced by: {u.recruiterEmail}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: 'rgba(10, 60, 140, 0.08)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                              {getRoleDisplayName(u.role)}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>{u.email}</td>
                          <td style={{ padding: '12px' }}>{u.phone}</td>
                          <td style={{ padding: '12px' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button 
                                onClick={async () => { await approveUserStatus(u.uid, 'active'); await loadAllUsers(); }} 
                                className="btn btn-primary" 
                                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                              >
                                Approve
                              </button>
                              <button 
                                onClick={async () => { await approveUserStatus(u.uid, 'rejected'); await loadAllUsers(); }} 
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
                          <option value="hiring_partner">Hiring Partner</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '4px' }}>Profile Photo</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const img = new Image();
                              const objectUrl = URL.createObjectURL(file);
                              img.src = objectUrl;
                              img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const MAX_SIZE = 250;
                                let width = img.width;
                                let height = img.height;
                                if (width > height) {
                                  if (width > MAX_SIZE) {
                                    height *= MAX_SIZE / width;
                                    width = MAX_SIZE;
                                  }
                                } else {
                                  if (height > MAX_SIZE) {
                                    width *= MAX_SIZE / height;
                                    height = MAX_SIZE;
                                  }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext('2d');
                                if (ctx) {
                                  ctx.drawImage(img, 0, 0, width, height);
                                  const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                                  setNewMemberImage(compressedBase64);
                                }
                                URL.revokeObjectURL(objectUrl);
                              };
                            }
                          }} 
                          style={{ fontSize: '0.8rem', width: '100%', padding: '4px 0' }} 
                        />
                        {newMemberImage && (
                          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={newMemberImage} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-green)' }}>Compressed</span>
                          </div>
                        )}
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
                          <option value="hiring_partner">Hiring Partner</option>
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
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: '#856404', marginBottom: '4px' }}>Profile Photo</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const img = new Image();
                              const objectUrl = URL.createObjectURL(file);
                              img.src = objectUrl;
                              img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const MAX_SIZE = 250;
                                let width = img.width;
                                let height = img.height;
                                if (width > height) {
                                  if (width > MAX_SIZE) {
                                    height *= MAX_SIZE / width;
                                    width = MAX_SIZE;
                                  }
                                } else {
                                  if (height > MAX_SIZE) {
                                    width *= MAX_SIZE / height;
                                    height = MAX_SIZE;
                                  }
                                }
                                canvas.width = width;
                                canvas.height = height;
                                const ctx = canvas.getContext('2d');
                                if (ctx) {
                                  ctx.drawImage(img, 0, 0, width, height);
                                  const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
                                  setEditMemberImage(compressedBase64);
                                }
                                URL.revokeObjectURL(objectUrl);
                              };
                            }
                          }} 
                          style={{ fontSize: '0.8rem', width: '100%', padding: '4px 0' }} 
                        />
                        {editMemberImage && (
                          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={editMemberImage} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-green)' }}>Compressed</span>
                          </div>
                        )}
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
                            {getRoleDisplayName(u.role)}
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
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                              {u.role !== 'admin' && u.role !== 'hiring_partner' && (
                                <select 
                                  value={u.recruiterEmail || ''} 
                                  onChange={(e) => {
                                    const selectedRecruiterEmail = e.target.value;
                                    const updatedUsers = allUsers.map(user => user.uid === u.uid ? { ...user, recruiterEmail: selectedRecruiterEmail || undefined } : user);
                                    localStorage.setItem('life_sakhi_all_users', JSON.stringify(updatedUsers));
                                    loadAllUsers();
                                    alert(`Successfully assigned ${u.displayName} to Recruiter: ${selectedRecruiterEmail || 'None'}`);
                                  }}
                                  style={{ padding: '4px 6px', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid #ddd', background: 'white' }}
                                >
                                  <option value="">No Recruiter</option>
                                  {allUsers.filter(user => user.role === 'hiring_partner').map(hp => (
                                    <option key={hp.uid} value={hp.email}>{hp.displayName}</option>
                                  ))}
                                </select>
                              )}
                              <button 
                                onClick={() => {
                                  setEditingMemberUid(u.uid);
                                  setEditMemberName(u.displayName);
                                  setEditMemberEmail(u.email);
                                  setEditMemberPhone(u.phone || '');
                                  setEditMemberAddress(u.address || 'Agra');
                                  setEditMemberRole(u.role);
                                  setEditMemberStatus(u.status);
                                  setEditMemberImage(u.profileImageUrl || '');
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
              <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Quantity (Packets - Subsidized price ₹25/packet)</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    required 
                    min={40} 
                    value={sakhiOrder.quantity || '50'} 
                    onChange={(e) => {
                      const val = e.target.value;
                      setSakhiOrder((prev: any) => ({ ...prev, quantity: val }));
                    }} 
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} 
                  />
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginTop: '5px', fontWeight: 600 }}>
                    Subsidized Order Cost: ₹{parseInt(sakhiOrder.quantity) ? parseInt(sakhiOrder.quantity) * 25 : 0}
                  </div>
                  {(parseInt(sakhiOrder.quantity) || 0) * 25 < 1000 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-red)', marginTop: '4px', fontWeight: 500 }}>
                      ⚠ Minimum order value must be at least ₹1,000 (at least 40 packets).
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Payment Mode</label>
                  <select 
                    value={paymentMode} 
                    onChange={(e) => setPaymentMode(e.target.value as 'prepaid' | 'cod')} 
                    style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', background: 'white' }}
                  >
                    <option value="prepaid">Prepaid (UPI Scan QR / Online)</option>
                    <option value="cod">Cash On Delivery (COD)</option>
                  </select>
                </div>

                {paymentMode === 'prepaid' ? (
                  <div style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: '15px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '8px', color: 'var(--color-primary)' }}>Scan QR Code to Pay</label>
                      <div style={{ width: '150px', height: '150px', margin: '0 auto 10px auto', background: 'white', padding: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=lifesakhingo@ybl%26am=${(parseInt(sakhiOrder.quantity) || 50) * 25}%26cu=INR`} 
                          alt="UPI Payment QR Code" 
                          style={{ width: '130px', height: '130px' }} 
                        />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>Scan with GPay, PhonePe, Paytm, or BHIM UPI</span>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Upload Payment Screenshot (Proof)</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        required={paymentMode === 'prepaid'}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const img = new Image();
                            const objectUrl = URL.createObjectURL(file);
                            img.src = objectUrl;
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              const MAX_SIZE = 450;
                              let width = img.width;
                              let height = img.height;
                              if (width > height) {
                                if (width > MAX_SIZE) {
                                  height *= MAX_SIZE / width;
                                  width = MAX_SIZE;
                                }
                              } else {
                                if (height > MAX_SIZE) {
                                  width *= MAX_SIZE / height;
                                  height = MAX_SIZE;
                                }
                              }
                              canvas.width = width;
                              canvas.height = height;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.drawImage(img, 0, 0, width, height);
                                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                                setPaymentProof(compressedBase64);
                              }
                              URL.revokeObjectURL(objectUrl);
                            };
                          }
                        }}
                        style={{ width: '100%', fontSize: '0.8rem' }}
                      />
                      {paymentProof && (
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={paymentProof} alt="Receipt Preview" style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #ddd' }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-green)' }}>Screenshot receipt compressed successfully!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ background: '#fff3cd', border: '1px solid #ffeeba', color: '#856404', padding: '15px', borderRadius: '6px', fontSize: '0.8rem' }}>
                    <strong>Cash on Delivery (COD) Notice:</strong> COD orders require manual verification and approval from the Delivery department. It may delay processing.
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Block Area</label>
                  <input type="text" name="block" required value={sakhiOrder.block} onChange={handleInputChange(setSakhiOrder)} placeholder="e.g. Achhnera Block" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Notes / Directions</label>
                  <textarea name="notes" rows={2} value={sakhiOrder.notes} onChange={handleInputChange(setSakhiOrder)} placeholder="Provide special instructions..." style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', resize: 'none' }} />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={(parseInt(sakhiOrder.quantity) || 0) * 25 < 1000}
                  style={{ padding: '10px', marginTop: '10px' }}
                >
                  Request & Purchase Stock
                </button>
              </form>
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

          {activeTab === 'recruitment_hub' && renderRecruitmentHub()}

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
