import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';

const HealthDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'life-sakhi';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', role: '', extra: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 1. Life Sakhi Program Custom Layout
  const renderLifeSakhi = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Program Overview & Strategy</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          The Life Sakhi Program recruits, trains, and certifies local women (Sakhis) to conduct hygiene workshops and distribute biodegradable sanitary napkins directly to village households. This eliminates commercial retail overheads, ensuring pads are affordable while providing Sakhis with direct commissions.
        </p>

        {/* Multi-step tree flowchart */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>The 4-Step Sakhi Livelihood Pipeline</h4>
        <div className="grid-4" style={{ gap: '20px', marginBottom: '35px' }}>
          {[
            { step: "01", title: "Free Registration", desc: "Women register via block coordinators or online intake." },
            { step: "02", title: "Hygiene Training", desc: "Receive 3 days of health advocacy and product training." },
            { step: "03", title: "Inventory Sourcing", desc: "Get subsidized pad packets delivered to their door." },
            { step: "04", title: "Earn Income", desc: "Advocate hygiene in villages and retain healthy commissions." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--color-white)', borderTop: '4px solid var(--color-green)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-green)', marginBottom: '10px' }}>{item.step}</div>
              <h5 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--color-primary)' }}>{item.title}</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Sakhi Income Tiers Table */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Sakhi Payout & Earnings Matrix</h4>
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px 15px' }}>Monthly Packets Sold</th>
                <th style={{ padding: '12px 15px' }}>Cost Price (per pack)</th>
                <th style={{ padding: '12px 15px' }}>Subsidy Commission</th>
                <th style={{ padding: '12px 15px' }}>Estimated Monthly Profit</th>
                <th style={{ padding: '12px 15px' }}>Bonus Incentives</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>100 - 200</td>
                <td style={{ padding: '12px 15px' }}>₹25</td>
                <td style={{ padding: '12px 15px' }}>₹10 per pack</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹1,000 - ₹2,000</td>
                <td style={{ padding: '12px 15px' }}>Free starter kit renewal</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>201 - 500</td>
                <td style={{ padding: '12px 15px' }}>₹23</td>
                <td style={{ padding: '12px 15px' }}>₹12 per pack</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹2,400 - ₹6,000</td>
                <td style={{ padding: '12px 15px' }}>Accidental health coverage</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>500+ (Super Sakhi)</td>
                <td style={{ padding: '12px 15px' }}>₹20</td>
                <td style={{ padding: '12px 15px' }}>₹15 per pack</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹7,500+</td>
                <td style={{ padding: '12px 15px' }}>Accidental cover + cycles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 2. Menstrual Hygiene Layout
  const renderMenstrualHygiene = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Menstrual Hygiene Advocacy in Rural Schools</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Over 23 million girls drop out of school in India annually due to a lack of hygienic facilities and awareness. Our campaigns dismantle social stigmas through interactive seminars, visual folders, and basic biology lectures.
        </p>

        {/* Seminar timeline steps */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Hygiene Workshop Core Modules</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Biological Awareness", desc: "Explaining menstruation scientifically to remove traditional superstitions and shame." },
            { title: "Hygienic Sanitation", desc: "Teaching girls how to properly use and change sanitary napkins every 4-6 hours." },
            { title: "Disposal Protocols", desc: "Installing ecological incinerators and dustbins to avoid environmental contamination." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '15px', background: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-green)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{idx + 1}</div>
              <div>
                <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '5px' }}>{item.title}</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Medical Camps Layout
  const renderMedicalCamps = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Free Village Health Camps Schedule</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We organize specialized camps to offer primary checkups, pediatric consultations, and gynecological advice completely free of cost to local families.
        </p>

        {/* Camps Schedule */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Upcoming Camps Schedule (2026)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { date: "August 12, 2026", location: "Block A - Rohtak, Haryana", partner: "Apollo Clinics", specialist: "Pediatricians & Gynecologists" },
            { date: "September 05, 2026", location: "Block C - Jaipur, Rajasthan", partner: "Fortis Hospitals", specialist: "General Physicians & Dentists" },
            { date: "October 18, 2026", location: "Block B - Gorakhpur, UP", partner: "Local AIIMS doctors", specialist: "Cardiologists & Gynecologists" }
          ].map((camp, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', background: 'var(--color-white)' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700 }}>{camp.date}</div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: '5px 0' }}>{camp.location}</h5>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Specialists: <strong>{camp.specialist}</strong></div>
              </div>
              <div style={{ background: 'rgba(10, 60, 140, 0.08)', padding: '6px 12px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                Partner: {camp.partner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. Nutrition Program Layout
  const renderNutrition = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Nutrition & Anemia Protection</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          Malnutrition and severe anemia are widespread among rural pregnant ladies and adolescent girls. We distribute custom ration packs and health supplements to battle this.
        </p>

        {/* Nutrition kit items details */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>What is inside our Nutrition Kit?</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Iron & Folic Supplements", detail: "Provides critical blood-cell synthesis and prevents anemia." },
            { title: "High-Protein Premix", detail: "Roasted grains and sattu premixes to build baseline strength." },
            { title: "Jaggery & Chana", detail: "Traditional iron boosters distributed to schoolgirls." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 5. Health Awareness Layout
  const renderAwareness = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Preventive Health Awareness Drives</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We organize street plays (Nukkad Nataks), village gatherings, and distribute booklets to teach clean water sanitation and infection prevention.
        </p>

        {/* Street play topics */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Key Campaign Topics</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Water Chlorination</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Using chlorine tablets in village tanks to prevent waterborne typhoids during monsoons.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Vector Control</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Clearing stagnant water spots in blocks to eliminate mosquito nests and Dengue breeding.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Pad Distribution Layout
  const renderPadDistribution = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Supply Chain & Pad Logistics</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We operate 25 localized block micro-warehouses to coordinate shipping and ensure Sakhis never run out of biodegradable sanitary pad packages.
        </p>

        {/* Logistics flow */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Logistics Supply Flow</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { station: "Central Factory", desc: "Sanitary napkins are manufactured from biodegradable natural pulp." },
            { station: "Block Warehouse", desc: "Stock is audited, registered, and packaged into coordinator bags." },
            { station: "Village Sakhi delivery", desc: "Subsidized stock is delivered to Sakhis via micro-logistic routes." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</div>
              <div>
                <strong>{item.station}</strong> - <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 7. Mental Health Layout
  const renderMentalHealth = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Mental Wellness Support Groups</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Providing counseling services, youth career anxiety guidance, and peer-support groups for rural women experiencing family distress.
        </p>

        {/* Group calendars */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Counseling Support Sessions</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Women Peer Support</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Weekly village gatherings to share stress coping skills and domestic problems.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Youth Counseling</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Career distress clinic and personal guidance for government exam candidates.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getSubpageContent = () => {
    switch (pageKey) {
      case 'life-sakhi':
        return renderLifeSakhi();
      case 'menstrual-hygiene':
        return renderMenstrualHygiene();
      case 'medical-camps':
        return renderMedicalCamps();
      case 'nutrition-program':
        return renderNutrition();
      case 'health-awareness':
        return renderAwareness();
      case 'pad-distribution':
        return renderPadDistribution();
      case 'mental-health':
        return renderMentalHealth();
      default:
        return renderLifeSakhi();
    }
  };

  const getSubpageHeader = () => {
    switch (pageKey) {
      case 'life-sakhi':
        return { title: "Life Sakhi Program", desc: "Empowering Rural Women through Menstrual Health Advocacy" };
      case 'menstrual-hygiene':
        return { title: "Menstrual Hygiene Advocacy", desc: "Breaking Taboos and Promoting Safe Menstrual Health Practices" };
      case 'medical-camps':
        return { title: "Free Medical Camps", desc: "Providing Quality Diagnostics and Doctor Consultations to Rural Areas" };
      case 'nutrition-program':
        return { title: "Nutrition & Wellness Program", desc: "Eradicating Malnutrition in Rural Children and Pregnant Women" };
      case 'health-awareness':
        return { title: "Health Awareness Advocacy", desc: "Educating Communities on Preventive Healthcare and Sanitation" };
      case 'pad-distribution':
        return { title: "Sanitary Pad Distribution", desc: "Ensuring Consistent Access to Low-Cost Hygenic Products" };
      case 'mental-health':
        return { title: "Mental Health Support", desc: "Counseling and Support Services for Rural Women and Youth" };
      default:
        return { title: "Health Initiative", desc: "Healthcare for Every Family" };
    }
  };

  const headerDetails = getSubpageHeader();

  const getFormInputs = () => {
    if (pageKey === 'medical-camps') {
      return (
        <>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Doctor Name & Specialty</label>
            <input type="text" name="extra" required value={formData.extra} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="e.g. Dr. Verma (Gynecologist)" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Hospitals / Clinic Link</label>
            <input type="text" name="role" required value={formData.role} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="Affiliated Medical Clinic Name" />
          </div>
        </>
      );
    }
    if (pageKey === 'life-sakhi') {
      return (
        <>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Preferred Livelihood Block</label>
            <input type="text" name="extra" required value={formData.extra} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="Enter village or block name" />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="subpage-detail-layout">
      {/* Dynamic Subpage Hero Banner */}
      <section className="subpage-hero" style={{
        background: 'linear-gradient(135deg, rgba(10, 60, 140, 0.9) 0%, rgba(17, 24, 39, 0.75) 100%)',
        padding: '130px 0 60px 0',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <Link to="/health" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Health Hub
          </Link>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-green)', marginBottom: '10px' }}>{headerDetails.title}</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 300, opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>{headerDetails.desc}</p>
        </div>
      </section>

      {/* Main Content & Form Grid */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div className="grid-3" style={{ gap: '40px', alignItems: 'flex-start' }}>
            {/* Detailed Content (2 columns width) */}
            <div style={{ gridColumn: 'span 2' }}>
              {getSubpageContent()}
            </div>

            {/* Side Intake form */}
            <div>
              <div className="card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>
                  {pageKey === 'medical-camps' ? 'Volunteer as Doctor' : 'Inquire / Join Campaign'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                  {pageKey === 'medical-camps' ? 'Offer diagnostic consultations in rural camp sites.' : 'Get involved or request resources for your local block.'}
                </p>

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
                    {getFormInputs()}
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
