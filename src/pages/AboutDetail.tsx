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

const aboutData: Record<string, SubPageData> = {
  'founder': {
    title: "Founder's Message & History",
    subtitle: "Understanding our Origins, Passion, and Commitment",
    description: "Life Changing Educational & Charitable Trust was founded in 2022 by a group of passionate social workers, educators, and doctors. Led by Dr. Ritu Sharma, we set out to build sustainable programs in rural blocks that link health awareness directly to local female entrepreneurship.",
    goals: [
      "Drive absolute alignment between social welfare and economic growth.",
      "Normalize conversations on female sanitation in remote villages.",
      "Enable every rural child to have a digitally-guided primary school education."
    ],
    achievements: [
      "Successfully scaled programs to cover over 100+ districts across northern states.",
      "Partnered with state health systems for vaccination and checkup camps.",
      "Honored with multiple regional NGO leadership awards."
    ],
    faqs: [
      { q: "Who is on the trustee board?", a: "The board comprises certified healthcare professionals, retired educators, and corporate social responsibility experts." }
    ],
    imageText: "Founder Message"
  },
  'vision-mission': {
    title: "Vision & Mission Statement",
    subtitle: "Our Core Objectives, Values, and Roadmaps",
    description: "Our Vision is to construct an inclusive India where quality education, primary medical diagnostics, and menstrual safety are standard human rights, regardless of geography or economic status. Our Mission is to deploy localized networks of smart learning tools, free health camps, and cooperative women distributor units.",
    goals: [
      "Establish 100% sanitary napkin adoption across partner panchayats.",
      "Achieve zero dropout rates in all schools utilizing our smart class panels.",
      "Equip all village centers with community clean water resources."
    ],
    achievements: [
      "Developed a validated, transparent local supply chain model.",
      "Directly impacted over 100,000 rural residents through our welfare schemes.",
      "100% compliance record on all audit parameters."
    ],
    faqs: [
      { q: "What are your core organization values?", a: "Transparency, dignity, gender equality, and sustainable local community ownership." }
    ],
    imageText: "Mission Statement"
  },
  'legal': {
    title: "80G, 12A & CSR Compliances",
    subtitle: "Complete Transparency and Legal Accreditation Details",
    description: "Life Changing Educational & Charitable Trust is fully registered under the Indian Trusts Act, 1882. We hold valid Income Tax registrations under Section 12A and Section 80G, making all donations fully tax-deductible. We are also officially certified by the Ministry of Corporate Affairs for CSR (Corporate Social Responsibility) undertakings.",
    goals: [
      "Keep administrative overheads strictly below 10% of total disbursements.",
      "Publish audit balance sheets annually on our public portal.",
      "Comply with all FCRA and national donation frameworks."
    ],
    achievements: [
      "Annual tax audits cleared without a single compliance discrepancy since 2022.",
      "Issued automated 80G tax-exemption certificates for thousands of donors.",
      "CSR project registration approved (Form CSR-1) by the Registrar of Companies."
    ],
    faqs: [
      { q: "Can corporate partners track CSR utilization?", a: "Yes, we submit detailed utilization certificates (UC), expenditure logs, and quarterly video reports for all corporate funding." }
    ],
    imageText: "Compliances & Audits"
  },
  'team': {
    title: "Management Team & Board",
    subtitle: "Meet the Team Driving Change on the Ground",
    description: "Our team consists of medical experts, software developers, field coordinators, and logistics managers. Working together, we direct block-level programs, raw material sourcing, and school smart panel deployments.",
    goals: [
      "Build a team of 100+ full-time coordinators and project heads.",
      "Ensure all district representatives are trained in social auditing tools.",
      "Host monthly community volunteer workshops."
    ],
    achievements: [
      "Grew from 5 founders to a team of 60+ full-time professionals.",
      "Implemented a standardized field reporting portal for real-time progress updates.",
      "Average field experience of our project heads exceeds 12 years."
    ],
    faqs: [
      { q: "How can I join the management team?", a: "We list vacancies on our Careers section, or you can send your resume via the Contact coordinators intake form." }
    ],
    imageText: "Our Team"
  },
  'partners': {
    title: "Partners & Corporate Board",
    subtitle: "Our Collaborators, Sponsors, and Supporters",
    description: "We are supported by a diverse array of corporate CSR funds, hospital chains, school districts, and individual donors. These partnerships enable us to distribute subsidized hygiene products, run diagnostics, and install e-learning panels.",
    goals: [
      "Secure 50+ corporate CSR partnerships for scale-up projects.",
      "Form medical referral agreements with 20 leading hospital networks.",
      "Partner with state educational boards to catalog audio-visual smart classes."
    ],
    achievements: [
      "Key CSR partnerships signed with HDFC Bank CSR and Dabur India.",
      "Referral diagnostic systems established with local Apollo Clinics.",
      "Recognized as a trusted implementation partner by local district offices."
    ],
    faqs: [
      { q: "How can corporate brands partner with the Trust?", a: "Corporate representatives can reach out via the CSR partner options on our Contact or Register screens to schedule a consult." }
    ],
    imageText: "NGO Partners"
  }
};

const AboutDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'founder';
  const data = aboutData[pageKey] || aboutData['founder'];

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
          <Link to="/about" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to About Page
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
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Trust Outreach Board</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Inquire for partnership, audit queries, or legal compliance copies.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Inquiry Sent Successfully!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our administrative team will contact you to verify details shortly.</p>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Message / Corporate Query</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Detail your request or partnership details..." 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                      <Send size={16} /> Submit Inquiry
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

export default AboutDetail;
