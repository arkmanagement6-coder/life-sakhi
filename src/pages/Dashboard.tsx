import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Users, ShoppingBag, DollarSign, Truck, ClipboardList, 
  MapPin, ShieldAlert, Award, FileText, Download, Calendar, Activity, 
  Heart, LogOut, Check, X
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Common forms state
  const [sakhiOrder, setSakhiOrder] = useState({ quantity: '100', block: 'Rohtak', notes: '' });
  const [salesLog, setSalesLog] = useState({ date: new Date().toISOString().split('T')[0], packs: '5', earnings: '60', buyer: 'Individual' });
  const [campForm, setCampForm] = useState({ date: '', location: '', specialist: '', doctorsRequired: '2' });
  const [diagnosticsForm, setDiagnosticsForm] = useState({ patientName: '', age: '', symptom: 'Anemia', prescription: '', referralRequired: 'No' });

  if (!userProfile) {
    return <Navigate to="/login" replace />;
  }

  const role = userProfile.role || 'user';
  const name = userProfile.displayName || 'Trust Member';
  const email = userProfile.email || '';
  const phone = userProfile.phone || '';

  const handleInputChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setter((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  // 1. Women Distributor (Life Sakhi) Dashboard
  const renderDistributorDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-4" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Packs Distributed</span>
            <ShoppingBag size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>320 Packs</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Earnings</span>
            <DollarSign size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>₹3,840</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Current Stock</span>
            <ClipboardList size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>45 Packs</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Next Shipment Status</span>
            <Truck size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-green)', fontWeight: 700, margin: '15px 0 0 0' }}>In Transit (ETA: 2 Days)</h3>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
        {/* Order Stock Form */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Order Sanitary Pad Stock</h4>
          {formSubmitted ? (
            <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
              Stock Request Submitted Successfully to Block Coordinator!
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Quantity (Packets)</label>
                <select name="quantity" value={sakhiOrder.quantity} onChange={handleInputChange(setSakhiOrder)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                  <option value="50">50 Packs (Subsidized Price: ₹1,250)</option>
                  <option value="100">100 Packs (Subsidized Price: ₹2,300)</option>
                  <option value="200">200 Packs (Subsidized Price: ₹4,000)</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Block Area</label>
                <input type="text" name="block" required value={sakhiOrder.block} onChange={handleInputChange(setSakhiOrder)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Delivery Notes / Directions</label>
                <textarea name="notes" rows={3} value={sakhiOrder.notes} onChange={handleInputChange(setSakhiOrder)} placeholder="Provide special instructions..." style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px', resize: 'none' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>Request Stock</button>
            </form>
          )}
        </div>

        {/* Enter Daily Sales Log */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Log Daily Sales Records</h4>
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Date of Sales</label>
              <input type="date" name="date" required value={salesLog.date} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Packs Sold</label>
                <input type="number" name="packs" required value={salesLog.packs} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Total Earned (₹)</label>
                <input type="number" name="earnings" required value={salesLog.earnings} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Buyer Distribution Channel</label>
              <select name="buyer" value={salesLog.buyer} onChange={handleInputChange(setSalesLog)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                <option value="Individual">Individual Village Women</option>
                <option value="School">Schoolgirls Drive</option>
                <option value="SHG">Self Help Group Cooperative</option>
              </select>
            </div>
            <button type="submit" className="btn btn-secondary" style={{ padding: '10px' }}>Log Sales Record</button>
          </form>
        </div>
      </div>

      {/* Sales Ledger */}
      <div className="card" style={{ padding: '30px' }}>
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Recent Sales & Commission Logs</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Packs Sold</th>
                <th style={{ padding: '12px' }}>Commission Margin</th>
                <th style={{ padding: '12px' }}>Total Profit</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px' }}>15 July 2026</td>
                <td style={{ padding: '12px' }}>15 Packs</td>
                <td style={{ padding: '12px' }}>₹12 per pack</td>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-green)' }}>₹180</td>
                <td style={{ padding: '12px' }}><span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Received</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px' }}>12 July 2026</td>
                <td style={{ padding: '12px' }}>30 Packs</td>
                <td style={{ padding: '12px' }}>₹12 per pack</td>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--color-green)' }}>₹360</td>
                <td style={{ padding: '12px' }}><span style={{ background: 'rgba(140, 198, 62, 0.1)', color: 'var(--color-green)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>Received</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 2. Block Coordinator Dashboard
  const renderBlockCoordinatorDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-4" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Sakhis Supervised</span>
            <Users size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>24 Sakhis</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Block Inventory</span>
            <ClipboardList size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>1,500 Packs</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Pending Approvals</span>
            <ShieldAlert size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>3 Orders</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Block Sales This Month</span>
            <Activity size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>420 Packs</h3>
        </div>
      </div>

      {/* Pending Orders to Approve */}
      <div className="card" style={{ padding: '30px' }}>
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Approve Sakhis Stock Orders</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { id: 1, name: "Savitri Devi", qty: "100 Packs", date: "16 July 2026", area: "Gorakhpur Block A" },
            { id: 2, name: "Kiran Sharma", qty: "50 Packs", date: "15 July 2026", area: "Gorakhpur Block B" }
          ].map((order) => (
            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{order.name}</h5>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Request: <strong>{order.qty}</strong> | Area: {order.area} | Date: {order.date}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => alert("Approved Savitri Devi Stock")}>
                  <Check size={14} /> Approve
                </button>
                <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'red', borderColor: 'red' }}>
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sakhis directory */}
      <div className="card" style={{ padding: '30px' }}>
        <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Active Sakhis Inventory Directory</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--color-primary)', color: 'var(--color-white)' }}>
                <th style={{ padding: '12px' }}>Sakhi Name</th>
                <th style={{ padding: '12px' }}>Mobile Phone</th>
                <th style={{ padding: '12px' }}>Assigned Area</th>
                <th style={{ padding: '12px' }}>Current Stock</th>
                <th style={{ padding: '12px' }}>Last Sales Log</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Savitri Devi</td>
                <td style={{ padding: '12px' }}>+91 98765 43210</td>
                <td style={{ padding: '12px' }}>Block A Center</td>
                <td style={{ padding: '12px', fontWeight: 700, color: 'red' }}>5 Packs</td>
                <td style={{ padding: '12px' }}>14 July 2026 (12 packs)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--color-gray-light)', background: '#f9f9f9' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Kiran Sharma</td>
                <td style={{ padding: '12px' }}>+91 87654 32109</td>
                <td style={{ padding: '12px' }}>Block B Center</td>
                <td style={{ padding: '12px', fontWeight: 700, color: 'var(--color-green)' }}>80 Packs</td>
                <td style={{ padding: '12px' }}>12 July 2026 (18 packs)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 3. District / State Coordinator Dashboard
  const renderDistrictCoordinatorDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-4" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Supervised Blocks</span>
            <MapPin size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>8 Blocks</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Active District Sakhis</span>
            <Users size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>128 Sakhis</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Central Warehouse Stock</span>
            <ClipboardList size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>8,500 Packs</h3>
        </div>
        <div className="card" style={{ padding: '20px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Camp Budgets Approved</span>
            <DollarSign size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>₹1.2 Lakhs</h3>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
        {/* Schedule Camp Form */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Schedule Free Medical Camp Site</h4>
          {formSubmitted ? (
            <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
              Free Medical Camp Scheduled & Registered Successfully!
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Camp Target Date</label>
                <input type="date" name="date" required value={campForm.date} onChange={handleInputChange(setCampForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Village Site Location</label>
                <input type="text" name="location" required value={campForm.location} onChange={handleInputChange(setCampForm)} placeholder="e.g. Village Choupal, Rohtak Block C" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Target Specialists</label>
                <input type="text" name="specialist" required value={campForm.specialist} onChange={handleInputChange(setCampForm)} placeholder="e.g. Pediatricians, Gynecologists" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>Register Camp Site</button>
            </form>
          )}
        </div>

        {/* Recruitment & Applicant Review Panel */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Coordinators / Sakhi Applicants</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { id: 1, name: "Kusum Latha", role: "Sakhi", loc: "Rohtak Village 3", experience: "Social Volunteer" },
              { id: 2, name: "Ramesh Kumar", role: "Block Coordinator", loc: "Jaipur Block B", experience: "2 Years NGO Management" }
            ].map((applicant) => (
              <div key={applicant.id} style={{ borderBottom: '1px solid var(--color-gray-light)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{applicant.name}</h5>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(10, 60, 140, 0.1)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>{applicant.role}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: '4px 0' }}>Location: {applicant.loc} | Background: {applicant.experience}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={() => alert("Approved Kusum Latha Profile")}>Approve</button>
                  <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'red', borderColor: 'red' }}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 4. Donor & CSR Partner Dashboard
  const renderDonorDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-3" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Total Contributed</span>
            <Heart size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>₹1,50,000</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Smart Schools Funded</span>
            <Award size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>3 Smart Labs</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>80G Tax Exemption Saved</span>
            <FileText size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>₹75,000 Exemption</h3>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
        {/* Tax receipts downloads list */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>80G Tax-Exemption Receipts</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { id: 1, desc: "CSR Fund for smart panel projection systems", amt: "₹1,00,000", receiptNo: "80G-2026-00492" },
              { id: 2, desc: "Scholarship funding support", amt: "₹50,000", receiptNo: "80G-2026-00381" }
            ].map((receipt) => (
              <div key={receipt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px' }}>
                <div>
                  <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{receipt.amt}</h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{receipt.desc} | Ref: {receipt.receiptNo}</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }} onClick={() => alert("Downloading PDF certificate")}>
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Funds allocation charts list */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>CSR Funding Allocation Matrix</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { field: "Biodegradable sanitary pad logistics", pct: 45, color: 'var(--color-green)' },
              { field: "Smart classrooms visual software mapping", pct: 35, color: 'var(--color-primary)' },
              { field: "Rural medicine diagnostics and transport", pct: 20, color: 'var(--color-green)' }
            ].map((field, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '5px' }}>
                  <span>{field.field}</span>
                  <strong>{field.pct}%</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--color-light-gray)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${field.pct}%`, height: '100%', background: field.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 5. Doctor / Medical Volunteer Dashboard
  const renderDoctorDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-3" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Patients Diagnosed</span>
            <Users size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>145 Patients</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Camps Completed</span>
            <Calendar size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>6 Camps</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Pending Surgery Referrals</span>
            <Activity size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>4 Referrals</h3>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
        {/* Patient log entry form */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Enter Patient Diagnostic Record</h4>
          {formSubmitted ? (
            <div style={{ padding: '20px', background: 'rgba(140, 198, 62, 0.1)', borderRadius: '6px', color: 'var(--color-green)', fontWeight: 600, textAlign: 'center' }}>
              Patient Diagnostic Report Saved Successfully!
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Patient Name</label>
                  <input type="text" name="patientName" required value={diagnosticsForm.patientName} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Age</label>
                  <input type="number" name="age" required value={diagnosticsForm.age} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Primary Symptom</label>
                <select name="symptom" value={diagnosticsForm.symptom} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                  <option value="Anemia">Severe Anemia</option>
                  <option value="Malnutrition">Malnourishment</option>
                  <option value="PCOD">Polycystic Ovary Symptoms (PCOD)</option>
                  <option value="Infection">Reproductive/Sanitary Infection</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Prescription Details</label>
                <input type="text" name="prescription" required value={diagnosticsForm.prescription} onChange={handleInputChange(setDiagnosticsForm)} placeholder="e.g. Iron Supplements, Vitamin B12" style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '5px' }}>Referral for Advanced Surgery Required?</label>
                <select name="referralRequired" value={diagnosticsForm.referralRequired} onChange={handleInputChange(setDiagnosticsForm)} style={{ width: '100%', padding: '10px', border: '1px solid var(--color-gray-light)', borderRadius: '4px' }}>
                  <option value="No">No (Treatable locally)</option>
                  <option value="Yes">Yes (Refer to District Hospital)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '10px' }}>Save Patient Log</button>
            </form>
          )}
        </div>

        {/* Camp Schedule */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>My Registered Camps Schedule</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { date: "12 August 2026", area: "Rohtak Village Site B", role: "Lead Diagnostician", timing: "09:00 AM - 04:00 PM" },
              { date: "05 September 2026", area: "Jaipur Village Site A", role: "Gynecology Consultant", timing: "10:00 AM - 05:00 PM" }
            ].map((camp, idx) => (
              <div key={idx} style={{ background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 700 }}>
                  <span>{camp.date}</span>
                  <span>{camp.timing}</span>
                </div>
                <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: '5px 0' }}>{camp.area}</h5>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>Assigned Role: <strong>{camp.role}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // 6. Regular User & Volunteer Dashboard
  const renderUserDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Metrics Row */}
      <div className="grid-3" style={{ gap: '20px' }}>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Volunteering Hours</span>
            <Users size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>24 Hours</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Camps Assisted</span>
            <Calendar size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>3 Camps</h3>
        </div>
        <div className="card" style={{ padding: '25px', background: 'var(--color-white)', borderLeft: '4px solid var(--color-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: 600 }}>Community Points</span>
            <Award size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '10px 0 0 0' }}>120 Points</h3>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '30px', alignItems: 'flex-start' }}>
        {/* Register for upcoming drives */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Register for Upcoming Sanitation Drives</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { date: "15 August 2026", title: "Independency Day Sanitation Campaign", area: "Rohtak Central Blocks" },
              { date: "24 August 2026", title: "Village water chlorination drive", area: "Jaipur Blocks A & B" }
            ].map((drive, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{drive.title}</h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Date: {drive.date} | Location: {drive.area}</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => alert("Registered to join drive successfully!")}>Join Drive</button>
              </div>
            ))}
          </div>
        </div>

        {/* Download booklets */}
        <div className="card" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--color-primary)', marginBottom: '15px', fontWeight: 800 }}>Hygiene Advocacy Handbooks</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { name: "Menstrual Hygiene Handbook (Hindi)", size: "1.2 MB", type: "PDF" },
              { name: "Vector Control & Water Safety Booklet", size: "850 KB", type: "PDF" }
            ].map((file, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-light-gray)', padding: '15px 20px', borderRadius: '6px' }}>
                <div>
                  <h5 style={{ fontWeight: 800, color: 'var(--color-primary)', margin: 0 }}>{file.name}</h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Format: {file.type} | Size: {file.size}</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%' }} onClick={() => alert("Downloading PDF Handbook")}>
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (role) {
      case 'women_distributor':
        return renderDistributorDashboard();
      case 'block_coordinator':
        return renderBlockCoordinatorDashboard();
      case 'district_coordinator':
      case 'state_coordinator':
        return renderDistrictCoordinatorDashboard();
      case 'donor':
      case 'csr_partner':
      case 'corporate_partner':
        return renderDonorDashboard();
      case 'doctor':
        return renderDoctorDashboard();
      case 'volunteer':
      case 'user':
      default:
        return renderUserDashboard();
    }
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'women_distributor':
        return 'Women Distributor (Life Sakhi)';
      case 'block_coordinator':
        return 'Block Coordinator';
      case 'district_coordinator':
        return 'District Coordinator';
      case 'state_coordinator':
        return 'State Coordinator';
      case 'donor':
        return 'Trust Donor';
      case 'csr_partner':
        return 'CSR Partner';
      case 'corporate_partner':
        return 'Corporate Partner';
      case 'doctor':
        return 'Clinical Volunteer / Doctor';
      case 'volunteer':
        return 'Active Volunteer';
      case 'user':
      default:
        return 'Supporter Member';
    }
  };

  return (
    <div className="dashboard-layout" style={{ background: 'var(--color-light-gray)', minHeight: '100vh', paddingTop: '130px', paddingBottom: '60px' }}>
      <div className="container">
        {/* Profile Card Header */}
        <div className="card" style={{ padding: '30px', marginBottom: '30px', background: 'linear-gradient(135deg, var(--color-primary) 0%, #06214d 100%)', color: 'var(--color-white)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', background: 'var(--color-green)', color: 'var(--color-white)', padding: '4px 12px', borderRadius: 'var(--border-radius-full)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {getRoleDisplayName()}
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 5px 0', color: 'var(--color-white)' }}>Welcome Back, {name}!</h2>
              <p style={{ opacity: 0.85, fontSize: '0.9rem', margin: 0 }}>Registered Email: {email} | Contact: {phone}</p>
            </div>
            <button onClick={logout} className="btn btn-outline" style={{ color: 'var(--color-white)', borderColor: 'var(--color-white)', gap: '8px' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Dashboard Role Specific Panels */}
        {getDashboardContent()}
      </div>
    </div>
  );
};

export default Dashboard;
