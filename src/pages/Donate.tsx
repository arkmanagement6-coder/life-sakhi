import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Heart, CreditCard, ShieldCheck, Gift, Award, CheckCircle } from 'lucide-react';

const Donate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialProgram = searchParams.get('program') || searchParams.get('project') || searchParams.get('campaign') || 'general';

  const [program, setProgram] = useState(initialProgram);
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxReceipt, setTaxReceipt] = useState(false);
  const [pan, setPan] = useState('');
  
  // Payment simulation states
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  const finalAmount = amount === 'custom' ? customAmount : amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please specify a valid donation amount.");
      return;
    }
    
    setIsPaying(true);

    // Simulate payment gateway delay (e.g. Razorpay/Stripe)
    setTimeout(() => {
      setIsPaying(false);
      setPaymentDone(true);
      setReceiptNumber("RECEIPT-LCT-" + Math.floor(100000 + Math.random() * 900000));
    }, 2000);
  };

  const programs = [
    { code: "general", name: "General Donation (Unrestricted)" },
    { code: "education", name: "Sponsor Child Education (textbooks, fees)" },
    { code: "girl_child", name: "Sponsor Girl Child (scholarships & counseling)" },
    { code: "healthcare", name: "Sponsor Healthcare (medical camps & pad kits)" },
    { code: "csr", name: "CSR Partnership & Grants" },
    { code: "monthly", name: "Monthly Recurring Support" },
    { code: "emergency", name: "Emergency Disaster Relief" }
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header-title">Support Our Cause</h1>
          <div className="page-breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Donate</span>
          </div>
        </div>
      </div>

      <section className="section-padding" style={{ background: 'var(--color-light-gray)' }}>
        <div className="container">
          {paymentDone ? (
            <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--color-white)', borderRadius: 'var(--border-radius-lg)', padding: '40px', textAlign: 'center', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-gray-light)' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <CheckCircle size={40} />
              </div>
              <h2 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Thank You For Your Support!</h2>
              <p style={{ color: 'var(--color-muted)', marginBottom: '25px' }}>
                Your donation of **₹{Number(finalAmount).toLocaleString()}** has been successfully recorded. An official receipt has been sent to your email.
              </p>
              
              <div style={{ background: 'var(--color-light-gray)', padding: '20px', borderRadius: 'var(--border-radius-md)', textAlign: 'left', marginBottom: '30px', fontSize: '0.9rem' }}>
                <div style={{ marginBottom: '8px' }}><strong>Receipt No:</strong> {receiptNumber}</div>
                <div style={{ marginBottom: '8px' }}><strong>Donor Name:</strong> {name}</div>
                <div style={{ marginBottom: '8px' }}><strong>Sponsorship Pillar:</strong> {programs.find(p => p.code === program)?.name || program}</div>
                {taxReceipt && <div><strong>80G Benefit Claimed:</strong> PAN - {pan}</div>}
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button onClick={() => setPaymentDone(false)} className="btn btn-primary">Donate Again</button>
                <Link to="/" className="btn btn-outline">Back to Home</Link>
              </div>
            </div>
          ) : (
            <div className="grid-2" style={{ alignItems: 'flex-start' }}>
              {/* Trust Details */}
              <div>
                <span className="section-subtitle">Tax Deductions Available</span>
                <h2 className="section-title">Support With Confidence</h2>
                <p className="about-text">
                  All donations made to the **Life Changing Educational & Charitable Trust** are tax-exempt under Section 80G of the Income Tax Act. We stand for complete transparency and report disbursements annually.
                </p>

                <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>80G & 12A Certified</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Claim tax exemption. Receipts are generated instantly upon clearance.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>100% Encrypted transactions</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Secure payment processing with standard SSL gateways.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: 'var(--border-radius-sm)', background: 'var(--color-white)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', flexShrink: 0 }}>
                      <Gift size={24} />
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>Direct Impact</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Receive periodic progress emails, photographs, and school reports of beneficiaries.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              <div style={{ background: 'var(--color-white)', padding: '40px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-gray-light)', width: '100%' }}>
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={20} fill="var(--color-primary)" />
                  <span>Donation Details</span>
                </h3>
                
                <form onSubmit={handleSubmit}>
                  {/* Select Program */}
                  <div className="form-group">
                    <label className="form-label">Select Campaign / Program</label>
                    <select 
                      value={program} 
                      onChange={(e) => setProgram(e.target.value)} 
                      className="form-control form-select"
                    >
                      {programs.map((p) => (
                        <option key={p.code} value={p.code}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Choose Amount */}
                  <div className="form-group">
                    <label className="form-label">Select Donation Amount (₹)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
                      {['500', '1000', '2500', '5000'].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`btn ${amount === amt ? 'btn-primary' : 'btn-outline'}`}
                          style={{ padding: '8px', fontSize: '0.85rem' }}
                          onClick={() => {
                            setAmount(amt);
                            setCustomAmount('');
                          }}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className={`btn ${amount === 'custom' ? 'btn-primary' : 'btn-outline'}`}
                      style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginBottom: '12px' }}
                      onClick={() => setAmount('custom')}
                    >
                      Custom Amount
                    </button>

                    {amount === 'custom' && (
                      <input
                        type="number"
                        placeholder="Enter customized amount (₹)"
                        className="form-control"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        required
                      />
                    )}
                  </div>

                  {/* Personal details */}
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="grid-2" style={{ gap: '15px' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input type="tel" className="form-control" placeholder="+91 99999 99999" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>

                  {/* Tax Exemption Section */}
                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                    <input 
                      type="checkbox" 
                      id="tax-chk" 
                      checked={taxReceipt} 
                      onChange={(e) => setTaxReceipt(e.target.checked)} 
                      style={{ width: '16px', height: '16px' }}
                    />
                    <label htmlFor="tax-chk" style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                      I want a tax exemption receipt under Section 80G
                    </label>
                  </div>

                  {taxReceipt && (
                    <div className="form-group">
                      <label className="form-label">PAN Number</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="ABCDE1234F" 
                        value={pan} 
                        onChange={(e) => setPan(e.target.value.toUpperCase())} 
                        maxLength={10}
                        required 
                      />
                    </div>
                  )}

                  {/* Donate Button */}
                  <button type="submit" className="btn btn-secondary" style={{ width: '100%', marginTop: '15px', display: 'flex', gap: '10px' }} disabled={isPaying}>
                    <CreditCard size={18} />
                    <span>{isPaying ? "Processing Gateway..." : `Donate ₹${Number(finalAmount || 0).toLocaleString()}`}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Donate;
