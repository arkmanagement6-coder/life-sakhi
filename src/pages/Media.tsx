import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Quote, Star } from 'lucide-react';

const Media: React.FC = () => {
  const blogs = [
    {
      title: "Why Menstrual Hygiene Education is Key to Rural Development",
      excerpt: "Providing sanitary pads is only half the battle. True progress requires addressing local stigmas through targeted school seminars.",
      date: "July 12, 2026",
      author: "Dr. Ritu Sharma",
      image: "/assets/blog1.jpg"
    },
    {
      title: "How Smart Classrooms Are Revolutionizing Rural Classrooms",
      excerpt: "Visual learning helps children retain scientific concepts twice as fast. Here is a report on our smart board trials.",
      date: "June 28, 2026",
      author: "Sanjay Verma",
      image: "/assets/blog2.jpg"
    },
    {
      title: "Creating Independent Income Outlets for Rural Housewives",
      excerpt: "Sunita Devi shares her story of leading a cohort of 15 women distributors under the Life Sakhi brand.",
      date: "May 15, 2026",
      author: "Anita Deshmukh",
      image: "/assets/blog3.jpg"
    }
  ];

  const news = [
    { title: "Life Changing Educational & Charitable Trust launches Life Sakhi brand for Rural Women Health", source: "Dainik Bhaskar", date: "April 10, 2026" },
    { title: "NGO sets up computer labs in 10 block schools in Haryana", source: "The Tribune", date: "March 18, 2026" },
    { title: "80G and CSR certification awarded to Life Changing Educational & Charitable Trust", source: "MCA Gazette", date: "January 05, 2026" }
  ];

  const testimonials = [
    {
      name: "Dr. Sandeep Goel",
      role: "Gynecologist, Fortis Hospital",
      quote: "Collaborating with this trust for medical camps has been fulfilling. Their focus on menstrual hygiene and distribution of skin-friendly pads is addressing critical village infections.",
      rating: 5
    },
    {
      name: "Meena Kumari",
      role: "Women Distributor (Sakhi)",
      quote: "Life Sakhi gave me a regular source of income. I sell sanitary packs to women in my community, which helps me cover my children's school fees myself.",
      rating: 5
    },
    {
      name: "Rajesh Singhal",
      role: "Individual Donor",
      quote: "I sponsor the education of 5 girls through this trust. The transparency, detailed audit reports, and feedback cards from the school make it a highly trustworthy NGO.",
      rating: 5
    }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Media & Publications</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Media</span>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="section-subtitle">Articles & Stories</span>
            <h2 className="section-title" style={{ display: 'inline-block' }}>Latest Blogs & Articles</h2>
          </div>

          <div className="grid-3">
            {blogs.map((blog, idx) => (
              <div className="card" key={idx} style={{ padding: '0', overflow: 'hidden' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x220/0a3c8c/ffffff?text=Blog+${idx+1}`;
                  }}
                />
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', color: 'var(--color-muted)', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} />
                      <span>{blog.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={12} />
                      <span>{blog.author}</span>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-dark)', marginBottom: '8px' }}>{blog.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>{blog.excerpt}</p>
                  
                  <button 
                    onClick={() => alert(`Simulating reading full blog: ${blog.title}`)}
                    className="btn btn-outline" 
                    style={{ width: '100%', padding: '10px', fontSize: '0.85rem', display: 'flex', gap: '4px', justifyContent: 'center' }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="section-subtitle">Press Highlights</span>
              <h2 className="section-title">NGO in the News</h2>
              <p className="about-text">
                Read what major publications and newspapers write about the campaigns organized by the Life Changing Educational & Charitable Trust.
              </p>
              
              <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {news.map((item, index) => (
                  <div 
                    key={index}
                    style={{ 
                      background: 'var(--color-white)', 
                      padding: '20px', 
                      borderRadius: 'var(--border-radius-md)', 
                      borderLeft: '4px solid var(--color-green)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--color-primary)', marginBottom: '6px' }}>{item.title}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                      <span>Source: {item.source}</span>
                      <span>Date: {item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="section-subtitle">Official Coverage</span>
              <h2 className="section-title">Video Broadcasts</h2>
              <div 
                style={{ 
                  background: 'var(--color-white)', 
                  borderRadius: 'var(--border-radius-lg)', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-lg)',
                  position: 'relative',
                  height: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: 'linear-gradient(135deg, rgba(10,60,140,0.85) 0%, rgba(17,24,39,0.7) 100%)',
                  color: 'white',
                  textAlign: 'center',
                  padding: '30px'
                }}
              >
                <div>
                  <h3 style={{ color: 'white', marginBottom: '15px' }}>Watch: Life Sakhi Launch documentary</h3>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '25px' }}>Interviewing state coordinators, gynecologists, and rural distributors on menstrual safety.</p>
                  <button 
                    onClick={() => alert("Simulating play video broadcast")}
                    className="btn btn-secondary" 
                    style={{ borderRadius: '50%', width: '60px', height: '60px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '45px' }}>
            <span className="section-subtitle">Beneficiary Reviews</span>
            <h2 className="section-title" style={{ display: 'inline-block' }}>What People Say</h2>
          </div>

          <div className="grid-3">
            {testimonials.map((test, index) => (
              <div className="card" key={index} style={{ border: '1px solid var(--color-gray-light)' }}>
                <Quote size={32} style={{ color: 'rgba(140, 198, 62, 0.3)', marginBottom: '15px' }} />
                <p className="card-desc" style={{ fontStyle: 'italic', marginBottom: '20px' }}>"{test.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '12px' }}>
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--color-green)" color="var(--color-green)" />
                  ))}
                </div>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '2px' }}>{test.name}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>{test.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
