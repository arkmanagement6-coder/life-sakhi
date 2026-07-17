import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Users, CheckCircle, Heart, HeartHandshake, Stethoscope } from 'lucide-react';

const Health: React.FC = () => {
  const programs = [
    {
      title: "Women's Healthcare & Life Sakhi",
      desc: "Providing menstrual hygiene education and distributing subsidized sanitary pads across villages. Supporting gynecological counseling for women.",
      icon: <Award />
    },
    {
      title: "Menstrual Hygiene Awareness",
      desc: "Classroom seminars, sanitary pad usage guides, and breaking local taboos around menstruation through expert medical guides.",
      icon: <Shield />
    },
    {
      title: "Nutrition & Anemia Screening",
      desc: "Regular checkups for hemoglobin levels, distributing iron-rich supplements, and educating mothers on balanced diets.",
      icon: <Heart />
    },
    {
      title: "Rural Medical Camps",
      desc: "Organizing general health checkups, dental screening, ophthalmology tests, and dispensing generic medicines free of cost.",
      icon: <Stethoscope />
    },
    {
      title: "Mental Health Advocacy",
      desc: "Creating supportive spaces for adolescent girls and village women to counsel on stress, family planning, and domestic concerns.",
      icon: <Users />
    },
    {
      title: "Health Volunteer Network",
      desc: "Training local women to act as community health ambassadors (Sakhis), monitoring wellness patterns in their wards.",
      icon: <HeartHandshake />
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Healthcare Programs</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Programs</span>
            <span>/</span>
            <span>Healthcare</span>
          </div>
        </div>
      </div>

      {/* Main Description */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Promoting Hygiene & Wellness</span>
              <h2 className="section-title">Comprehensive Healthcare For Rural Communities</h2>
              <p className="about-text">
                Health is the foundation of development. Our Trust operates medical camps, hygiene distribution programs, and clinical awareness initiatives directly in remote areas where secondary health infrastructure is missing.
              </p>
              <p className="about-text">
                Through our flagship **Life Sakhi Initiative**, we are addressing menstrual hygiene by producing biodegradable, chemical-free sanitary pads and distributing them directly to women in their homes via our women coordinators.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/register?role=doctor" className="btn btn-primary" style={{ marginRight: '15px' }}>
                  <Stethoscope size={16} />
                  <span>Register as Doctor</span>
                </Link>
                <Link to="/contact?type=volunteer" className="btn btn-outline">
                  <span>Volunteer for Camp</span>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/assets/health_main.jpg" 
                alt="Health checkup camp" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/0a3c8c/ffffff?text=Healthcare+Camps";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Health Verticals</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Our Healthcare Services</h2>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {programs.map((prog, index) => (
              <div className="card" key={index}>
                <div className="card-icon" style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)' }}>
                  {prog.icon}
                </div>
                <h3 className="card-title">{prog.title}</h3>
                <p className="card-desc">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact in detail */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img 
                src="/assets/health_impact.jpg" 
                alt="Women Health" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', height: '380px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x380/8cc63e/ffffff?text=Hygiene+Impact";
                }}
              />
            </div>
            <div>
              <span className="section-subtitle">Impact Spotlight</span>
              <h2 className="section-title">Life Sakhi Menstrual Health Impact</h2>
              <p className="about-text">
                By providing an ecosystem of local counselors and accessible distribution outlets, we have reached thousands of girls in state schools who previously dropped out during menstruation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>150+ Rural Schools Adopted for Hygiene counseling</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>Over 2 Lakh Subsidized Packs distributed till date</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>80% reduction in menstruation school absenteeism in target villages</span>
                </div>
              </div>
              <div style={{ marginTop: '30px' }}>
                <Link to="/donate?program=healthcare" className="btn btn-primary">
                  <Heart size={16} fill="white" />
                  <span>Sponsor Hygiene Kits</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Health;
