import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, CheckCircle, ArrowLeft, Send } from 'lucide-react';

interface SubPageData {
  title: string;
  subtitle: string;
  description: string;
  goals: string[];
  achievements: string[];
  faqs: { q: string; a: string }[];
  imageText: string;
}

const empowermentData: Record<string, SubPageData> = {
  'life-sakhi-campaign': {
    title: "Life Sakhi Campaign",
    subtitle: "A Mass Health Drive Ensuring Menstrual Dignity",
    description: "The Life Sakhi Campaign is our focused social movement aimed at guaranteeing every rural woman has clean, hygienic, and affordable menstrual options. We set up manufacturing support, run advocacy seminars, and promote biodegradable pad packets to protect health and build self-reliance.",
    goals: [
      "Distribute sanitary products across 1,000 remote villages.",
      "Conduct 500 menstrual hygiene drives in rural girls high schools.",
      "Completely subsidize products for low-income families through CSR."
    ],
    achievements: [
      "Over 4 Lakh pad packets distributed through Sakhis.",
      "Lowered reproductive infections by 45% in pilot villages.",
      "Organized 150 community talks on sanitary napkin manufacturing and environment safety."
    ],
    faqs: [
      { q: "What makes Life Sakhi pads special?", a: "They are made of natural wood pulp fibers, are 100% biodegradable, and do not contain harmful chemicals or synthetic plastics." }
    ],
    imageText: "Life Sakhi Campaign"
  },
  'distributor-program': {
    title: "Distributor Livelihood Program",
    subtitle: "Turn Hygiene Advocacy into a Source of Household Income",
    description: "Our Distributor program empowers rural women (Sakhis) to sell sanitary napkins in their home neighborhoods. Sakhis purchase stock at manufacturing prices and sell at subsidized rates, keeping a direct profit margin to supplement their family income.",
    goals: [
      "Deploy 5,000 active women distributors.",
      "Provide digital banking and credit facilities to all active distributors.",
      "Establish block coordinator hubs to support shipping logistics."
    ],
    achievements: [
      "1,200+ active Sakhis earning an independent living.",
      "Average monthly distributor earnings have reached ₹4,500.",
      "100% of active distributors certified in hygiene advocacy."
    ],
    faqs: [
      { q: "Is there an upfront cost?", a: "No, we provide a free training toolkit, marketing banners, and the first box of sanitary pad stocks to get started." }
    ],
    imageText: "Distributor Training"
  },
  'shg-support': {
    title: "Self Help Group Support",
    subtitle: "Fostering Collective Entrepreneurship and Financial Strength",
    description: "We work closely with local women's cooperatives (Self Help Groups) to manage micro-manufacturing, packaging, and sorting divisions. By pooling thrift savings and linking groups to government banks, we launch local village businesses.",
    goals: [
      "Form 500 women cooperatives across target districts.",
      "Enable SHGs to launch local cottage industry brands.",
      "Deliver leadership training to rural women managers."
    ],
    achievements: [
      "180+ Self Help Groups organized and linked to credit.",
      "SHG cooperative members launched 5 local household soap and craft labels.",
      "Approved bank credit linkages totaling over ₹40 Lakhs."
    ],
    faqs: [
      { q: "How does the Trust support SHGs?", a: "We assist with registration, cooperative bank account opening, bookkeeping training, and link them to micro-lending schemes." }
    ],
    imageText: "Cooperative Groups"
  },
  'vocational-skills': {
    title: "Stitching & Craft Training",
    subtitle: "Vocational Skills in Garment Making and Sustainable Crafting",
    description: "Our training hubs host free tailoring, stitching, and packaging courses. These courses empower women with trade capabilities, allowing them to work in industrial garment sectors or launch self-employed home boutiques.",
    goals: [
      "Train 2,000 women annually in professional tailoring.",
      "Establish 15 fully-equipped block tailoring laboratories.",
      "Provide modern electric sewing machines to top performers."
    ],
    achievements: [
      "Certified 750+ rural women in garment tailoring.",
      "Graduates have successfully completed bulk school uniform and cloth bag orders.",
      "Set up 12 active training laboratories to date."
    ],
    faqs: [
      { q: "Are training classes certified?", a: "Yes, our vocational courses are aligned with national skill standards and certificates are awarded upon completion." }
    ],
    imageText: "Tailoring Classes"
  },
  'livelihood-capital': {
    title: "Micro Livelihood Capital",
    subtitle: "Startup Grants for Rural Women-Led Micro-Businesses",
    description: "We distribute financial grants and equipment support to underprivileged women to launch local businesses (like village grocery shops, tailoring boutiques, or poultry farms), securing long-term economic independence.",
    goals: [
      "Deploy ₹20 Lakhs in startup seed grants directly to women.",
      "Support and mentor 300 micro-enterprises through their first year.",
      "Achieve 90% micro-business survival rates after year one."
    ],
    achievements: [
      "Directly funded 110 successful micro-retail startups.",
      "Average household income of funded entrepreneurs increased by ₹5,000/month.",
      "Conducted financial literacy and bookkeeping workshops for 250 micro-business owners."
    ],
    faqs: [
      { q: "How can I apply for a seed grant?", a: "Applications can be submitted via coordinators or our side inquiry forms. Verification of family background is required." }
    ],
    imageText: "Seed Capital Support"
  },
  'hygiene-awareness': {
    title: "Menstrual Hygiene Advocacy",
    subtitle: "Spreading Hygiene Consciousness in Rural Schools and Villages",
    description: "We lead massive community drives, street plays, and school seminars to eliminate taboos surrounding menstruation. We teach teenagers and mothers reproductive hygiene, sanitary pad disposal, and disease prevention.",
    goals: [
      "Conduct health and hygiene seminars in 1,000 government schools.",
      "Distribute free menstrual education guidebooks in local languages.",
      "Install pad vending machines in partner girls high schools."
    ],
    achievements: [
      "Conducted 350+ school workshops reaching 40,000+ girls.",
      "Distributed 15,000 free menstrual health guide booklets.",
      "Collaborated with local panchayats to clean up village sanitation bins."
    ],
    faqs: [
      { q: "Are the school workshops free?", a: "Yes, all school outreach workshops and distributed sanitary starter kits are entirely free of cost." }
    ],
    imageText: "Hygiene Seminars"
  }
};

const WomenEmpowermentDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'life-sakhi-campaign';
  const data = empowermentData[pageKey] || empowermentData['life-sakhi-campaign'];

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="subpage-detail-layout">
      {/* Subpage Hero Banner */}
      <section className="subpage-hero" style={{
        background: 'linear-gradient(135deg, rgba(10, 60, 140, 0.9) 0%, rgba(17, 24, 39, 0.75) 100%)',
        padding: '120px 0 60px 0',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <Link to="/women-empowerment" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Empowerment Page
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-light-green)', marginBottom: '10px' }}>{data.title}</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 300, opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>{data.subtitle}</p>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div className="grid-3" style={{ gap: '40px', alignItems: 'flex-start' }}>
            {/* Detailed Content (2 columns width) */}
            <div style={{ gridColumn: 'span 2' }}>
              <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>About the Initiative</h3>
                <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>{data.description}</p>
                
                <div className="grid-2" style={{ gap: '30px' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-green)', marginBottom: '15px', fontWeight: 700 }}>Program Goals</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {data.goals.map((goal, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.95rem' }}>
                          <CheckCircle size={16} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Key Achievements</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {data.achievements.map((ach, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '0.95rem' }}>
                          <Heart size={16} color="var(--color-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="card" style={{ padding: '40px' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', marginBottom: '20px', fontWeight: 700 }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {data.faqs.map((faq, idx) => (
                    <div key={idx} style={{ borderBottom: '1px solid var(--color-gray-light)', paddingBottom: '15px' }}>
                      <h5 style={{ color: 'var(--color-primary)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Q: {faq.q}</h5>
                      <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Side Form */}
            <div>
              <div className="card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Join Empowerment Program</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Get involved, apply for stitching modules, or sign up as a distributor.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Registration Received!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our local block coordinator will get in touch with you shortly.</p>
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
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Mobile Phone</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} 
                        placeholder="10-digit phone number" 
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
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Tell us about yourself</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="State your age, town/city, and what program interests you..." 
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

export default WomenEmpowermentDetail;
