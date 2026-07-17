import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, BookOpen, Briefcase, Award, Shield, CheckCircle, 
  Users, FileText, HelpCircle, 
  ChevronDown, ChevronUp, Play, ArrowRight, Activity 
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  
  // State for FAQ Accordion
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // State for Gallery Filter
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'photo' | 'video' | 'campaign'>('all');

  // Animated Impact Counter Simulation
  const [counts, setCounts] = useState({
    women: 0,
    camps: 0,
    schools: 0,
    volunteers: 0,
    districts: 0,
    beneficiaries: 0
  });

  useEffect(() => {
    const target = {
      women: 2000,
      camps: 150,
      schools: 85,
      volunteers: 520,
      districts: 104,
      beneficiaries: 65000
    };

    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts({
        women: Math.floor((target.women / steps) * step),
        camps: Math.floor((target.camps / steps) * step),
        schools: Math.floor((target.schools / steps) * step),
        volunteers: Math.floor((target.volunteers / steps) * step),
        districts: Math.floor((target.districts / steps) * step),
        beneficiaries: Math.floor((target.beneficiaries / steps) * step)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const focusAreas = [
    { icon: <Activity />, title: "Healthcare", desc: "Medical camps, nutrition distribution, and local health volunteer networks." },
    { icon: <BookOpen />, title: "Education", desc: "Providing scholarships, digital literacy, school support, and girls' counseling." },
    { icon: <Briefcase />, title: "Women Employment", desc: "Self Help Group training, micro-business loans, and sanitary pad packaging jobs." },
    { icon: <Award />, title: "Women Empowerment", desc: "Life Sakhi sanitary pad distribution, spreading menstruation awareness." },
    { icon: <Heart />, title: "Nutrition Program", desc: "Distributing protein supplements, vitamins, and healthy food kits in rural areas." },
    { icon: <Shield />, title: "Sanitary Pad Distribution", desc: "Door-to-door hygiene support by trained state and block coordinators." },
    { icon: <Users />, title: "Medical Camps", desc: "Free consultations, generic medicines, and health checkups by expert doctors." },
    { icon: <FileText />, title: "Digital Education", desc: "Computer labs in village schools, adult digital literacy classes." }
  ];

  const benefits = [
    { title: "Skill Development", desc: "Comprehensive training in packaging, accounts, hygiene protocols, and marketing." },
    { title: "Direct Livelihood", desc: "Earn commissions as a Women Distributor or manage blocks as a Coordinator." },
    { title: "Health Kits Access", desc: "Free monthly sanitization and hygiene kits for distributors and their families." },
    { title: "Community Leadership", desc: "Distributors become the health guides ('Sakhis') of their local neighborhoods." }
  ];

  const projects = [
    {
      title: "Project Life Sakhi Hygiene Drive",
      desc: "Distributing 100,000 biodegradable pads and holding Menstrual Hygiene seminars across 50 districts.",
      raised: 750000,
      goal: 1000000,
      image: "/assets/project1.jpg"
    },
    {
      title: "Rural Smart Classrooms Setup",
      desc: "Equipping 20 rural primary schools with projectors, internet connections, and digital learning modules.",
      raised: 420000,
      goal: 600000,
      image: "/assets/project2.jpg"
    },
    {
      title: "Village Women Micro-Entrepreneurship",
      desc: "Providing seed capital and training to 100 self-help groups to start home-based sewing businesses.",
      raised: 550000,
      goal: 550000, // Completed
      image: "/assets/project3.jpg"
    }
  ];

  const galleryItems = [
    { id: 1, type: 'photo', category: 'campaign', url: '/assets/gal_cam1.jpg', title: 'Hygiene Kit Distribution' },
    { id: 2, type: 'photo', category: 'health_camp', url: '/assets/gal_hc1.jpg', title: 'Medical Camp Checkup' },
    { id: 3, type: 'photo', category: 'campaign', url: '/assets/gal_cam2.jpg', title: 'Women SHG Training' },
    { id: 4, type: 'video', category: 'general', url: '/assets/gal_v1.jpg', title: 'Life Sakhi Launch Event' },
    { id: 5, type: 'photo', category: 'education', url: '/assets/gal_ed1.jpg', title: 'Smart Class Launch' },
    { id: 6, type: 'photo', category: 'health_camp', url: '/assets/gal_hc2.jpg', title: 'Menstruation Seminar' },
    { id: 7, type: 'video', category: 'campaign', url: '/assets/gal_v2.jpg', title: 'Distributor Feedback' },
    { id: 8, type: 'photo', category: 'education', url: '/assets/gal_ed2.jpg', title: 'Digital Lab Session' }
  ];

  const filteredGallery = galleryFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === galleryFilter || item.category === galleryFilter);

  const faqs = [
    { q: "What is the Life Sakhi Initiative?", a: "Life Sakhi is a dedicated women's health and empowerment initiative under our Trust. It focuses on making premium-quality sanitary pads accessible to rural women at subsidized costs, while establishing local women as distributors to generate micro-employment." },
    { q: "How can I apply to become a District or State Coordinator?", a: "You can apply directly via the 'Become Partner' forms on our Contact page or register. Our management board reviews applications based on location, experience, and dedication. Once approved, training and startup kits are provided." },
    { q: "Are donations to the Trust tax-exempt?", a: "Yes, all donations made to the Life Changing Educational & Charitable Trust are eligible for tax deductions under Section 80G of the Income Tax Act. Receipts and certificates are issued automatically." },
    { q: "How does the Women Employment Program work?", a: "We train rural women (Distributors/Sakhis) in hygiene advocacy and product distribution. They sell biodegradable sanitary pads in their villages, keeping a healthy commission margin, thereby securing an independent livelihood." }
  ];

  const partners = [
    { name: "Partner 1", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=HDFC+CSR" },
    { name: "Partner 2", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=TATA+Trust" },
    { name: "Partner 3", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=Apollo+Hosp" },
    { name: "Partner 4", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=Rotary+Int" },
    { name: "Partner 5", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=State+Bank" },
    { name: "Partner 6", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=Dabur+CSR" },
    { name: "Partner 7", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=Red+Cross" },
    { name: "Partner 8", logo: "https://placehold.co/200x80/ffffff/0a3c8c?text=UNICEF+India" }
  ];

  return (
    <div>
      {/* 1. HERO SLIDER */}
      <HeroSlider />
      {/* 2. ABOUT TRUST */}
      <section className="section-padding about-trust-section">
        <div className="container">
          <div className="grid-2">
            <div className="about-image-wrapper">
              <img 
                src="/assets/about_trust.jpg" 
                alt="Trust Activities" 
                className="about-image" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x480/0a3c8c/ffffff?text=About+Our+Trust";
                }}
              />
              <div className="experience-badge">
                <h3>4+</h3>
                <p>Years of Service</p>
              </div>
            </div>
            <div>
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Life Changing Educational & Charitable Trust</h2>
              <p className="about-text">
                Life Changing Educational & Charitable Trust is a registered, CSR-certified non-profit organization working for quality child education, rural healthcare access, women employment, and social welfare. Over the past four years, we have touched thousands of lives through localized interventions and community campaigns.
              </p>
              <p className="about-text" style={{ fontWeight: 500, color: 'var(--color-primary)' }}>
                In 2026, we proudly launched the <strong>Life Sakhi</strong> brand, aiming to ensure menstrual hygiene awareness and premium, affordable sanitary pads reach every woman across rural and semi-urban India.
              </p>
              <div className="about-stats">
                <div className="stat-box">
                  <div className="stat-number">4+</div>
                  <div className="stat-label">Years Impact</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">2000+</div>
                  <div className="stat-label">Working Women</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Districts Covered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOCUS AREAS */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Our Mission Pillars</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Areas of Focus</h2>
          <div className="grid-4">
            {focusAreas.map((area, i) => (
              <div className="card" key={i} style={{ textAlign: 'left' }}>
                <div className="card-icon">{area.icon}</div>
                <h3 className="card-title">{area.title}</h3>
                <p className="card-desc">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIFE SAKHI SHOWCASE */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="life-sakhi-banner">
            <div className="grid-2">
              <div className="life-sakhi-img-wrapper">
                <img 
                  src="/assets/life_sakhi_banner.jpg" 
                  alt="Life Sakhi Sanitary Pads" 
                  className="life-sakhi-banner-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x500/8cc63e/ffffff?text=Life+Sakhi+Sanitary+Pads";
                  }}
                />
              </div>
              <div className="life-sakhi-content">
                <span className="section-subtitle" style={{ color: 'var(--color-light-green)' }}>Our Core Brand</span>
                <h2 className="life-sakhi-title">Life Sakhi Initiative</h2>
                <h3 className="life-sakhi-subtitle">Har Mahila Ki Sehat Ka Saathi</h3>
                <p style={{ marginBottom: '25px', opacity: 0.9, fontSize: '1.05rem' }}>
                  A dedicated women’s health campaign providing certified, high-absorbent, skin-friendly biodegradable sanitary pads. We distribute these packs through our vast network of local women distributors and community centers, raising standard-of-living and health safety.
                </p>
                <ul className="life-sakhi-list">
                  <li className="life-sakhi-list-item">
                    <CheckCircle className="life-sakhi-list-icon" size={18} />
                    <span>Subsidized price (INR 35) per package of 8 pads</span>
                  </li>
                  <li className="life-sakhi-list-item">
                    <CheckCircle className="life-sakhi-list-icon" size={18} />
                    <span>100% Biodegradable & chemical-free material</span>
                  </li>
                  <li className="life-sakhi-list-item">
                    <CheckCircle className="life-sakhi-list-icon" size={18} />
                    <span>Generates micro-income of Rs. 4,000-8,000/month for rural women</span>
                  </li>
                </ul>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Link to="/women-empowerment" className="btn btn-secondary">Learn More</Link>
                  <Link to="/register?role=women_distributor" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Apply as Sakhi</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACT STATS */}
      <section className="counters-section">
        <div className="container">
          <div className="counter-grid">
            <div className="counter-item">
              <h3>{counts.women}+</h3>
              <p>Women Working</p>
            </div>
            <div className="counter-item">
              <h3>{counts.camps}+</h3>
              <p>Health Camps</p>
            </div>
            <div className="counter-item">
              <h3>{counts.schools}+</h3>
              <p>Schools Supported</p>
            </div>
            <div className="counter-item">
              <h3>{counts.volunteers}+</h3>
              <p>Active Volunteers</p>
            </div>
            <div className="counter-item">
              <h3>{counts.districts}+</h3>
              <p>Districts Covered</p>
            </div>
            <div className="counter-item">
              <h3>{counts.beneficiaries.toLocaleString()}+</h3>
              <p>Beneficiaries</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Our Integrity</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '45px' }}>Why Choose Us</h2>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>Verified Trust</h3>
              <p className="card-desc">Fully registered NGO with valid 12A, 80G, and CSR-1 registration. Compliance reports are filed on time yearly.</p>
            </div>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>100% Transparent</h3>
              <p className="card-desc">Every donation rupee is tracked and published in annual audit sheets. Donors receive progress updates on sponsored children.</p>
            </div>
            <div className="card">
              <h3 className="card-title" style={{ color: 'var(--color-primary)' }}>Women-Led Innovation</h3>
              <p className="card-desc">Our distribution framework puts decision-making directly in the hands of women block and district coordinators.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WOMEN EMPLOYMENT PROGRAM */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle">Women Empowerment</span>
              <h2 className="section-title">Women's Employment Program</h2>
              <p className="about-text">
                Our Livelihood initiative empowers rural women by setting up self-employment units. We train women in manufacturing, sanitizing, and distributing healthcare products like pads, masks, and soaps, securing financial freedom.
              </p>
              
              <div style={{ marginTop: '30px' }}>
                {benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(140,198,62,0.1)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '4px' }}>{benefit.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="/assets/women_working.jpg" 
                alt="Women Working" 
                style={{ borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', width: '100%', height: '450px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x450/0a3c8c/ffffff?text=Women+Working";
                }}
              />
            </div>
          </div>

          {/* Timeline steps */}
          <div className="timeline-container">
            <div className="timeline-item timeline-item-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Step 1: Skill Training</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Free 7-day hygiene advocacy & financial literacy training camps.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-right">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Step 2: Startup Kit Disbursal</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Recieve marketing banners, inventory ledger, and initial 50 packages.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-left">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Step 3: Area Activation</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Hold awareness camps in neighborhood schools and self-help meetings.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item-right">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '5px' }}>Step 4: Micro Income Growth</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Submit sales record via portal and earn performance bonuses monthly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HEALTHCARE AWARENESS */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Preventive Healthcare</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '20px' }}>Healthcare & Hygiene Awareness</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 40px auto', color: 'var(--color-muted)' }}>
            We educate rural populations on critical health issues, sanitary safety, correct nutrition standards, and preventive diagnostics.
          </p>

          <div className="awareness-grid">
            <div className="awareness-card">
              <img src="/assets/health_menstrual.jpg" className="awareness-img" alt="Menstrual Hygiene" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/0a3c8c/ffffff?text=Menstrual+Hygiene"; }} />
              <div className="awareness-info" style={{ textAlign: 'left' }}>
                <span className="awareness-tag">Hygiene</span>
                <h4 style={{ marginBottom: '8px' }}>Menstrual Hygiene</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Eradicating taboos by teaching school girls scientific facts of menstrual cycles.</p>
              </div>
            </div>
            <div className="awareness-card">
              <img src="/assets/health_nutrition.jpg" className="awareness-img" alt="Nutrition" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/8cc63e/ffffff?text=Nutrition+Support"; }} />
              <div className="awareness-info" style={{ textAlign: 'left' }}>
                <span className="awareness-tag">Diet</span>
                <h4 style={{ marginBottom: '8px' }}>Nutrition Planning</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Tackling child malnutrition and iron deficiency with nutrient supplements.</p>
              </div>
            </div>
            <div className="awareness-card">
              <img src="/assets/health_pcod.jpg" className="awareness-img" alt="PCOD Wellness" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/0a3c8c/ffffff?text=PCOD+Wellness"; }} />
              <div className="awareness-info" style={{ textAlign: 'left' }}>
                <span className="awareness-tag">Wellness</span>
                <h4 style={{ marginBottom: '8px' }}>PCOD & Women Wellness</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Expert consultations on polycystic ovary syndromes, diet, and stress management.</p>
              </div>
            </div>
            <div className="awareness-card">
              <img src="/assets/health_anemia.jpg" className="awareness-img" alt="Anemia" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x200/8cc63e/ffffff?text=Anemia+Prevention"; }} />
              <div className="awareness-info" style={{ textAlign: 'left' }}>
                <span className="awareness-tag">Prevention</span>
                <h4 style={{ marginBottom: '8px' }}>Anemia Eradication</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Testing hemoglobin and giving green vegetable charts and iron tablets in villages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LATEST PROJECTS / CAMPAIGNS */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '45px' }}>
            <div>
              <span className="section-subtitle">Active Crowdfunding</span>
              <h2 className="section-title" style={{ paddingBottom: '0', margin: '0' }}>Ongoing Projects & Campaigns</h2>
            </div>
            <Link to="/projects" className="btn btn-outline">
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {projects.map((project, i) => {
              const progressPct = Math.round((project.raised / project.goal) * 100);
              return (
                <div className="card" key={i} style={{ padding: '0', overflow: 'hidden' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x220/0a3c8c/ffffff?text=Project+${i+1}`;
                    }}
                  />
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '10px' }}>{project.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>{project.desc}</p>
                    
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '6px' }}>
                        <span>Raised: ₹{project.raised.toLocaleString()}</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--color-gray-light)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--color-green)' }}></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '4px' }}>
                        <span>Goal: ₹{project.goal.toLocaleString()}</span>
                      </div>
                    </div>

                    <Link to={`/donate?project=${encodeURIComponent(project.title)}`} className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                      <Heart size={14} fill="white" />
                      <span>Donate to Support</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BECOME PART OF OUR MISSION (Call-To-Action) */}
      <section className="section-padding" style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle" style={{ color: 'var(--color-light-green)' }}>Join the Movement</span>
          <h2 className="section-title" style={{ color: 'var(--color-white)', display: 'inline-block', marginBottom: '45px' }}>Become Part Of Our Mission</h2>
          <div className="grid-3" style={{ textAlign: 'left' }}>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: 'var(--color-light-green)', marginBottom: '8px' }}>Become a Volunteer</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: '20px' }}>Use your skills (counseling, photography, health support) to help coordinate camps or school distribution drives.</p>
              <Link to="/contact?type=volunteer" className="btn btn-secondary" style={{ width: '100%' }}>Apply Now</Link>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: 'var(--color-light-green)', marginBottom: '8px' }}>Become a Coordinator</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: '20px' }}>Manage state, district, or block level inventory distribution. Lead the team of women distributors in your region.</p>
              <Link to="/register?role=district_coordinator" className="btn btn-secondary" style={{ width: '100%' }}>Apply Now</Link>
            </div>
            <div className="card" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: 'var(--color-light-green)', marginBottom: '8px' }}>Women Distributor (Sakhi)</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', marginBottom: '20px' }}>Earn a steady livelihood by supplying pads and leading sanitary education drives in your residential colony.</p>
              <Link to="/register?role=women_distributor" className="btn btn-secondary" style={{ width: '100%' }}>Apply Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 14. INTERACTIVE GALLERY */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Visual Highlights</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '30px' }}>Our Gallery</h2>
          
          <div className="gallery-filters">
            <button className={`btn ${galleryFilter === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGalleryFilter('all')} style={{ padding: '8px 18px', fontSize: '0.8rem' }}>All Media</button>
            <button className={`btn ${galleryFilter === 'photo' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGalleryFilter('photo')} style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Photos</button>
            <button className={`btn ${galleryFilter === 'video' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGalleryFilter('video')} style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Videos</button>
            <button className={`btn ${galleryFilter === 'campaign' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setGalleryFilter('campaign')} style={{ padding: '8px 18px', fontSize: '0.8rem' }}>Campaigns</button>
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <div className="gallery-card" key={item.id}>
                <img src={item.url} alt={item.title} onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x300/0a3c8c/ffffff?text=${encodeURIComponent(item.title)}`; }} />
                <div className="gallery-overlay">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.title}</span>
                    {item.type === 'video' && <Play size={18} fill="white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. FAQs SECTION */}
      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <span className="section-subtitle">Common Queries</span>
            <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '20px' }}>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`} 
                key={index}
              >
                <div 
                  className="faq-header" 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                    <span>{faq.q}</span>
                  </div>
                  {activeFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                {activeFaq === index && (
                  <div className="faq-content">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. PARTNERS LOGO CAROUSEL */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Our Sponsors & Benefactors</span>
          <h2 className="section-title" style={{ display: 'inline-block', marginBottom: '40px' }}>Sponsors & NGO Partners</h2>
          <div className="scrolling-logos-wrapper">
            <div className="scrolling-logos">
              {/* Duplicate the array to create seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div className="partner-logo-container" key={index}>
                  <img src={partner.logo} alt={partner.name} className="partner-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
