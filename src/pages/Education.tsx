import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Monitor, Award, GraduationCap, Compass, CheckCircle } from 'lucide-react';

const Education: React.FC = () => {
  const educationPrograms = [
    {
      title: "Child Primary Education Support",
      desc: "Distributing books, writing material, uniforms, and shoes to children in government schools. Supporting tuition fees for orphanage homes.",
      icon: <GraduationCap />
    },
    {
      title: "Digital Classrooms (Smart Schools)",
      desc: "Setting up screen projectors, audio systems, and animated learning curriculum. Helping children learn complex science/math with visual media.",
      icon: <Monitor />
    },
    {
      title: "Girls Merit Scholarship Fund",
      desc: "Sponsoring senior high school fees and university admission fees for high-performing girls from economically weak households.",
      icon: <Award />
    },
    {
      title: "Adult Literacy Programs",
      desc: "Running evening literacy batches for village elders, helping mothers read, write, sign, and handle banking applications.",
      icon: <BookOpen />
    },
    {
      title: "Computer Literacy Labs",
      desc: "Basic courses in word processing, spreadsheet applications, internet surfing, and electronic messaging at village centers.",
      icon: <Monitor />
    },
    {
      title: "Career Guidance & Mentorship",
      desc: "Conducting diagnostic tests and counseling seminars for young graduates to guide them to vocations, ITIs, or government jobs.",
      icon: <Compass />
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Education Programs</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Programs</span>
            <span>/</span>
            <span>Education</span>
          </div>
        </div>
      </div>

      {/* Main Intro */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Bridging The Knowledge Divide</span>
              <h2 className="section-title">Quality Education For Every Child</h2>
              <p className="about-text">
                Education is the ultimate tool of transformation. Our Trust focuses on integrating digital infrastructure into village schools and supporting underprivileged students to avoid dropouts.
              </p>
              <p className="about-text">
                With a special focus on **Girls' Education**, we run career counseling seminars and digital training centers that equip rural youths with the skills needed to find high-paying jobs in urban offices.
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link to="/donate?program=education" className="btn btn-primary" style={{ marginRight: '15px' }}>
                  <GraduationCap size={16} />
                  <span>Sponsor a Student</span>
                </Link>
                <Link to="/register?role=school" className="btn btn-outline">
                  <span>Register a School</span>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/assets/education_main.jpg" 
                alt="Children in classroom" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '400px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/0a3c8c/ffffff?text=Smart+Classroom+Camps";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Our Verticals</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Education Programs</h2>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            {educationPrograms.map((prog, index) => (
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

      {/* Stats Call-out */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img 
                src="/assets/education_impact.jpg" 
                alt="Girls learning computers" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', width: '100%', height: '380px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x380/8cc63e/ffffff?text=Education+Impact";
                }}
              />
            </div>
            <div>
              <span className="section-subtitle">Impact Spotlight</span>
              <h2 className="section-title">Empowering Rural Youth Digitally</h2>
              <p className="about-text">
                With corporate backing and generous individual donors, we have successfully digitized classrooms in rural schools, ensuring the digital divide is bridged.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>8,000+ Students supported with textbooks & materials</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>35 Government Schools updated with computer rooms</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontWeight: 600 }}>1,200 Girls awarded Merit scholarships for higher studies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
