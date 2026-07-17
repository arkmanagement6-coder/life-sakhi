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

const educationData: Record<string, SubPageData> = {
  'child-education': {
    title: "Child Education Support",
    subtitle: "Uplifting Underprivileged Children through Quality Primary Education",
    description: "Our Child Education initiative works directly with children in rural areas and urban slums who have dropped out of school or cannot afford baseline learning resources. We establish non-formal learning centers, distribute books and uniforms, and run remedial bridge courses to prepare children for enrollment in mainstream government schools.",
    goals: [
      "Enroll 10,000 out-of-school children into mainstream education.",
      "Distribute 50,000 free learning kits (bags, notebooks, pens) annually.",
      "Establish 100 localized primary remedial support centers."
    ],
    achievements: [
      "Successfully main-streamed 3,400+ children into state schools.",
      "Distributed over 22,000 learning kits to date in backward districts.",
      "Operate 45 remedial classes with trained community educators."
    ],
    faqs: [
      { q: "How are children selected for support?", a: "Our field volunteers conduct door-to-door surveys in low-income clusters to identify out-of-school or vulnerable children." }
    ],
    imageText: "Child Primary Education"
  },
  'digital-learning': {
    title: "Digital Smart Classrooms",
    subtitle: "Bringing Modern Visual Learning to Government Block Schools",
    description: "We set up interactive projection smart labs and digital boards in underfunded government primary and secondary schools. By delivering animated curriculum content and educational software, we improve student retention rates and make complex scientific subjects intuitive.",
    goals: [
      "Equip 200 rural schools with interactive digital smart panels.",
      "Train 1,000 government schoolteachers in modern e-learning tools.",
      "Lower student dropout rates in partner schools by 20%."
    ],
    achievements: [
      "Successfully launched smart panels in 40 village schools.",
      "Over 12,000 students now benefit from digital audio-visual lessons daily.",
      "Conducted e-literacy training programs for 150 school educators."
    ],
    faqs: [
      { q: "What hardware is installed in smart schools?", a: "We install short-throw projectors, high-definition display smart TVs, interactive tablets, and curriculum-mapped offline memory cards." }
    ],
    imageText: "Smart Classrooms Setup"
  },
  'scholarships': {
    title: "Higher Education Scholarships",
    subtitle: "Funding the Dreams of Meritorious Girls and Youth",
    description: "Our scholarship fund offers financial grants to bright students from marginalized economic backgrounds to pursue higher secondary, engineering, medical, or vocational degree programs. We cover tuition fees, examination expenses, and hostel costs.",
    goals: [
      "Fund the college degree programs of 1,000 meritorious female students.",
      "Partner with corporate donors to establish custom scholarship seats.",
      "Provide laptops to technical scholarship awardees."
    ],
    achievements: [
      "Awarded 320 full-tuition scholarships to date.",
      "85 scholarship alumni have graduated and secured professional white-collar jobs.",
      "70% of scholarship grants are explicitly reserved for girl students."
    ],
    faqs: [
      { q: "What is the eligibility criteria for the scholarship?", a: "Candidates must have scored above 75% in 12th board exams and have a verified annual family income of less than ₹2.5 Lakhs." }
    ],
    imageText: "Academic Scholarships"
  },
  'skill-development': {
    title: "Youth Skill Development",
    subtitle: "Preparing the Next Generation for Modern Industry Job Markets",
    description: "We run dedicated skill development bootcamps for rural and urban-fringe youth. Our modules cover retail sales, hospitality, office administration, and basic engineering trades, matching them with active recruiter networks.",
    goals: [
      "Establish 10 regional skill development centers.",
      "Train 3,000 youth annually in employability skills.",
      "Secure job placement rates of 80% or higher for all trainees."
    ],
    achievements: [
      "Trained 1,400+ youth across multiple vocational disciplines.",
      "Facilitated job placements for 980 candidates in logistics and retail sectors.",
      "Partnerships established with 15 corporate hiring teams."
    ],
    faqs: [
      { q: "What is the duration of the training courses?", a: "Courses range from 3 months (retail and office admin) to 6 months (technical trades)." }
    ],
    imageText: "Vocational Skills Training"
  },
  'computer-training': {
    title: "Computer Training Programs",
    subtitle: "Bridge the Digital Divide with Practical Software Literacy",
    description: "Our Computer Training Labs provide hands-on lessons in MS Office, basic programming, internet navigation, and financial accounting software (like Tally). These certified programs prepare rural students for entry-level digital typing and billing roles.",
    goals: [
      "Train 5,000 rural youth in basic computer operations.",
      "Provide free digital typing certifications to rural women.",
      "Establish 25 fully-equipped IT computer laboratories."
    ],
    achievements: [
      "Opened 12 high-speed internet computer laboratories in rural blocks.",
      "Over 2,200 candidates certified in computer applications.",
      "Enabled 300+ village girls to work as local data-entry operators."
    ],
    faqs: [
      { q: "Are these courses certified?", a: "Yes, we issue a government-aligned Certificate of Completion in Computer Applications upon passing practical examinations." }
    ],
    imageText: "Computer Labs Setup"
  },
  'career-guidance': {
    title: "Career Counselling & Guidance",
    subtitle: "Directing Rural Students towards Promising Educational Pathways",
    description: "Rural students often drop out after high school due to a lack of awareness regarding higher studies, competitive exams, or vocational career paths. We run career counseling seminars, psychometric mapping, and test-prep consultation clinics.",
    goals: [
      "Deliver career guidance seminars to 20,000 high school students.",
      "Establish online guidance counseling portals for remote access.",
      "Distribute free career guidebooks explaining college admission pathways."
    ],
    achievements: [
      "Conducted 110 guidance sessions across high schools.",
      "Counseled 8,500+ rural adolescents face-to-face.",
      "Distributed 5,000 copies of 'Career Pathways Guide' to village youth groups."
    ],
    faqs: [
      { q: "Do you offer guidance for competitive exams?", a: "Yes, we offer counselling on civil services, banking, railways, and state level entrance examinations." }
    ],
    imageText: "Career Advice Seminars"
  }
};

const EducationDetail: React.FC = () => {
  const { subpage } = useParams<{ subpage: string }>();
  const pageKey = subpage || 'child-education';
  const data = educationData[pageKey] || educationData['child-education'];

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
          <Link to="/education" className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', marginBottom: '20px', padding: '6px 15px', fontSize: '0.8rem' }}>
            <ArrowLeft size={14} /> Back to Education Page
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
                <h4 style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '5px' }}>Scholarship / Intake Query</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>Apply for training, smart tools, or submit scholarship requests.</p>

                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(140, 198, 62, 0.08)', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--color-green)' }}>
                    <CheckCircle size={48} color="var(--color-green)" style={{ margin: '0 auto 15px auto' }} />
                    <h5 style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: '5px' }}>Application Submitted!</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Our educational coordinator will review and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Student / Applicant Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem' }} 
                        placeholder="Enter applicant's name" 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Contact Number</label>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '5px' }}>Academic / Skill Background</label>
                      <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        style={{ width: '100%', padding: '10px 15px', border: '1px solid var(--color-gray-light)', borderRadius: 'var(--border-radius-sm)', outline: 'none', fontSize: '0.9rem', resize: 'vertical' }} 
                        placeholder="Detail recent class passed, marks obtained, or school name..." 
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

export default EducationDetail;
