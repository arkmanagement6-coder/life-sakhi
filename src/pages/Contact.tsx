import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'query';

  const [formType, setFormType] = useState(initialType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('volunteer');
  const [region, setRegion] = useState('');
  const [experience, setExperience] = useState('');

  // Ticket submission states
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTicketNumber("TICKET-LCT-" + Math.floor(100000 + Math.random() * 900000));
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setRegion('');
    setExperience('');
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Contact & Registrations</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            {/* Contact details */}
            <div>
              <span className="section-subtitle">Reach Us Directly</span>
              <h2 className="section-title">Get in Touch</h2>
              <p className="about-text" style={{ marginBottom: '35px' }}>
                For general queries, legal document inquiries, or dashboard support, please use the contact form. Our administrative team will reach back within 24 working hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>Head Office Address</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Plot 45, LGF, Sector-5, Rohini, New Delhi, India 110085</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>Helpline & Support</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>+91 98765 43210 (Mon-Sat: 9am - 6pm)</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>Email Contact</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>info@lifechangingtrust.org / support@lifechangingtrust.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive forms wrapper */}
            <div style={{ background: 'var(--color-white)', padding: '40px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-gray-light)', width: '100%' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                    <CheckCircle size={30} />
                  </div>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Application / Query Submitted!</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
                    Thank you. Your message has been successfully logged. Our board reviews submissions daily.
                  </p>
                  <div style={{ background: 'var(--color-light-gray)', padding: '15px', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', textAlign: 'left', marginBottom: '25px' }}>
                    <div><strong>Ticket Number:</strong> {ticketNumber}</div>
                    <div><strong>Name:</strong> {name}</div>
                    <div><strong>Email:</strong> {email}</div>
                  </div>
                  <button onClick={handleReset} className="btn btn-primary" style={{ width: '100%' }}>Submit Another Form</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '8px' }}>
                    <button className={`btn ${formType === 'query' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFormType('query')} style={{ padding: '8px 16px', fontSize: '0.75rem', flexShrink: 0 }}>General Query</button>
                    <button className={`btn ${formType === 'volunteer' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFormType('volunteer')} style={{ padding: '8px 16px', fontSize: '0.75rem', flexShrink: 0 }}>Become Volunteer/Partner</button>
                    <button className={`btn ${formType === 'complaint' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setFormType('complaint')} style={{ padding: '8px 16px', fontSize: '0.75rem', flexShrink: 0 }}>Feedback / Complaint</button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Common fields */}
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="grid-2" style={{ gap: '15px' }}>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                      </div>
                    </div>

                    {/* Form specific fields */}
                    {formType === 'query' && (
                      <>
                        <div className="form-group">
                          <label className="form-label">Subject</label>
                          <input type="text" className="form-control" placeholder="How can I partner?" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Message / Query</label>
                          <textarea className="form-control" rows={4} placeholder="Write your message here..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        </div>
                      </>
                    )}

                    {formType === 'volunteer' && (
                      <>
                        <div className="grid-2" style={{ gap: '15px' }}>
                          <div className="form-group">
                            <label className="form-label">Role Applying For</label>
                            <select className="form-control form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                              <option value="volunteer">Volunteer Advocate</option>
                              <option value="partner_ngo">Grassroots NGO Partner</option>
                              <option value="corporate_csr">Corporate CSR Partner</option>
                              <option value="coordinator_block">Block Mobilizer</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Target State / District</label>
                            <input type="text" className="form-control" placeholder="Haryana (Rohtak)" value={region} onChange={(e) => setRegion(e.target.value)} required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Brief Experience / Motivation</label>
                          <textarea className="form-control" rows={3} placeholder="Tell us why you want to join and any social service background..." value={experience} onChange={(e) => setExperience(e.target.value)} required></textarea>
                        </div>
                      </>
                    )}

                    {formType === 'complaint' && (
                      <>
                        <div className="form-group">
                          <label className="form-label">Ticket Category</label>
                          <select className="form-control form-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
                            <option value="Feedback">General Portal Feedback</option>
                            <option value="Complaint-Pads">Life Sakhi pad stock delay</option>
                            <option value="Complaint-Receipt">Donation tax receipt issue</option>
                            <option value="Complaint-Staff">Coordinator conduct report</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Description of Complaint / Suggestion</label>
                          <textarea className="form-control" rows={4} placeholder="Describe the concern in detail so our audit team can review..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        </div>
                      </>
                    )}

                    <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <Send size={16} />
                      <span>Submit Form</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
