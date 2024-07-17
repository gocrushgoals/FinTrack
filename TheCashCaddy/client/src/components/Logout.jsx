// Logout.jsx

import React from 'react';
import { useHistory } from 'react-router-dom'; // React Router's useHistory hook

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Logic to clear user authentication state (e.g., clear token from localStorage)
    localStorage.removeItem('token'); // Example: Remove token from localStorage

    // Redirect user to the login page or another appropriate page
    history.push('/login'); // Replace '/login' with your login route
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
