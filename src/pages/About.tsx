import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    { name: "Mr. Dinesh Pahwa", role: "Founder & Chief Trustee", bio: "Visionary philanthropist and social entrepreneur dedicated to rural upliftment.", image: "/assets/team_dinesh.jpg" },
    { name: "Sanjay Verma", role: "Co-Founder & Director", bio: "Retired academician passionate about primary digital learning pipelines.", image: "/assets/team_sanjay.jpg" },
    { name: "Anita Deshmukh", role: "State Coordinator (MH)", bio: "Leads self-help organization setups and distributor coordination.", image: "/assets/team_anita.jpg" }
  ];

  const jobs = [
    { title: "Block Health Coordinator", location: "Rohtak, Haryana", type: "Full-Time", desc: "Overseeing sanitary pad supply chains and coordination of village checkup camps." },
    { title: "Digital Literacy Trainer", location: "Jaipur, Rajasthan", type: "Part-Time", desc: "Teaching basic web systems and computer skills in primary village classrooms." },
    { title: "CSR Partnership Manager", location: "New Delhi (Head Office)", type: "Full-Time", desc: "Liaising with corporate donors, reporting program metrics, and managing proposals." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">About Our Trust</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>About</span>
          </div>
        </div>
      </div>

      {/* Main Info */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Our Journey</span>
              <h2 className="section-title">Serving Communities Since 2022</h2>
              <p className="about-text">
                Life Changing Educational & Charitable Trust was founded by a cohort of health experts and educators who observed substantial gaps in school retention and basic preventive health services in rural pockets.
              </p>
              <p className="about-text">
                By implementing community smart labs and local healthcare hubs under the flag of the **Life Sakhi** campaign, we have successfully created a self-sustaining network of women health distributors.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--color-light-gray)', padding: '40px', borderRadius: 'var(--border-radius-lg)', borderLeft: '5px solid var(--color-green)' }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px' }}>Our Mission</h3>
                <p style={{ marginBottom: '25px', fontSize: '0.95rem' }}>To empower marginalized rural populations through high-quality child education, accessible checkup infrastructure, and women-led sanitary product supply grids.</p>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '15px' }}>Our Vision</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: 0 }}>To foster a healthy, literate, self-reliant rural India where every woman lives with dignity and financial freedom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }} id="founder">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img 
                src="/assets/founder.jpg" 
                alt="Mr. Dinesh Pahwa" 
                className="about-image" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/0a3c8c/ffffff?text=Mr.+Dinesh+Pahwa+(Founder)";
                }}
              />
            </div>
            <div>
              <span className="section-subtitle">Founder's Message</span>
              <h2 className="section-title">A Vision Of Dignity & Health</h2>
              <p className="about-text" style={{ fontStyle: 'italic' }}>
                "During my interactions in rural blocks, I saw young girls drop out of school because they couldn't afford sanitary napkins, or suffered severe reproductive infections due to unhygienic practices. We registered this trust to move beyond awareness: to establish local supply chains run by women themselves. True empowerment happens when health and income grow together."
              </p>
              <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '4px' }}>Mr. Dinesh Pahwa</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Founder Trustee, Life Changing Educational & Charitable Trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Status */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }} id="legal">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Trust Registration</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Legal Compliance & Credentials</h2>
          
          <div className="grid-3" style={{ textAlign: 'left' }}>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>12A Registration</h3>
              <p className="card-desc">Registration No: **12A-AAATL0000AA20221**</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Registered under Section 12A of the Income Tax Act, 1961, recognizing the trust as a non-profit institution.</p>
            </div>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>80G Tax Exemption</h3>
              <p className="card-desc">Registration No: **80G-AAATL0000AG20231**</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Donations made to the trust are tax-exempt. We provide auto-generated certificates for tax declarations.</p>
            </div>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>CSR-1 Registration</h3>
              <p className="card-desc">Registration ID: **CSR00012345**</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Registered with the Ministry of Corporate Affairs, India, to accept corporate CSR funding allocations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }} id="team">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Board of Trustees</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Meet Our Leadership</h2>
          
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {team.map((member, i) => (
              <div className="card" key={i} style={{ padding: '0', overflow: 'hidden' }}>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x260/0a3c8c/ffffff?text=${encodeURIComponent(member.name)}`;
                  }}
                />
                <div style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '4px' }}>{member.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-green)', fontWeight: 700, marginBottom: '12px' }}>{member.role}</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="section-subtitle">Work With Us</span>
            <h2 className="section-title" style={{ display: 'inline-block' }}>Current Careers</h2>
            <p style={{ maxWidth: '600px', margin: '10px auto 0 auto', color: 'var(--color-muted)' }}>
              Join our dedicated team. We provide competitive stipends, travel support, and training certifications.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {jobs.map((job, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: 'var(--color-light-gray)', 
                  padding: '24px', 
                  borderRadius: 'var(--border-radius-md)', 
                  border: '1px solid var(--color-gray-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary)', marginBottom: '6px' }}>{job.title}</h4>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '10px', fontWeight: 600 }}>
                    <span>Location: {job.location}</span>
                    <span>Type: {job.type}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-dark)' }}>{job.desc}</p>
                </div>
                <button 
                  onClick={() => alert(`Redirecting to application form for: ${job.title}`)}
                  className="btn btn-outline"
                  style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '10px 20px', fontSize: '0.85rem' }}
                >
                  <Briefcase size={14} />
                  <span>Apply Job</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
