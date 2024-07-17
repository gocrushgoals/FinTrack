import axios from 'axios'; 
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css'; // Your custom CSS for additional styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: formData.username,
        password: formData.password
      });
  
      // Assuming your backend sends a JWT token upon successful login
      const { token } = response.data;
  
      // Store the token in localStorage for future authenticated requests
      localStorage.setItem('token', token);
  
      // Redirect to the dashboard or another route on successful login
      history.push('/dashboard'); // Replace '/dashboard' with your desired route
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message to the user)
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
