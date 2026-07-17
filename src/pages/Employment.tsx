import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Settings, Users, IndianRupee, HeartHandshake, UserCheck } from 'lucide-react';

const Employment: React.FC = () => {
  const trainingPillars = [
    {
      title: "Women Distributor Livelihoods",
      desc: "Earn regular commissions by bringing affordable hygiene packages (Life Sakhi) to village homes, supported by block leaders.",
      icon: <UserCheck />
    },
    {
      title: "Self Help Groups (SHGs) Incubation",
      desc: "Helping rural women form saving circles and self-reliant packaging units. Assisting in setting up bank accounts and micro-credit.",
      icon: <Users />
    },
    {
      title: "Vocational Skills Training",
      desc: "Free certified courses in tailoring, fabric stitching, candle-making, food processing, and generic item packaging.",
      icon: <Settings />
    },
    {
      title: "Micro Business Capital Support",
      desc: "Linking qualified women with regional banking systems and seed grants to setup sewing shops or grocery stores.",
      icon: <IndianRupee />
    },
    {
      title: "District Coordinator Program",
      desc: "Become a regional coordinator to supervise stock orders, coordinate health camps, and build a network of distributors.",
      icon: <Briefcase />
    },
    {
      title: "NGO Partner Integration",
      desc: "Collaborate with small grassroots trusts to distribute sanitary kits, scaling the reach of the Life Sakhi movement.",
      icon: <HeartHandshake />
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Employment & Livelihood</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Programs</span>
            <span>/</span>
            <span>Employment</span>
          </div>
        </div>
      </div>

      {/* Main Intro */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Financial Independence</span>
              <h2 className="section-title">Women Livelihood Generation</h2>
              <p className="about-text">
                Financial self-reliance is the greatest defense against poverty. The Trust aims to create local employment for women in rural regions who cannot travel to cities.
              </p>
              <p className="about-text">
                Our flagship model connects women into dynamic self-help cooperatives that oversee sanitary pad packaging, labeling, and area-specific retail distribution, securing direct income.
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/register?role=district_coordinator" className="btn btn-primary" style={{ marginRight: '15px' }}>
                  <Briefcase size={16} />
                  <span>Apply as Coordinator</span>
                </Link>
                <Link to="/register?role=women_distributor" className="btn btn-outline">
                  <span>Register as Distributor</span>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/assets/employment_main.jpg" 
                alt="Women packing kits" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/0a3c8c/ffffff?text=Employment+Training";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Livelihood Models</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Livelihood Verticals</h2>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {trainingPillars.map((pillar, index) => (
              <div className="card" key={index}>
                <div className="card-icon" style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)' }}>
                  {pillar.icon}
                </div>
                <h3 className="card-title">{pillar.title}</h3>
                <p className="card-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success story block */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img 
                src="/assets/employment_success.jpg" 
                alt="Smiling businesswoman" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', height: '380px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x380/8cc63e/ffffff?text=Livelihood+Success";
                }}
              />
            </div>
            <div>
              <span className="section-subtitle">Success Story</span>
              <h2 className="section-title">From Housewife To Block Leader</h2>
              <p className="about-text" style={{ fontStyle: 'italic' }}>
                "Before joining the Life Sakhi program, I had no income. I was trained in menstrual hygiene and given a startup stock. Today, I manage 15 distributors in my block, and my family lives with dignity. I earn over ₹8,000 every month."
              </p>
              <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '4px' }}>- Sunita Devi</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Block Coordinator, Rohtak District</p>
              <div style={{ marginTop: '25px' }}>
                <Link to="/about#team" className="btn btn-outline">Meet Our Community</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employment;
