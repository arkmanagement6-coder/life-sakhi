import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';

const WomenEmpowermentDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'life-sakhi-campaign';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', details: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 1. Campaign Details
  const renderCampaign = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>The Life Sakhi Hygiene Drive</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          This movement advocates for menstrual safety by providing biodegradable sanitary pads and eliminating the health infections caused by traditional unhygienic materials in rural homes.
        </p>

        {/* Pad specs absorption rate comparisons */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Life Sakhi Biodegradable Pads Specifications</h4>
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px 15px' }}>Material Feature</th>
                <th style={{ padding: '12px 15px' }}>Life Sakhi Pads</th>
                <th style={{ padding: '12px 15px' }}>Standard Plastic Pads</th>
                <th style={{ padding: '12px 15px' }}>Environmental Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Absorption Fiber</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>Natural Pinewood Pulp</td>
                <td style={{ padding: '12px 15px' }}>Synthetic poly-gels</td>
                <td style={{ padding: '12px 15px' }}>100% skin-safe & breathable</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Decomposition Time</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>6 - 12 Months</td>
                <td style={{ padding: '12px 15px' }}>500+ Years</td>
                <td style={{ padding: '12px 15px' }}>Disintegrates naturally in compost</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Chemicals & Bleach</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>Elemental Chlorine Free (ECF)</td>
                <td style={{ padding: '12px 15px' }}>Chlorine-bleached plastics</td>
                <td style={{ padding: '12px 15px' }}>Zero toxins, zero rashes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 2. Distributor Kit Layout
  const renderDistributorKit = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Distributor Livelihood Program</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          We provide women with toolkits and stock to advocacy-sell pads in their home villages, retaining solid commissions.
        </p>

        {/* Distributor startup kit item list */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>What is inside the Sakhi Startup Kit?</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Starter Pad Packets", desc: "Contains 100 packets of biodegradable sanitary napkins to initiate local distribution." },
            { title: "Health Kit Bag", desc: "Convenient green shoulder bag branded with 'Life Sakhi' logo for village visits." },
            { title: "Banners & Leaflets", desc: "Educational leaflets outlining reproductive wellness and vector-hygiene guidelines." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. SHG Support Layout
  const renderSHG = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Cooperative SHG Support Divisions</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Supporting cooperative production lines where women sort and package local products together.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Our Support Pillars</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { pillar: "Cooperative Account Registration", desc: "Setting up institutional group accounts linked to credit systems." },
            { pillar: "Production Units Sourcing", desc: "Supplying packaging machines, sealers, and protective gear." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-green)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</div>
              <div>
                <strong>{item.pillar}</strong> - <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. Vocational Skills Layout
  const renderVocational = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Stitching and Garment Crafting</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Free training clinics offering lessons in pattern cutting, uniform stitching, and ecological bag production.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Our Core Training Classes</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Garment Stitching</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Techniques for manufacturing school uniforms and domestic fabrics.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Eco Packaging Bags</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Stitching canvas and wood pulp bags to replace single-use plastic carrier wraps.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Livelihood Capital Layout
  const renderLivelihoodCapital = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Micro Livelihood Capital Grants</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We distribute micro startup grants to support village boutiques, grocery stores, and rural cooperative ventures.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Cooperative Development Phases</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { phase: "Proposal Verification", desc: "Local coordinators verify candidate backgrounds and business viability." },
            { phase: "Asset Allocation", desc: "Purchasing sewing machines, billing meters, and wholesale inventory." },
            { phase: "Audit Review", desc: "Assisting business owners with bookkeeping journals during month-end cycles." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</div>
              <div>
                <strong>{item.phase}</strong> - <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 6. Hygiene Awareness Layout
  const renderHygieneAwareness = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Menstrual Safety & Hygiene Campaigns</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Conacting village panchayats and holding school workshops to remove traditional menstrual shame and promote hygienic habits.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Our Awareness Outreach Modules</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Adolescent Classes", desc: "Scientific counseling and health kit distribution for schoolgirls." },
            { title: "Mother Peer Groups", desc: "Dismantling outdated menstrual stigmas and training mothers in sanitation." },
            { title: "Panchayat Summits", desc: "Installing ecological disposal dustbins across village streets." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getSubpageContent = () => {
    switch (pageKey) {
      case 'life-sakhi-campaign':
        return renderCampaign();
      case 'distributor-program':
        return renderDistributorKit();
      case 'shg-support':
        return renderSHG();
      case 'vocational-skills':
        return renderVocational();
      case 'livelihood-capital':
        return renderLivelihoodCapital();
      case 'hygiene-awareness':
        return renderHygieneAwareness();
      default:
        return renderCampaign();
    }
  };

  const getSubpageHeader = () => {
    switch (pageKey) {
      case 'life-sakhi-campaign':
        return { title: "Life Sakhi Campaign", desc: "A Mass Health Drive Ensuring Menstrual Dignity" };
      case 'distributor-program':
        return { title: "Distributor Livelihood Program", desc: "Turn Hygiene Advocacy into a Source of Household Income" };
      case 'shg-support':
        return { title: "Self Help Group Support", desc: "Fostering Collective Entrepreneurship and Financial Strength" };
      case 'vocational-skills':
        return { title: "Stitching & Craft Training", desc: "Vocational Skills in Garment Making and Sustainable Crafting" };
      case 'livelihood-capital':
        return { title: "Micro Livelihood Capital", desc: "Startup Grants for Rural Women-Led Micro-Businesses" };
      case 'hygiene-awareness':
        return { title: "Menstrual Hygiene Advocacy", desc: "Spreading Hygiene Consciousness in Rural Schools and Villages" };
      default:
        return { title: "Women Empowerment", desc: "Promoting Dignity, Health, and Financial Independence" };
    }
  };

  const headerDetails = getSubpageHeader();

  return (
    <div className="subpage-detail-layout">
      {/* Subpage Hero Banner */}
      <section className="subpage-hero" style={{
        background: 'linear-gradient(135deg, rgba(10, 60, 140, 0.9) 0%, rgba(17, 24, 39, 0.75) 100%)',
        padding: '130px 0 60px 0',
        color: 'var(--color-white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <Link to="/women-empowerment" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Empowerment Hub
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

            {/* Side form */}
            <div>
              <div className="card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Apply/Register</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Join the active campaign or apply for training tools.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Request Received!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our coordinator will review and contact you shortly.</p>
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
                        placeholder="Enter full name" 
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Details / Inquiry Message</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Detail your request..." 
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                      <Send size={16} /> Submit Application
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
