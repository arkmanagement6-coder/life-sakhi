import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Heart, Calendar } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'running' | 'upcoming' | 'completed'>('running');

  const projectsData = {
    running: [
      {
        title: "Life Sakhi sanitary pad production unit",
        desc: "Setting up a micro-manufacturing unit in Rohtak, Haryana, providing direct packaging jobs to 50 local women.",
        raised: 450000,
        goal: 600000,
        location: "Haryana, India"
      },
      {
        title: "Digital smart classroom setups in village schools",
        desc: "Upgrading government secondary schools with computer systems, projectors, and interactive audio systems.",
        raised: 280000,
        goal: 400000,
        location: "Rajasthan, India"
      },
      {
        title: "Rural anemia screening and health monitoring",
        desc: "Door-to-door diagnostic testing of hemoglobin levels in 100 villages, providing vitamins and dietary counsel.",
        raised: 150000,
        goal: 250000,
        location: "Uttar Pradesh, India"
      }
    ],
    upcoming: [
      {
        title: "Mobile healthcare clinic van",
        desc: "Equipping a clinical van with emergency diagnostics and primary care systems to tour remote mountain villages weekly.",
        goal: 1200000,
        startDate: "October 2026",
        location: "Uttarakhand, India"
      },
      {
        title: "Women handloom self-help groups training",
        desc: "Establishing a training cluster for 200 women to produce handloom fabrics and link them with national e-commerce portals.",
        goal: 500000,
        startDate: "December 2026",
        location: "Madhya Pradesh, India"
      }
    ],
    completed: [
      {
        title: "Bio-pad distribution drive - Phase 1",
        desc: "Successfully distributed 50,000 sanitary pad packages to teenage girls in 80 government schools.",
        impact: "Absentees dropped by 78%",
        year: "2025"
      },
      {
        title: "Clean drinking water filtration plants",
        desc: "Installed RO filtration plants in 5 remote villages facing high fluoride contamination in groundwater.",
        impact: "Clean water access for 2,500+ residents",
        year: "2024"
      }
    ]
  };

  const reports = [
    { title: "Annual Report Fiscal 2025-26", size: "3.2 MB", type: "PDF Document" },
    { title: "Financial Audit Report 2024-25", size: "2.8 MB", type: "PDF Document" },
    { title: "Life Sakhi Impact Assessment Report 2026", size: "4.5 MB", type: "PDF Document" },
    { title: "Trust Registration and 80G Certificate", size: "1.1 MB", type: "PDF Document" }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Our Projects & Reports</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Projects</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', borderBottom: '2px solid var(--color-gray-light)', paddingBottom: '15px' }}>
            <button 
              className={`btn ${activeTab === 'running' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('running')}
              style={{ padding: '10px 24px' }}
            >
              Running Projects
            </button>
            <button 
              className={`btn ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('upcoming')}
              style={{ padding: '10px 24px' }}
            >
              Upcoming Projects
            </button>
            <button 
              className={`btn ${activeTab === 'completed' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('completed')}
              style={{ padding: '10px 24px' }}
            >
              Completed Projects
            </button>
          </div>

          {/* Running Projects */}
          {activeTab === 'running' && (
            <div className="grid-3">
              {projectsData.running.map((p, i) => {
                const pct = Math.round((p.raised / p.goal) * 100);
                return (
                  <div className="card" key={i}>
                    <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>{p.location}</p>
                    <p className="card-desc" style={{ marginBottom: '25px' }}>{p.desc}</p>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        <span>Raised: ₹{p.raised.toLocaleString()}</span>
                        <span>{pct}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--color-gray-light)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--color-green)' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '4px' }}>
                        <span>Goal: ₹{p.goal.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link to={`/donate?project=${encodeURIComponent(p.title)}`} className="btn btn-primary" style={{ width: '100%' }}>
                      <Heart size={14} fill="white" />
                      <span>Donate Now</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Upcoming Projects */}
          {activeTab === 'upcoming' && (
            <div className="grid-2">
              {projectsData.upcoming.map((p, i) => (
                <div className="card" key={i} style={{ borderLeft: '4px solid var(--color-green)' }}>
                  <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Location: {p.location}</p>
                  <p className="card-desc">{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px dashed var(--color-gray-light)', paddingTop: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                      <Calendar size={14} />
                      <span>Start Date: {p.startDate}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Estimated Goal: ₹{p.goal.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Projects */}
          {activeTab === 'completed' && (
            <div className="grid-2">
              {projectsData.completed.map((p, i) => (
                <div className="card" key={i} style={{ borderLeft: '4px solid var(--color-primary)' }}>
                  <h3 className="card-title" style={{ color: 'var(--color-dark)' }}>{p.title}</h3>
                  <p className="card-desc" style={{ marginBottom: '15px' }}>{p.desc}</p>
                  <div style={{ background: 'var(--color-light-gray)', padding: '12px 18px', borderRadius: 'var(--border-radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      Impact: {p.impact}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)' }}>
                      Completed in {p.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reports Section */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="section-subtitle">Transparency & Compliance</span>
            <h2 className="section-title" style={{ display: 'inline-block' }}>Annual Reports & Documents</h2>
          </div>

          <div className="grid-2">
            {reports.map((rep, idx) => (
              <div 
                key={idx}
                style={{ 
                  background: 'var(--color-white)', 
                  padding: '24px', 
                  borderRadius: 'var(--border-radius-md)', 
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: '1px solid var(--color-gray-light)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'rgba(10,60,140,0.08)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-dark)', marginBottom: '4px' }}>{rep.title}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{rep.type} • {rep.size}</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Simulating file download: ${rep.title}`)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '0.85rem' }}
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
