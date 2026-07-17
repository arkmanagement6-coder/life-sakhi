import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send, Shield } from 'lucide-react';

const AboutDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'founder';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', orgName: '' });

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
  const renderTeam = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Board Directors & Operations Head</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Our active board oversees block-level logistics, campaign coordination, and school smart panel deployments.
        </p>

        {/* Team Profile Grid */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Management Profiles</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { name: "Mr. Dinesh Pahwa", role: "Founder & Chief Trustee", bio: "20+ years coordinating rural health diagnostics." },
            { name: "Sanjay Verma", role: "Co-Founder & Director", bio: "Retired academician managing Smart Classrooms." },
            { name: "Anita Deshmukh", role: "State Coordinator (MH)", bio: "Directs Self Help Group bank linkages." }
          ].map((member, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>{member.name}</h5>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700, marginBottom: '10px' }}>{member.role}</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
        </div>
      </section>
    </div>
  );
};

export default AboutDetail;
