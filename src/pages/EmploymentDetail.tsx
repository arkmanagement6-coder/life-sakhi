import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send } from 'lucide-react';

const EmploymentDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'women-employment';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', location: '', experience: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 1. Women Employment Layout
  const renderWomenEmployment = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Village Women Livelihoods</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          We establish home-based packaging, sanitary pad distribution, and micro-tailoring units to create independent incomes for rural women.
        </p>

        {/* Livelihood success metrics */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Our Impact Metrics</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '35px' }}>
          {[
            { metric: "2,000+", title: "Women Employed", desc: "Active Sakhis and tailors earning directly." },
            { metric: "₹4,500+", title: "Avg. Income Increase", desc: "Additional monthly household income." },
            { metric: "15+", title: "Production Centers", desc: "Decentralized packaging units in villages." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', textAlign: 'center', background: 'var(--color-white)', borderTop: '4px solid var(--color-green)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-green)', marginBottom: '10px' }}>{item.metric}</div>
              <h5 style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--color-primary)' }}>{item.title}</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. Self Help Groups (SHG) Layout
  const renderSHG = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Self Help Groups Cooperative Support</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          SHGs enable women to collect weekly savings, discuss local affairs, and link to government banking entities to secure micro-loans for business startups.
        </p>

        {/* SHG cooperative timeline */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Cooperative Development Timeline</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Mobilization & Setup", desc: "Gathering 10-20 village women, setting up bi-weekly savings accounts." },
            { title: "Banking Linkages", desc: "Opening cooperative bank accounts to deposit savings and build credit histories." },
            { title: "Credit Grants & Startups", desc: "Securing low-interest bank loans to fund grocery, craft, or agricultural micro-ventures." }
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

  // 3. Vocational Training Layout
  const renderVocational = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Tailoring & Crafts Vocational Lab</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Providing free, structured tailoring classes to prepare women for cottage industries or self-employed boutiques.
        </p>

        {/* Course details */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Tailoring Certification Modules</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Pattern Cutting", desc: "Stitching patterns for school uniforms, cloth bags, and dresses." },
            { title: "Embroidery & Art", desc: "Traditional block-prints, decorative stitching, and textile design." },
            { title: "Cooperative Work", desc: "Fulfilling institutional textile orders in groups." }
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

  // 4. Micro Business Layout
  const renderMicroBusiness = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Seed Grants for Village Startups</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We distribute small business grants and provide mentorship to help women establish sustainable local grocery stores, tailor shops, and dairy setups.
        </p>

        {/* Seed capital funding categories */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Funding Categories</h4>
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px 15px' }}>Business Sector</th>
                <th style={{ padding: '12px 15px' }}>Grant Allocation</th>
                <th style={{ padding: '12px 15px' }}>Equipment Provided</th>
                <th style={{ padding: '12px 15px' }}>Survival Mentorship</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Cottage Tailoring</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹15,000</td>
                <td style={{ padding: '12px 15px' }}>2 heavy duty sewing machines, fabrics, threads</td>
                <td style={{ padding: '12px 15px' }}>12 months catalog linkage</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Grocery / Kirana Shop</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹25,000</td>
                <td style={{ padding: '12px 15px' }}>Racks, billing balance scale, wholesale stock</td>
                <td style={{ padding: '12px 15px' }}>Bookkeeping training</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Organic Farming / Poultry</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹30,000</td>
                <td style={{ padding: '12px 15px' }}>High-yield seeds, fertilizers, poultry cages</td>
                <td style={{ padding: '12px 15px' }}>Veterinary/agri checkups</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 5. Distributors Layout
  const renderDistributors = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Women Distributor Channels</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Distributors advocate hygiene in their blocks and sell sanitary pads directly, earning healthy commission payouts on every box.
        </p>

        {/* Commission breakdown */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Distributor Commission Structures</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Standard Margin</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Get a direct profit margin of 40% on every sanitary pad packet sold in villages.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Performance Bonus</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Achieve super-distributor tiers to receive free transport vehicles (cycles/scooters).</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Coordinator Layout
  const renderCoordinator = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>District & Block Coordinator Positions</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Coordinators manage inventory warehouses, coordinate checks, collect feedback from Sakhis, and liaise with district offices.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Roles & Accountabilities</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { role: "Inventory Audits", desc: "Assuring zero product outages across active Sakhi distribution units." },
            { role: "Panchayat Coordination", desc: "Interacting with local bodies to arrange medical camp setups and school seminars." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-primary)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</div>
              <div>
                <strong>{item.role}</strong> - <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const getSubpageContent = () => {
    switch (pageKey) {
      case 'women-employment':
        return renderWomenEmployment();
      case 'self-help-groups':
        return renderSHG();
      case 'vocational-training':
        return renderVocational();
      case 'micro-business':
        return renderMicroBusiness();
      case 'distributors':
        return renderDistributors();
      case 'coordinator-program':
        return renderCoordinator();
      default:
        return renderWomenEmployment();
    }
  };

  const getSubpageHeader = () => {
    switch (pageKey) {
      case 'women-employment':
        return { title: "Women Employment Schemes", desc: "Enabling Rural Women to Earn Independent Incomes" };
      case 'self-help-groups':
        return { title: "Self Help Groups (SHG) Support", desc: "Mobilizing Communities for Cooperative Growth and Micro-Finance" };
      case 'vocational-training':
        return { title: "Vocational & Tailoring Classes", desc: "Skilling Women in Stitching, Textile Crafting, and Packaging" };
      case 'micro-business':
        return { title: "Micro Business Seed Capital", desc: "Providing Startup Grants and Mentoring for Rural Startups" };
      case 'distributors':
        return { title: "Women Distributor Network", desc: "Distributing Health Products directly to Villages" };
      case 'coordinator-program':
        return { title: "District Coordinator Recruitment", desc: "Join our Management Board to Oversee Block-Level Deployments" };
      default:
        return { title: "Employment Schemes", desc: "Livelihood Opportunities & Skills" };
    }
  };

  const headerDetails = getSubpageHeader();

  const getFormInputs = () => {
    if (pageKey === 'coordinator-program') {
      return (
        <>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Highest Degree / Qualification</label>
            <input type="text" name="experience" required value={formData.experience} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="e.g. BA, MBA, MSW" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Management Experience (Years)</label>
            <input type="text" name="location" required value={formData.location} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="e.g. 2 Years in Social Work" />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="subpage-detail-layout page-employment">
      {/* Subpage Hero Banner */}
      <section className="subpage-hero">
        <div className="container">
          <Link to="/employment" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Employment Hub
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
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>
                  {pageKey === 'coordinator-program' ? 'Apply as Coordinator' : 'Inquire / Join Program'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                  {pageKey === 'coordinator-program' ? 'Submit details to join our block audits team.' : 'Inquire to open custom local boutiques or coordinate SHGs.'}
                </p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Registration Received!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>We will review your details and call you back shortly.</p>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Contact Phone</label>
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
                    {getFormInputs()}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Location / Message</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Provide details..." 
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

export default EmploymentDetail;
