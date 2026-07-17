import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Gift } from 'lucide-react';

const WomenEmpowerment: React.FC = () => {
  const padSpecs = [
    { title: "100% Biodegradable", desc: "Made from natural wood pulp and bamboo fibers. Fully decomposes within 12 months." },
    { title: "Ultra High Absorbency", desc: "Constructed with multi-layered SAP core technology to ensure leakage protection." },
    { title: "Skin-Friendly", desc: "Anionic strip layer prevents rashes, bacterial growth, and keeps skin dry." },
    { title: "Super Subsidized", desc: "Available at just ₹35 per pack of 8 large-sized wings pads for rural families." }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Women Empowerment</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Initiatives</span>
            <span>/</span>
            <span>Women Empowerment</span>
          </div>
        </div>
      </div>

      {/* Main Showcase */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Life Sakhi Program</span>
              <h2 className="section-title">Har Mahila Ki Sehat Ka Saathi</h2>
              <p className="about-text">
                Women's health and self-reliance form the core of the Life Sakhi movement. We believe that no girl should be forced to miss school or compromise her hygiene due to financial constraints or social shame.
              </p>
              <p className="about-text">
                Our initiative addresses this through a two-step approach: **Hygiene Advocacy** (conducting workshops, removing taboos, and distributing materials) and **Livelihood Integration** (appointing local women as distributors, bypassing middlemen).
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/register?role=women_distributor" className="btn btn-primary" style={{ marginRight: '15px' }}>
                  <span>Apply as Life Sakhi</span>
                </Link>
                <Link to="/donate?program=girl_child" className="btn btn-outline">
                  <Gift size={16} />
                  <span>Sponsor Hygiene Packs</span>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/assets/empowerment_main.jpg" 
                alt="Happy rural women holding pads" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/8cc63e/ffffff?text=Life+Sakhi+Branding";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product specs section */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Premium Quality Sanitary Pads</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Why Life Sakhi Pads Are Best</h2>
          <div className="grid-4" style={{ textAlign: 'left' }}>
            {padSpecs.map((spec, i) => (
              <div className="card" key={i}>
                <div className="card-icon" style={{ background: 'rgba(10, 60, 140, 0.08)', color: 'var(--color-primary)' }}>
                  <Sparkles size={24} />
                </div>
                <h3 className="card-title">{spec.title}</h3>
                <p className="card-desc">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Distributor Framework */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img 
                src="/assets/empowerment_network.jpg" 
                alt="Women group discussion" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', height: '380px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x380/0a3c8c/ffffff?text=Women+Self+Help+Group";
                }}
              />
            </div>
            <div>
              <span className="section-subtitle">Micro-Distribution Model</span>
              <h2 className="section-title">Women-Led Supply Chains</h2>
              <p className="about-text">
                Rather than selling through commercial chemists, Life Sakhi pads are supplied directly to households by our network of village-level Women Distributors (Sakhis).
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ background: 'rgba(140, 198, 62, 0.15)', color: 'var(--color-green)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Direct Door-to-Door Sales</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Distributors reach home makers directly, resolving embarrassment and communication blocks.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ background: 'rgba(140, 198, 62, 0.15)', color: 'var(--color-green)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Interactive App Tracking</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Coordinators log pad stock requirements and distribution numbers via the cloud portal.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ background: 'rgba(140, 198, 62, 0.15)', color: 'var(--color-green)', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Regular Health Training</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Regular refresher webinars on gynecological safety, accounting basics, and digital management.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenEmpowerment;
