import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ token }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '60px',
      left: 0,
      width: '200px',
      height: '100%',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    }}>
      <h3>Navigation</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">Home</Link></li>
        {token && (
          <>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/watchlater">Watch Later</Link></li>
          </>
        )}
        
      </ul>
    </div>
  );
};

export default Sidebar;


