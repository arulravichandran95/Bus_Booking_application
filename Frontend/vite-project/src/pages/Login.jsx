import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passengerApi } from '../services/passengerApi';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ 
    fullName: '',
    email: '', 
    password: '',
    confirmPassword: '',
    role: 'PASSENGER' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If Signing Up, validate passwords
    if (!isLogin && credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        // Handle Login
        const response = await passengerApi.login(credentials);
        localStorage.setItem('token', response.data.token);
        
        // Route based on role
        if (credentials.role === 'DRIVER') navigate('/driver/dashboard');
        else if (credentials.role === 'OWNER') navigate('/owner/dashboard');
        else navigate('/passenger/search');
      } else {
        // Handle Passenger Signup
        // In a real app we'd call passengerApi.register(credentials)
        alert('Passenger Account successfully created!');
        setIsLogin(true); // Switch back to login view
      }
    } catch (err) {
      alert(isLogin ? 'Login Failed: Check credentials' : 'Registration Failed');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset passwords and force role to PASSENGER on signup
    setCredentials(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
      role: 'PASSENGER'
    }));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <h1>BusSync</h1>
        <p>Your journey begins here.</p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.loginCard} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            <p>{isLogin ? 'Please enter your details to sign in.' : 'Join BusSync to book your tickets seamlessly.'}</p>
          </div>

          {/* Only show role tabs during Login */}
          {isLogin && (
            <div className={styles.roleTabs}>
              {['PASSENGER', 'DRIVER', 'OWNER'].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`${styles.roleTab} ${credentials.role === role ? styles.activeTab : ''}`}
                  onClick={() => setCredentials({ ...credentials, role })}
                >
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" placeholder="John Doe" required 
                value={credentials.fullName}
                onChange={(e) => setCredentials({...credentials, fullName: e.target.value})} 
              />
            </div>
          )}
          
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" placeholder="hello@bussync.com" required 
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" placeholder="••••••••" required 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
            />
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input 
                type="password" placeholder="••••••••" required 
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})} 
              />
            </div>
          )}

          <button type="submit" className={styles.loginBtn}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <div className={styles.toggleText}>
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <span onClick={toggleMode} className={styles.toggleLink}>
               {isLogin ? 'Sign up' : 'Sign in'}
             </span>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;