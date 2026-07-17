import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart } from 'lucide-react';

const Campaigns: React.FC = () => {
  const campaignsList = [
    {
      title: "Women's Health & Menstrual Seminar",
      desc: "Educating school girls and distributing organic sanitary pad packages across 20 rural blocks.",
      date: "August 5, 2026",
      location: "Rohtak District, Haryana",
      category: "Women Health"
    },
    {
      title: "Digital Literacy & Smart Class Drive",
      desc: "Setting up screen-projection classrooms and distributing stationery to primary kids.",
      date: "September 12, 2026",
      location: "Jaipur, Rajasthan",
      category: "Education"
    },
    {
      title: "Community Blood Donation Camp",
      desc: "Partnering with Red Cross to organize a voluntary blood donation drive at District Hospital.",
      date: "October 10, 2026",
      location: "Sonipat, Haryana",
      category: "Healthcare"
    },
    {
      title: "Green Village Tree Plantation",
      desc: "Planting 5,000 neem and fruit trees in barren community lands with local youth clubs.",
      date: "November 14, 2026",
      location: "Bhiwani, Haryana",
      category: "Environment"
    },
    {
      title: "Winter Cloth & Food Distribution",
      desc: "Supplying blankets, warm clothing, and nutritious grain bags to migrant labor colonies.",
      date: "December 20, 2026",
      location: "New Delhi, NCR",
      category: "Emergency Relief"
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Our Campaigns</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Campaigns</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 50px auto', textAlign: 'center' }}>
            <span className="section-subtitle">Join Our Efforts</span>
            <h2 className="section-title">Community Campaigns</h2>
            <p className="about-text">
              We regularly organize field campaigns focusing on health, primary literacy, and environment. These drives are fully dependent on voluntary participation and micro-sponsorships.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {campaignsList.map((c, index) => (
              <div 
                key={index}
                style={{ 
                  background: 'var(--color-light-gray)', 
                  borderRadius: 'var(--border-radius-md)', 
                  padding: '30px', 
                  border: '1px solid var(--color-gray-light)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <span style={{ background: 'rgba(10,60,140,0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 'var(--border-radius-full)', textTransform: 'uppercase', display: 'inline-block', marginBottom: '10px' }}>
                    {c.category}
                  </span>
                  <h3 style={{ color: 'var(--color-dark)', marginBottom: '8px', fontSize: '1.3rem' }}>{c.title}</h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: '15px' }}>{c.desc}</p>
                  
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gray-dark)' }}>
                      <Calendar size={14} style={{ color: 'var(--color-green)' }} />
                      <span>{c.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-gray-dark)' }}>
                      <MapPin size={14} style={{ color: 'var(--color-green)' }} />
                      <span>{c.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link to={`/donate?campaign=${encodeURIComponent(c.title)}`} className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                    <Heart size={14} fill="white" />
                    <span>Sponsor Drive</span>
                  </Link>
                  <Link to="/contact?type=volunteer" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                    <span>Join as Volunteer</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Campaigns;
