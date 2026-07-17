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

const healthData: Record<string, SubPageData> = {
  'life-sakhi': {
    title: "Life Sakhi Program",
    subtitle: "Empowering Rural Women through Menstrual Health Advocacy",
    description: "The Life Sakhi Program is our flagship women's health and empowerment initiative. We train local rural women (Sakhis) to become health advocates and sanitary pad distributors in their villages. By making premium-quality biodegradable pads accessible and affordable, we are fighting reproductive infections while providing sustainable livelihood models.",
    goals: [
      "Establish a network of 5,000+ Sakhis across 5 states.",
      "Distribute 1 million+ biodegradable sanitary pads.",
      "Achieve 100% menstrual hygiene awareness in targeted blocks.",
      "Help every Sakhi earn a sustainable monthly household income."
    ],
    achievements: [
      "Over 2,000 active Sakhis successfully trained and deployed.",
      "Distributed over 400,000 pads in rural Haryana, UP, and Rajasthan.",
      "Average Sakhi income increased by 30% through direct product commission.",
      "Awarded 'Best Women Hygiene Initiative' by State Health Department in 2025."
    ],
    faqs: [
      { q: "Who can become a Life Sakhi?", a: "Any rural woman with a desire to improve community health and earn an income can register. Training and starter kits are provided for free." },
      { q: "How are the products distributed?", a: "Sakhis purchase pads at subsidized rates from Block Coordinators and distribute them directly in their neighborhoods." }
    ],
    imageText: "Life Sakhi Advocacy"
  },
  'menstrual-hygiene': {
    title: "Menstrual Hygiene Advocacy",
    subtitle: "Breaking Taboos and Promoting Safe Menstrual Health Practices",
    description: "Our Menstrual Hygiene Advocacy campaigns focus on removing the social stigma surrounding menstruation in rural schools and communities. Through sanitary seminars, educational flyers, and interactive workshops, we teach young girls and mothers the biology of menstruation and the health risks of using unhygienic alternatives.",
    goals: [
      "Conduct hygiene awareness seminars in 1,000 rural government schools.",
      "Provide free sanitary starter kits to 50,000 adolescent girls.",
      "Construct clean, private girl-friendly toilets in rural school blocks."
    ],
    achievements: [
      "Conducted 350+ school seminars reaching 40,000+ schoolgirls.",
      "Distributed 15,000 free menstrual health booklets in local languages.",
      "Established sanitary pad disposal bins in 50 partner schools."
    ],
    faqs: [
      { q: "What topics are covered in the seminars?", a: "We cover reproductive biology, sanitary disposal, infection prevention, and confidence-building exercises." },
      { q: "How can schools request a hygiene workshop?", a: "School administrators can apply directly through our contact form to schedule a workshop." }
    ],
    imageText: "Hygiene Workshops"
  },
  'medical-camps': {
    title: "Free Medical Camps",
    subtitle: "Providing Quality Diagnostics and Doctor Consultations to Rural Areas",
    description: "We organize regular general and specialized medical camps in remote villages where access to healthcare infrastructure is sparse. Partnering with top hospitals and doctors, we offer free primary checkups, pediatric consultations, gynecological advice, and essential medicines.",
    goals: [
      "Run 150 medical camps annually across critical rural blocks.",
      "Distribute free iron, calcium, and multivitamin supplements to women.",
      "Provide referral pathways and financial support for serious medical cases."
    ],
    achievements: [
      "Conducted 85 successful camps treating 22,000+ rural patients.",
      "Distributed free medicines worth ₹5 Lakhs to needy families.",
      "Referred and funded surgeries for 45 pediatric cardiac patients."
    ],
    faqs: [
      { q: "What medical specialists are present in the camps?", a: "We invite general physicians, pediatricians, gynecologists, and eye specialists." },
      { q: "Are the diagnostics and medicines free?", a: "Yes, all consultations, primary checkups, and distributed medicines are completely free." }
    ],
    imageText: "Rural Medical Camps"
  },
  'nutrition-program': {
    title: "Nutrition & Wellness Program",
    subtitle: "Eradicating Malnutrition in Rural Children and Pregnant Women",
    description: "Our nutrition program focuses on fighting anemia and malnourishment among pregnant ladies, lactating mothers, and young children in impoverished districts. We distribute dry ration kits, nutritional supplements, and educate families on budget-friendly balanced diets.",
    goals: [
      "Lower anemia rates in partner blocks by 15% over three years.",
      "Provide daily nutritious meals to 2,000 underprivileged children.",
      "Host monthly nutrition cooking demonstrations in community centers."
    ],
    achievements: [
      "Distributed 5,000+ pregnancy nutrition kits (containing iron supplements and protein powder).",
      "Regularly feeding 800+ children across our smart learning centers.",
      "Conducted 60 nutritional counseling workshops for rural mothers."
    ],
    faqs: [
      { q: "What do the nutrition kits contain?", a: "They contain roasted chana, jaggery, high-protein supplements, iron-folic acid tablets, and basic hygiene soap." },
      { q: "Who is eligible to receive nutrition aid?", a: "Pregnant ladies, lactating mothers, and young children showing symptoms of malnourishment are enrolled after camp checkups." }
    ],
    imageText: "Nutrition Distribution"
  },
  'health-awareness': {
    title: "Health Awareness Advocacy",
    subtitle: "Educating Communities on Preventive Healthcare and Sanitation",
    description: "We lead extensive grassroots media and street-theater (Nukkad Natak) campaigns to educate rural masses on preventive health, vector-borne diseases, clean drinking water practices, and sanitation habits to reduce seasonal disease outbreaks.",
    goals: [
      "Conduct sanitation drives across 500 villages.",
      "Create clean drinking water awareness banners and host village gatherings.",
      "Lower incidence of seasonal diarrhea and malaria in targeted clusters."
    ],
    achievements: [
      "Staged 120+ street plays on health awareness in local dialects.",
      "Distributed 3,000 water chlorine tablets in flood-prone villages.",
      "Conducted village sanitization drives with local youth clubs."
    ],
    faqs: [
      { q: "How can volunteers participate in awareness drives?", a: "Volunteers can sign up through our Register page and join our local state coordinators during weekend drives." }
    ],
    imageText: "Grassroots Campaigns"
  },
  'pad-distribution': {
    title: "Sanitary Pad Distribution",
    subtitle: "Ensuring Consistent Access to Low-Cost Hygenic Products",
    description: "We operate a direct logistics system to ensure subsidized sanitary pads are consistently supplied to women in remote geographies. This direct delivery channel bypasses high commercial retail markups, ensuring quality pads are never out of stock.",
    goals: [
      "Set up 100 block-level inventory micro-warehouses.",
      "Partner with corporate donors to fully subsidize sanitary products for schoolgirls.",
      "Ensure uninterrupted pad supplies even during monsoon seasons."
    ],
    achievements: [
      "Established 25 functional block logistics units managed by coordinators.",
      "Achieved zero product outages across all active Sakhi networks in 2025.",
      "Provided 50,000 sanitary pad packets to disaster-hit regions in recent floods."
    ],
    faqs: [
      { q: "How are the pads subsidized?", a: "Corporate CSR funding offsets manufacturing and logistical costs, making the pads extremely low-cost." }
    ],
    imageText: "Pad Logistics Network"
  },
  'mental-health': {
    title: "Mental Health Support",
    subtitle: "Counseling and Support Services for Rural Women and Youth",
    description: "Our mental health initiative provides professional counseling and peer support groups for rural women dealing with domestic stress, postpartum issues, and youth experiencing career anxiety. We aim to normalize seeking therapy in rural communities.",
    goals: [
      "Establish 10 rural counseling centers with visiting psychologists.",
      "Host weekly women's peer support groups in all partner villages.",
      "Train local Sakhis to identify early signs of anxiety and depression."
    ],
    achievements: [
      "Provided free counseling to 1,200+ rural women.",
      "Conducted 80 career stress workshops for village youth.",
      "Established a toll-free helpline number for anonymous counselor support."
    ],
    faqs: [
      { q: "Are the counseling sessions confidential?", a: "Yes, all consultations and sessions are strictly confidential and secure." }
    ],
    imageText: "Mental Wellness Support"
  }
};

const HealthDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'life-sakhi';
  const data = healthData[pageKey] || healthData['life-sakhi'];

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
          <Link to="/health" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Health Page
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
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Inquire / Join Campaign</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Get involved or request resources for your local community.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Inquiry Sent Successfully!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our coordinator will contact you within 24-48 working hours.</p>
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
                        placeholder="10-digit mobile number" 
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Message / Requirements</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Detail your request or inquiry..." 
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

export default HealthDetail;
