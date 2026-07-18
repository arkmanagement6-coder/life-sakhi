import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlRole = searchParams.get('role') || 'user';

  const [role, setRole] = useState(urlRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Role Specific Metadata Fields
  const [shgName, setShgName] = useState('');
  const [pan, setPan] = useState('');
  const [locationScope, setLocationScope] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [csrLicense, setCsrLicense] = useState('');
  const [hospitalLicense, setHospitalLicense] = useState('');
  const [schoolCode, setSchoolCode] = useState('');
  const [doctorRegistration, setDoctorRegistration] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [darpanId, setDarpanId] = useState('');
  const [skills, setSkills] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRole(urlRole);
  }, [urlRole]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password, name, role, phone);
      alert("Registration Successful!");
      navigate('/dashboard');
    } catch (err) {
      alert("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { code: 'user', name: 'Normal User / Supporter' },
    { code: 'volunteer', name: 'Volunteer advocate' },
    { code: 'donor', name: 'Donor / Benefactor' },
    { code: 'women_distributor', name: 'Women Distributor (Life Sakhi)' },
    { code: 'district_coordinator', name: 'District Coordinator' },
    { code: 'block_coordinator', name: 'Block Coordinator' },
    { code: 'state_coordinator', name: 'State Coordinator' },
    { code: 'csr_partner', name: 'CSR Partner' },
    { code: 'corporate_partner', name: 'Corporate Partner' },
    { code: 'hiring_partner', name: 'Hiring Partner' },
    { code: 'hospital', name: 'Hospital Partner' },
    { code: 'school', name: 'School Partner' },
    { code: 'ngo_partner', name: 'NGO Partner' },
    { code: 'doctor', name: 'Doctor / Clinical Volunteer' }
  ];

  return (
    <div style={{ background: 'var(--color-light-gray)', minHeight: '100vh', padding: '60px 0' }}>
      <div className="form-container" style={{ maxWidth: '650px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '10px' }}>Trust Portal Registration</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', fontSize: '0.85rem', marginBottom: '30px' }}>
          Select your coordination type and enter your details to set up an account.
        </p>

        <form onSubmit={handleRegister}>
          {/* Role selector */}
          <div className="form-group">
            <label className="form-label">Registration Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control form-select"
              style={{ background: 'rgba(10, 60, 140, 0.05)', fontWeight: 600 }}
            >
              {roles.map((r) => (
                <option key={r.code} value={r.code}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Common Fields */}
          <div className="form-group">
            <label className="form-label">Full Name / Organization Name</label>
            <input type="text" className="form-control" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="grid-2" style={{ gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" placeholder="+91 99999 88888" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          {/* DYNAMIC ROLE METADATA FIELDS */}

          {/* 1. Donor */}
          {role === 'donor' && (
            <div className="form-group">
              <label className="form-label">PAN Card Number (for tax exemption claim)</label>
              <input type="text" className="form-control" placeholder="ABCDE1234F" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} required />
            </div>
          )}

          {/* 2. Women Distributor */}
          {role === 'women_distributor' && (
            <div className="grid-2" style={{ gap: '15px' }}>
              <div className="form-group">
                <label className="form-label">Self-Help Group (SHG) Name (If any)</label>
                <input type="text" className="form-control" placeholder="Durga Self Help Group" value={shgName} onChange={(e) => setShgName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Assigned Village Block</label>
                <input type="text" className="form-control" placeholder="Rohtak Ward-5" value={locationScope} onChange={(e) => setLocationScope(e.target.value)} required />
              </div>
            </div>
          )}

          {/* 3. Coordinators (District, Block, State) */}
          {(role === 'district_coordinator' || role === 'block_coordinator' || role === 'state_coordinator') && (
            <div className="form-group">
              <label className="form-label">Target Administration Region / State</label>
              <input type="text" className="form-control" placeholder="Haryana (Rohtak District)" value={locationScope} onChange={(e) => setLocationScope(e.target.value)} required />
            </div>
          )}

          {/* 4. CSR Partner / Corporate Partner */}
          {(role === 'csr_partner' || role === 'corporate_partner') && (
            <div className="grid-2" style={{ gap: '15px' }}>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input type="text" className="form-control" placeholder="Tata Chemicals Ltd" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">CSR Registration License ID</label>
                <input type="text" className="form-control" placeholder="CSR-2026-XXXX" value={csrLicense} onChange={(e) => setCsrLicense(e.target.value)} required />
              </div>
            </div>
          )}

          {/* 5. Hospital */}
          {role === 'hospital' && (
            <div className="form-group">
              <label className="form-label">Hospital Registration License No</label>
              <input type="text" className="form-control" placeholder="HOSP-REG-1092" value={hospitalLicense} onChange={(e) => setHospitalLicense(e.target.value)} required />
            </div>
          )}

          {/* 6. School */}
          {role === 'school' && (
            <div className="form-group">
              <label className="form-label">School CBSE / State Code</label>
              <input type="text" className="form-control" placeholder="SCH-102931" value={schoolCode} onChange={(e) => setSchoolCode(e.target.value)} required />
            </div>
          )}

          {/* 7. Doctor */}
          {role === 'doctor' && (
            <div className="grid-2" style={{ gap: '15px' }}>
              <div className="form-group">
                <label className="form-label">Medical Council Registration No</label>
                <input type="text" className="form-control" placeholder="MCI-10293" value={doctorRegistration} onChange={(e) => setDoctorRegistration(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Clinical Specialization</label>
                <input type="text" className="form-control" placeholder="Gynecologist / Pediatrician" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
              </div>
            </div>
          )}

          {/* 8. NGO Partner */}
          {role === 'ngo_partner' && (
            <div className="form-group">
              <label className="form-label">NGO Darpan Registration ID</label>
              <input type="text" className="form-control" placeholder="HR/2026/012938" value={darpanId} onChange={(e) => setDarpanId(e.target.value)} required />
            </div>
          )}

          {/* 9. Volunteer */}
          {role === 'volunteer' && (
            <div className="form-group">
              <label className="form-label">Specialist Skills (e.g. Photography, counseling, teaching)</label>
              <input type="text" className="form-control" placeholder="Teaching, Event Management" value={skills} onChange={(e) => setSkills(e.target.value)} required />
            </div>
          )}

          {/* Security */}
          <div className="grid-2" style={{ gap: '15px' }}>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '25px' }}>
          Already have a portal login? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
