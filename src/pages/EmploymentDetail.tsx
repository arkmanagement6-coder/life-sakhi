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

const employmentData: Record<string, SubPageData> = {
  'women-employment': {
    title: "Women Employment Schemes",
    subtitle: "Enabling Rural Women to Earn Independent Incomes",
    description: "Our Women Employment Program is designed to remove gender-based economic dependency by creating direct village livelihoods. We train women as community health distributors (Life Sakhis), micro-tailors, and cooperative leaders, ensuring they earn sustainable commissions and independent family incomes.",
    goals: [
      "Help 5,000 rural women secure independent livelihoods by 2027.",
      "Integrate local women distributors into global supply chains.",
      "Facilitate digital literacy and financial banking support for rural workers."
    ],
    achievements: [
      "Over 2,000 women actively earning through distribution and micro-works.",
      "Average household income in target clusters increased by ₹4,000/month.",
      "Created 15 localized micro-production centers managed entirely by women."
    ],
    faqs: [
      { q: "Is prior experience required to join?", a: "No, we provide comprehensive, step-by-step training, product toolkits, and marketing support for all enrolled women." }
    ],
    imageText: "Women Micro-Entrepreneurship"
  },
  'self-help-groups': {
    title: "Self Help Groups (SHG) Support",
    subtitle: "Mobilizing Communities for Cooperative Growth and Micro-Finance",
    description: "We organize rural women into Self Help Groups (SHGs) to promote collective thrift and mutual credit assistance. By opening cooperative bank accounts, we link these groups to official banking institutions for low-interest micro-loans, starting home-based small enterprises.",
    goals: [
      "Form and support 500 active rural women Self Help Groups.",
      "Establish cooperative micro-credit facilities for rural business setups.",
      "Deliver leadership training to SHG representatives."
    ],
    achievements: [
      "Formed and actively supporting 180+ Self Help Groups.",
      "Facilitated bank linkages and credit approvals worth ₹40 Lakhs.",
      "Cooperative soap and garment brands launched by rural groups in local weekly markets."
    ],
    faqs: [
      { q: "What is the average size of an SHG?", a: "Typically, an SHG consists of 10 to 20 local women who meet weekly to save money and discuss community issues." }
    ],
    imageText: "Rural SHG Assembly"
  },
  'vocational-training': {
    title: "Vocational & Tailoring Classes",
    subtitle: "Skilling Women in Stitching, Textile Crafting, and Packaging",
    description: "Our vocational training labs offer free, certified courses in tailoring, embroidery, and organic packaging. Upon graduating, women are either recruited directly into our sanitary pad manufacturing units or set up independent home boutique boutiques.",
    goals: [
      "Establish 15 block-level tailoring and vocational training labs.",
      "Certify 2,000 women annually in garment crafting.",
      "Provide free industrial sewing machines to outstanding trainees."
    ],
    achievements: [
      "Trained 750+ women in certified tailoring modules.",
      "Distributed 120 free heavy-duty sewing machines to top graduates.",
      "Trainees regularly manufacture cloth bags and school uniform orders."
    ],
    faqs: [
      { q: "Are the classes free?", a: "Yes, all materials, trainers, and sewing machines are provided in the training labs completely free of charge." }
    ],
    imageText: "Stitching Training Labs"
  },
  'micro-business': {
    title: "Micro Business Seed Capital",
    subtitle: "Providing Startup Grants and Mentoring for Rural Startups",
    description: "We provide small financial grants, equipment, and market linkage coaching to women micro-entrepreneurs. Whether launching a small grocery store (Kirana), organic farming patch, or poultry farm, we handhold them through business setup phases.",
    goals: [
      "Distribute ₹20 Lakhs in startup seed grants directly to women.",
      "Mentor 300 micro-enterprises through their first financial year.",
      "Conduct quarterly financial literacy workshops for business owners."
    ],
    achievements: [
      "Directly funded 110 successful micro-retail startups.",
      "92% of funded enterprises are profitable and self-sustaining after 12 months.",
      "Delivered accounting training to 250 micro-business owners."
    ],
    faqs: [
      { q: "Is the seed capital a loan or a grant?", a: "It is a non-refundable seed grant given to select qualified candidates to encourage women entrepreneurs without debt stress." }
    ],
    imageText: "Rural Micro-Ventures"
  },
  'distributors': {
    title: "Women Distributor Network",
    subtitle: "Distributing Health Products directly to Villages",
    description: "This network links rural women directly to our sanitary pad production channels. Distributors buy biodegradable pads at subsidized prices, advocate for hygiene in their blocks, and sell directly to villagers, ensuring a healthy commission margin on every box.",
    goals: [
      "Build a network of 3,000 active village distributors.",
      "Equip all distributors with health kit bags and digital payment scanners.",
      "Provide health advocacy certification to all network members."
    ],
    achievements: [
      "1,200+ active women distributors deployed across 4 states.",
      "Distributors have successfully generated localized sales worth ₹25 Lakhs.",
      "Improved menstrual hygiene adoption rates in distributor villages by 60%."
    ],
    faqs: [
      { q: "How do distributors get their stock?", a: "Block and District coordinators deliver stock directly to the distributor's doorstep on a monthly schedule." }
    ],
    imageText: "Distributors Network"
  },
  'coordinator-program': {
    title: "District Coordinator Recruitment",
    subtitle: "Join our Management Board to Oversee Block-Level Deployments",
    description: "District and Block Coordinators act as the management backbone of our trust. They coordinate raw material distribution, collect feedback from Sakhis, manage local logistics, and coordinate with government departments and partner schools.",
    goals: [
      "Appoint 50 dedicated District Coordinators across active states.",
      "Run quarterly leadership management summits for coordinators.",
      "Streamline block-level audit systems."
    ],
    achievements: [
      "Appointed 18 District and 42 Block Coordinators to date.",
      "Successfully coordinated campaigns across 60 blocks.",
      "Coordinators facilitated 100% checkup coverage during village health camps."
    ],
    faqs: [
      { q: "What is the qualification for a Coordinator?", a: "Candidates should have a degree, basic management skills, communication capability, and a passion for rural community development." }
    ],
    imageText: "Coordinators Summit"
  }
};

const EmploymentDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'women-employment';
  const data = employmentData[pageKey] || employmentData['women-employment'];

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
          <Link to="/employment" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Employment Page
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
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Registration / Partner Inquiry</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Apply to register as an SHG partner, distributor, or area coordinator.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Inquiry Staged!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our management desk will contact you to verify details soon.</p>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Email ID</label>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Livelihood Interest / Area</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Mention your village/district name and what program you want to join..." 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                      <Send size={16} /> Submit Registration
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

export default EmploymentDetail;
