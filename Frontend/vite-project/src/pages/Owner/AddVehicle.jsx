import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import styles from './AddVehicle.module.css';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    driver: '',
    capacity: 40,
    type: 'AC Sleeper'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to save vehicle
    setTimeout(() => {
      alert("Vehicle added successfully!");
      navigate('/owner/fleet');
    }, 800);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/owner/fleet" className={styles.backBtn}>
            <ChevronLeft size={20} />
            <span>Fleet</span>
          </Link>
          <div className={styles.titleArea}>
            <h1>Add New Vehicle</h1>
            <p>Register a new bus into your tracking system</p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={`glass-card ${styles.formCard}`}>
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Bus Name / Service Group</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="e.g. Superliner Express"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>License Plate</label>
                <input 
                  type="text" 
                  name="plate" 
                  placeholder="e.g. TN-38-AX-5678"
                  value={formData.plate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Default Assigned Driver</label>
                <input 
                  type="text" 
                  name="driver" 
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.driver}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Seat Capacity</label>
                <input 
                  type="number" 
                  name="capacity" 
                  min="20"
                  max="60"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Bus Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="AC Sleeper">A/C Sleeper</option>
                <option value="Non-AC Sleeper">Non-A/C Sleeper</option>
                <option value="AC Seater">A/C Seater</option>
                <option value="Non-AC Seater">Non-A/C Seater</option>
              </select>
            </div>

            <div className={styles.actionRow}>
              <Link to="/owner/fleet" className={styles.cancelBtn}>Cancel</Link>
              <button type="submit" className="btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Save size={18} />
                Register Vehicle
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddVehicle;
