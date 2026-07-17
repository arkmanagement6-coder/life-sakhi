import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Send, Monitor } from 'lucide-react';

const EducationDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'child-education';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '', education: '', income: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // 1. Child Education Custom Layout
  const renderChildEducation = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Primary Education for Out-of-School Children</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '30px' }}>
          We identify dropouts and working children in low-income zones, enrolling them in our bridge centers where they receive remedial courses to catch up on baseline reading, writing, and arithmetic before mainstream integration.
        </p>

        {/* Bridge Centers Curriculum Timeline */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>6-Month Bridge Learning Curriculum</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
          {[
            { duration: "Months 1 - 2: Literacy Boot", desc: "Developing phonics, letter identification, and basic sentence crafting in local languages." },
            { duration: "Months 3 - 4: Basic Math & Logic", desc: "Teaching additions, subtraction tables, basic currency transactions, and logic games." },
            { duration: "Months 5 - 6: Integration Prep", desc: "Aligning learning with formal state board school syllabus and passing evaluation tests." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', background: 'var(--color-white)', padding: '20px', borderRadius: 'var(--border-radius-sm)', borderLeft: '4px solid var(--color-green)' }}>
              <div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', marginBottom: '5px' }}>{item.duration}</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. Digital Learning Custom Layout
  const renderDigitalLearning = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Digital smart classrooms</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          By installing visual smart project labs in underfunded government primary schools, we make science, geography, and maths fun and easy to retain.
        </p>

        {/* Smart classroom elements */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '20px', fontWeight: 700 }}>Smart Classroom Setup Elements</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "HD Display Smart Boards", desc: "Visual screens showing high-definition animated educational cartoons." },
            { title: "Offline Study Cards", desc: "Curriculum aligned flash drives loaded with lessons, no internet required." },
            { title: "Solar Power Backup", desc: "Equipped with mini solar batteries to stay active during village power outages." }
          ].map((item, idx) => (
            <div key={idx} className="card" style={{ padding: '20px', background: 'var(--color-white)', textAlign: 'center' }}>
              <Monitor size={32} color="var(--color-green)" style={{ marginBottom: '10px' }} />
              <h5 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>{item.title}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 3. Scholarships Layout
  const renderScholarships = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Merit-cum-Means Scholarships</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We provide financial aid packages to bright students from low-income families to pursue high school diplomas or professional college degrees.
        </p>

        {/* Scholarship eligibility tiers */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Scholarship Grant Tiers</h4>
        <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px 15px' }}>Scholarship Category</th>
                <th style={{ padding: '12px 15px' }}>Annual Grant Amount</th>
                <th style={{ padding: '12px 15px' }}>Coverage Details</th>
                <th style={{ padding: '12px 15px' }}>Eligibility Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>High School (9th-12th)</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹12,000</td>
                <td style={{ padding: '12px 15px' }}>Books, stationery, uniforms & board fees</td>
                <td style={{ padding: '12px 15px' }}>&gt; 70% in last exam</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Undergraduate Degree</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹35,000</td>
                <td style={{ padding: '12px 15px' }}>College tuition fee reimbursement</td>
                <td style={{ padding: '12px 15px' }}>&gt; 75% in 12th board</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px 15px', fontWeight: 600 }}>Technical / Professional (BTech/MBBS)</td>
                <td style={{ padding: '12px 15px', color: 'var(--color-green)', fontWeight: 600 }}>₹75,000</td>
                <td style={{ padding: '12px 15px' }}>Hostel fees and full academic tuition</td>
                <td style={{ padding: '12px 15px' }}>&gt; 80% in 12th + JEE/NEET rank</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 4. Skill Development Layout
  const renderSkillDevelopment = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Youth Employability Training</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          We prepare village youth for entry-level jobs in corporate sectors through soft skills, interview prep, and billing courses.
        </p>

        {/* Skill pathways */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Our Employability Pathway</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {[
            { step: "Aptitude & Communication", detail: "Spoken English, retail conversation flows, and confidence training." },
            { step: "Retail & Customer Relations", desc: "Understanding checkout points, billing protocols, and warehouse registers." },
            { step: "Job Placement Drives", desc: "Facilitating mock interviews and placing candidates directly in partner retail networks." }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--color-green)', color: 'var(--color-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>{idx + 1}</div>
              <div>
                <strong>{item.step}</strong> - <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{item.detail || item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 5. Computer Training Layout
  const renderComputerTraining = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Practical IT & Software Literacy</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Establishing high-speed computer labs to offer certification in MS Office, internet usage, and financial software.
        </p>

        {/* Course options */}
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Certified IT Course Modules</h4>
        <div className="grid-3" style={{ gap: '20px', marginBottom: '30px' }}>
          {[
            { title: "Office Basics", desc: "Word typing, spreadsheet formulas, slide design." },
            { title: "Tally Accounting", desc: "Basic bookkeeping, billing logs, and tax ledger management." },
            { title: "Web Basics", desc: "Safe browsing, emails, online forms, and typing tests." }
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

  // 6. Career Guidance Layout
  const renderCareerGuidance = () => (
    <div>
      <div className="card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.6rem', marginBottom: '20px', fontWeight: 700 }}>Adolescent Career Counselling</h3>
        <p className="about-text" style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '25px' }}>
          Rural high school students are mentored through psychometric tests and guidebooks to make informed choices.
        </p>

        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 700 }}>Counselling Elements</h4>
        <div className="grid-2" style={{ gap: '20px', marginBottom: '30px' }}>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Competency Mapping</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Assessing student interests and matching them with technical or vocational careers.</p>
          </div>
          <div className="card" style={{ padding: '20px', background: 'var(--color-white)' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Admission Support</h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Assisting candidates with college applications, fee waiver policies, and entrance preparations.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getSubpageContent = () => {
    switch (pageKey) {
      case 'child-education':
        return renderChildEducation();
      case 'digital-learning':
        return renderDigitalLearning();
      case 'scholarships':
        return renderScholarships();
      case 'skill-development':
        return renderSkillDevelopment();
      case 'computer-training':
        return renderComputerTraining();
      case 'career-guidance':
        return renderCareerGuidance();
      default:
        return renderChildEducation();
    }
  };

  const getSubpageHeader = () => {
    switch (pageKey) {
      case 'child-education':
        return { title: "Child Education Support", desc: "Uplifting Underprivileged Children through Quality Primary Education" };
      case 'digital-learning':
        return { title: "Digital Smart Classrooms", desc: "Bringing Modern Visual Learning to Government Block Schools" };
      case 'scholarships':
        return { title: "Higher Education Scholarships", desc: "Funding the Dreams of Meritorious Girls and Youth" };
      case 'skill-development':
        return { title: "Youth Skill Development", desc: "Preparing the Next Generation for Modern Industry Job Markets" };
      case 'computer-training':
        return { title: "Computer Training Programs", desc: "Bridging the Digital Divide with Practical Software Literacy" };
      case 'career-guidance':
        return { title: "Career Counselling & Guidance", desc: "Directing Rural Students towards Promising Educational Pathways" };
      default:
        return { title: "Education Programs", desc: "Empowering Lives Through Education" };
    }
  };

  const headerDetails = getSubpageHeader();

  const getFormInputs = () => {
    if (pageKey === 'scholarships') {
      return (
        <>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Last Class Score (%)</label>
            <input type="text" name="education" required value={formData.education} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="e.g. 84%" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Annual Family Income</label>
            <input type="text" name="income" required value={formData.income} onChange={handleInputChange} style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} placeholder="e.g. Under ₹2.5 Lakhs" />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="subpage-detail-layout page-education">
      {/* Subpage Hero Banner */}
      <section className="subpage-hero">
        <div className="container">
          <Link to="/education" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Education Hub
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
                  {pageKey === 'scholarships' ? 'Scholarship Application' : 'Request Program Access'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                  {pageKey === 'scholarships' ? 'Fill out the initial verification details below.' : 'Submit a request to access educational aid or smart tools.'}
                </p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Application Submitted!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our coordinator will review and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Applicant Name</label>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Details / Requirements</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="State your details..." 
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

export default EducationDetail;
