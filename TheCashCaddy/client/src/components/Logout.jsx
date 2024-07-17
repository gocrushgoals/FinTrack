import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Logic to clear user authentication state (e.g., clear token from localStorage)
    localStorage.removeItem('token'); // Example: Remove token from localStorage

    // Redirect user to the login page or another appropriate page
    history.push('/client/src/components/Login.jsx'); 
  };

  return (
    <button
      className="btn btn-outline-danger"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
