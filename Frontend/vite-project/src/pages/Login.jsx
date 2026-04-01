import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passengerApi } from '../services/passengerApi';
import styles from './Login.module.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: 'PASSENGER' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await passengerApi.login(credentials);
      localStorage.setItem('token', response.data.token);
      // Route based on role
      if (credentials.role === 'DRIVER') navigate('/driver/dashboard');
      else if (credentials.role === 'OWNER') navigate('/owner/dashboard');
      else navigate('/passenger/search');
    } catch (err) {
      alert('Login Failed: Check credentials');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <h1>BusSync</h1>
        <p>Your journey begins here.</p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <div className={styles.header}>
            <h2>Welcome Back</h2>
            <p>Please enter your details to sign in.</p>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" placeholder="hello@bussync.com" required 
              onChange={(e) => setCredentials({...credentials, email: e.target.value})} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" placeholder="••••••••" required 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;