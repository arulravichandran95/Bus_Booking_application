import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, UserPlus } from 'lucide-react';
import styles from './AddDriver.module.css';

const AddDriver = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experience: '1-3 Years',
    tempPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to register an employer-created driver account
    setTimeout(() => {
      alert(`Driver account for ${formData.fullName} created successfully!\nPlease provide them with their temporary password.`);
      navigate('/owner/fleet');
    }, 800);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/owner/fleet" className={styles.backBtn}>
            <ChevronLeft size={20} />
            <span>Fleet Management</span>
          </Link>
          <div className={styles.titleArea}>
            <h1>Onboard New Driver</h1>
            <p>Create credentials and register a new driver into your fleet.</p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={`glass-card ${styles.formCard}`}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Full Legal Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Commercial License Number</label>
                <input 
                  type="text" 
                  name="licenseNumber" 
                  placeholder="e.g. TN-38-2015-1234567"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Contact Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Experience Level</label>
                <select name="experience" value={formData.experience} onChange={handleChange}>
                  <option value="Trainee">Trainee (0-1 Year)</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3-5 Years">3-5 Years</option>
                  <option value="5+ Years">Veteran (5+ Years)</option>
                </select>
              </div>
            </div>

            <hr className={styles.divider} />

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>App Login Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="driver@bussync.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Temporary Password</label>
                <input 
                  type="text" 
                  name="tempPassword" 
                  placeholder="Create a temporary password"
                  value={formData.tempPassword}
                  onChange={handleChange}
                  required
                />
                <span className={styles.helperText}>The driver will use this to sign into their Driver Dashboard.</span>
              </div>
            </div>


            <div className={styles.actionRow}>
              <Link to="/owner/fleet" className={styles.cancelBtn}>Cancel</Link>
              <button type="submit" className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <UserPlus size={18} />
                Register Driver
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDriver;
