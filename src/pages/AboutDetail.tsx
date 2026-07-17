import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send, Shield, Search, MapPin, Users } from 'lucide-react';

import indiaData from '../utils/states-and-districts.json';

const STATE_DISTRICTS: Record<string, string[]> = {
  "All States": []
};
indiaData.states.forEach((item: any) => {
  STATE_DISTRICTS[item.state] = item.districts;
});

const DIRECTORY_MEMBERS = [
  { name: "Dinesh Kumar", role: "volunteer", state: "Uttar Pradesh", district: "Agra", phone: "+91 99887 76655", email: "dinesh@example.com" },
  { name: "Preeti Singh", role: "district_coordinator", state: "Uttar Pradesh", district: "Mathura", phone: "+91 88776 65544", email: "preeti@example.com" },
  { name: "Ramesh Patil", role: "volunteer", state: "Maharashtra", district: "Pune", phone: "+91 77665 54433", email: "ramesh@example.com" },
  { name: "Meenakshi Nair", role: "state_coordinator", state: "Maharashtra", district: "Mumbai", phone: "+91 66554 43322", email: "meenakshi@example.com" },
  { name: "Vivek Sharma", role: "csr_partner", state: "Delhi", district: "New Delhi", phone: "+91 95432 10987", email: "vivek@example.com" },
  { name: "Rajesh Gupta", role: "district_coordinator", state: "Haryana", district: "Rohtak", phone: "+91 84321 09876", email: "rajesh@example.com" },
  { name: "Pooja Chaudhary", role: "volunteer", state: "Haryana", district: "Gurugram", phone: "+91 93210 98765", email: "pooja@example.com" },
  { name: "Amit Sen", role: "state_coordinator", state: "Rajasthan", district: "Jaipur", phone: "+91 92109 87654", email: "amit@example.com" },
  { name: "Priya Verma", role: "corporate_partner", state: "Rajasthan", district: "Jodhpur", phone: "+91 91098 76543", email: "priya@example.com" },
  { name: "Sunil Dutt", role: "volunteer", state: "Madhya Pradesh", district: "Bhopal", phone: "+91 91122 33445", email: "sunil@example.com" },
  { name: "Kirti Patel", role: "volunteer", state: "Gujarat", district: "Ahmedabad", phone: "+91 92233 44556", email: "kirti@example.com" },
  { name: "Deepak Gill", role: "district_coordinator", state: "Punjab", district: "Amritsar", phone: "+91 93344 55667", email: "deepak@example.com" },
  { name: "Ananya Roy", role: "volunteer", state: "West Bengal", district: "Kolkata", phone: "+91 94455 66778", email: "ananya@example.com" },
  { name: "Karthik Raja", role: "volunteer", state: "Tamil Nadu", district: "Chennai", phone: "+91 95566 77889", email: "karthik@example.com" },
  { name: "Suresh Hegde", role: "state_coordinator", state: "Karnataka", district: "Bengaluru", phone: "+91 96677 88990", email: "suresh@example.com" }
];

const AboutDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'founder';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', orgName: '' });

  // Filters State
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 1. Founder Journey Layout
  const renderFounder = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>About Mr. Dinesh Pahwa</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          Mr. Dinesh Pahwa is a visionary philanthropist and social entrepreneur who has dedicated over two decades to rural community development, grassroots health programs, and primary digital education.
        </p>

        {/* Chronological journey timeline */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Milestones & Journey</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
          {[
            { year: "2012 - 2018: Rural Health Pilot Projects", desc: "Coordinated volunteer doctor checkup camps in dry regions of Haryana, treating thousands of rural patients." },
            { year: "2019 - 2021: Menstrual Health Advocacy Development", desc: "Recognized the critical need for local sanitary pad production to replace unhygienic practices, drafting the outline of Life Sakhi." },
            { year: "2022: Trust Registration", desc: "Formally registered Life Changing Educational & Charitable Trust to build structural support for women and children." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', background: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius-sm)', borderLeft: '4px solid var(--color-green)' }}>
              <div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '5px' }}>{item.year}</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. Vision Mission Statement Layout
  const renderVisionMission = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Vision, Mission & Organization Pillars</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We aspire to build an inclusive society where quality primary education, preventive healthcare diagnostics, and sanitary pad access are standardized rights.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Our Three Core Pillars</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Empowerment", desc: "Lending micro seed capital and vocational skills to establish women-led startups." },
            { title: "Education", desc: "Integrating interactive e-learning digital panels in underfunded primary schoolrooms." },
            { title: "Healthcare", desc: "Providing diagnostics, medicines, and menstrual hygiene advocacy campaigns." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', textAlign: 'center' }}>
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Legal & Accreditation details (12A, 80G, CSR status cards)
  const renderLegal = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Legal & Tax Exemption Compliances</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Life Changing Educational & Charitable Trust operates with absolute transparency. We hold complete legal approvals under Indian tax codes.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Tax Accreditations & Reg. Details</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { cert: "Section 80G Approval", no: "AAATL3102RF20221", desc: "Enables individual and corporate donors to claim 50% tax deductions on all donations." },
            { cert: "Section 12A Registration", no: "AAATL3102RE20220", desc: "Grants tax-exemption status to the Trust's charitable welfare income." },
            { cert: "CSR Registration (Form CSR-1)", no: "CSR00039218", desc: "Registered under the Ministry of Corporate Affairs, eligible for corporate CSR projects." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', background: 'var(--color-white)' }}>
              <div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{item.cert}</h5>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700, margin: '4px 0' }}>Registration No: {item.no}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
              </div>
              <Shield size={32} color="var(--color-green)" style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. Team Directory Layout
  const renderTeam = () => {
    // 6-7 Trustees
    const trustees = [
      { name: "Mr. Dinesh Pahwa", role: "Founder & Chief Trustee", bio: "20+ years coordinating rural health diagnostics and primary digital education drives." },
      { name: "Sanjay Verma", role: "Co-Founder & Director", bio: "Retired academician managing Smart Classrooms and educational curriculum mapping." },
      { name: "Pankaj Kumar", role: "Secretary & Head of Operations", bio: "Leads database coordination, administration desk, and logistical supply chain." },
      { name: "Dr. Anita Deshmukh", role: "Advisory Board Member & Clinical Head", bio: "Directs Self Help Group bank linkages and organizes rural medical diagnostic camps." },
      { name: "Col. Satish Kumar (Retd.)", role: "Director of Supply Chain & Drives", bio: "Manages logistical deployment of sanitary pad stocks and smart classrooms." },
      { name: "Sunita Rao", role: "Director of Women's Welfare", bio: "Coordinates training programs for women distributors under Life Sakhi initiative." },
      { name: "Kiran Sharma", role: "Board Member & Strategic Advisor", bio: "Formulates corporate partnership strategies and CSR alliance guidelines." }
    ];

    // Load registered users from localStorage database to sync manually added coordinators/volunteers
    const allUsersRaw = localStorage.getItem('life_sakhi_all_users');
    const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : [];
    const dbMembers = allUsers
      .filter((u: any) => u.role !== 'admin' && u.status === 'active')
      .map((u: any) => ({
        name: u.displayName,
        role: u.role,
        state: u.state || "Uttar Pradesh",
        district: u.address || "Agra",
        phone: u.phone || "+91 99999 88888",
        email: u.email,
        profileImageUrl: u.profileImageUrl
      }));

    // Combine seeded list and custom local storage list
    const combinedList = [...DIRECTORY_MEMBERS, ...dbMembers];

    // Filter combined members based on active selections
    const filteredMembers = combinedList.filter(member => {
      // 1. Role Filter
      if (selectedRole !== 'all') {
        if (selectedRole === 'partners') {
          const partnerRoles = ['csr_partner', 'corporate_partner', 'ngo_partner', 'doctor', 'school', 'hospital'];
          if (!partnerRoles.includes(member.role)) return false;
        } else if (selectedRole === 'state_coordinator') {
          if (member.role !== 'state_coordinator') return false;
        } else {
          if (member.role !== selectedRole) return false;
        }
      }

      // 2. State Filter
      if (selectedState !== 'All States') {
        if (member.state !== selectedState) return false;
      }

      // 3. District Filter
      if (selectedDistrict !== 'All Districts') {
        if (member.district !== selectedDistrict) return false;
      }

      // 4. Text Search (name or mobile number)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesPhone = member.phone.includes(query);
        if (!matchesName && !matchesPhone) return false;
      }

      return true;
    });

    // Handle state selection change
    const handleStateChange = (state: string) => {
      setSelectedState(state);
      setSelectedDistrict('All Districts'); // Reset district
    };

    const getRoleLabel = (roleKey: string) => {
      switch (roleKey) {
        case 'volunteer': return 'Volunteer';
        case 'district_coordinator': return 'District Coordinator';
        case 'state_coordinator': return 'State Coordinator';
        case 'csr_partner': return 'CSR Partner';
        case 'corporate_partner': return 'Hiring Partner';
        case 'doctor': return 'Clinical Volunteer';
        default: return 'Team Member';
      }
    };

    return (
      <div>
        {/* Trustees Section */}
        <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 800 }}>Board of Trustees & Advisory Council</h3>
          <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
            Our advisory board is composed of dedicated leaders from public health, primary education, civil services, and corporate sectors who govern the strategic mission of Life Changing Trust.
          </p>

          <div className="grid-3" style={{ gap: '20px', marginBottom: '10px' }}>
            {trustees.map((member, idx) => (
              <div key={idx} className="card" style={{ padding: '24px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '75px', height: '75px', borderRadius: '50%', background: 'rgba(140, 198, 62, 0.08)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, marginBottom: '15px' }}>
                  {member.name.replace("Mr. ", "").charAt(0)}
                </div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '4px', fontSize: '1rem' }}>{member.name}</h5>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{member.role}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0, lineHeight: '1.5' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Directory Section */}
        <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
          <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '10px', fontWeight: 800 }}>Search Team Directory</h3>
          <p className="about-text" style={{ fontSize: '0.95rem', color: 'var(--color-muted)', marginBottom: '25px' }}>
            Find active volunteers, coordinators, and corporate partners across India. Filter by category, state, and district to find representatives in your area.
          </p>

          {/* Toggle Filter Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '25px', padding: '6px', background: '#f4f6f9', borderRadius: '8px' }}>
            {[
              { id: 'all', label: 'All Members' },
              { id: 'volunteer', label: 'Volunteers' },
              { id: 'district_coordinator', label: 'District Coordinators' },
              { id: 'state_coordinator', label: 'State Partners' },
              { id: 'partners', label: 'CSR/Hiring Partners' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRole(tab.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedRole === tab.id ? 'var(--color-primary)' : 'transparent',
                  color: selectedRole === tab.id ? '#ffffff' : 'var(--color-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
            {/* Select State */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '6px' }}>Select State</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-muted)' }} />
                <select 
                  value={selectedState} 
                  onChange={(e) => handleStateChange(e.target.value)} 
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #dcdfe6', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                >
                  <option value="All States">All States (India)</option>
                  {Object.keys(STATE_DISTRICTS).filter(s => s !== "All States").map(stateName => (
                    <option key={stateName} value={stateName}>{stateName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select District */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '6px' }}>Select District</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-muted)' }} />
                <select 
                  value={selectedDistrict} 
                  onChange={(e) => setSelectedDistrict(e.target.value)} 
                  disabled={selectedState === 'All States'}
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #dcdfe6', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', background: selectedState === 'All States' ? '#f5f7fa' : '#fff' }}
                >
                  <option value="All Districts">All Districts</option>
                  {selectedState !== 'All States' && (STATE_DISTRICTS[selectedState] || []).map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '6px' }}>Search by Name / Mobile</label>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--color-muted)' }} />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="e.g. Dinesh Kumar..." 
                  style={{ width: '100%', padding: '10px 10px 10px 36px', border: '1px solid #dcdfe6', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>

          {/* Directory Grid */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '25px' }}>
            {filteredMembers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8f9fa', borderRadius: '8px', color: 'var(--color-muted)' }}>
                <Users size={36} style={{ marginBottom: '10px', color: 'var(--color-primary)', opacity: 0.5 }} />
                <h5 style={{ fontWeight: 700, margin: '0 0 5px 0', color: 'var(--color-primary)' }}>No Members Found</h5>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>No team members match your active role, state, district, or search string.</p>
              </div>
            ) : (
              <div className="grid-3" style={{ gap: '20px' }}>
                {filteredMembers.map((member, idx) => (
                  <div key={idx} className="card" style={{ padding: '20px', background: '#ffffff', border: '1px solid #e1e4e8', borderRadius: '8px', position: 'relative', display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {/* Member Profile Image */}
                    <div style={{ flexShrink: 0 }}>
                      {member.profileImageUrl ? (
                        <img 
                          src={member.profileImageUrl} 
                          alt={member.name} 
                          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-green)' }} 
                        />
                      ) : (
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(10, 60, 140, 0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    {/* Member Details */}
                    <div>
                      <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: '0 0 4px 0', fontSize: '0.95rem' }}>{member.name}</h5>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                        {getRoleLabel(member.role)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={10} style={{ color: 'var(--color-green)' }} />
                        <span>{member.district}, {member.state}</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                        <div>📧 {member.email}</div>
                        <div>📞 {member.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 5. Partners Layout
  const renderPartners = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Corporate CSR Partnerships</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We collaborate with corporate partners and hospitals to scale up water, health, and classroom programs.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Corporate CSR Sponsorship Categories</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Adopt-a-School Smart Lab</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Sponsor the projection hardware and e-learning content mapping for a government school for ₹50,000.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Host Free Diagnostic Camps</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Fund the doctor team, checkup supplies, and free medicine distribution for a block for ₹30,000.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getSubpageContent = () => {
    switch (pageKey) {
      case 'founder':
        return renderFounder();
      case 'vision-mission':
        return renderVisionMission();
      case 'legal':
        return renderLegal();
      case 'team':
        return renderTeam();
      case 'partners':
        return renderPartners();
      default:
        return renderFounder();
    }
  };

  const getSubpageHeader = () => {
    switch (pageKey) {
      case 'founder':
        return { title: "Founder's Message & History", desc: "Understanding Mr. Dinesh Pahwa's Journey, Origins, and Commitment" };
      case 'vision-mission':
        return { title: "Vision & Mission Statement", desc: "Our Core Objectives, Values, and Roadmaps" };
      case 'legal':
        return { title: "80G, 12A & CSR Compliances", desc: "Complete Transparency and Legal Accreditation Details" };
      case 'team':
        return { title: "Management Team & Board", desc: "Meet the Team Driving Change on the Ground" };
      case 'partners':
        return { title: "Partners & Corporate Board", desc: "Our Collaborators, Sponsors, and Supporters" };
      default:
        return { title: "About the Trust", desc: "Building a Better Future Together" };
    }
  };

  const headerDetails = getSubpageHeader();

  const getFormInputs = () => {
    if (pageKey === 'partners') {
      return (
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Corporate / NGO Name</label>
          <input type="text" name="orgName" required value={formData.orgName} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="Enter organization name" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="subpage-detail-layout">
      {/* Subpage Hero Banner */}
      <section className="subpage-hero" style={{
        background: 'linear-gradient(135deg, rgba(10, 60, 140, 0.9) 0%, rgba(17, 24, 39, 0.75) 100%)',
        padding: '130px 0 60px 0',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <Link to="/about" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to About Hub
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-green)', marginBottom: '10px' }}>{headerDetails.title}</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 300, opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>{headerDetails.desc}</p>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          {pageKey === 'team' ? (
            // Full width layout for Team page, removing the Inquire sidebar completely
            <div>
              {getSubpageContent()}
            </div>
          ) : (
            // Split layout with Inquire sidebar for other subpages
            <div className="grid-3" style={{ gap: '40px', alignItems: 'flex-start' }}>
              {/* Detailed Content (2 columns width) */}
              <div style={{ gridColumn: 'span 2' }}>
                {getSubpageContent()}
              </div>

              {/* Side form */}
              <div>
                <div className="card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>
                    {pageKey === 'partners' ? 'Sponsor / Partner' : 'Inquire'}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                    {pageKey === 'partners' ? 'Submit corporate CSR details to partner with us.' : 'Submit a request to verify legal certificates or advisory sheets.'}
                  </p>

                  {formSubmitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                      <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                      <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Inquiry Staged!</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>We will review your inquiry and contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} 
                          placeholder="Enter full name" 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Contact Phone</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} 
                          placeholder="10-digit mobile number" 
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} 
                          placeholder="Enter email address" 
                        />
                      </div>
                      {getFormInputs()}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Details / Inquiry Message</label>
                        <textarea 
                          name="message" 
                          rows={4} 
                          required 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                          placeholder="Detail your request..." 
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                        <Send size={16} /> Submit Request
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutDetail;
