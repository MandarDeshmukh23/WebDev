import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) {
        navigate(`/?search=${query}`);
      }
    }
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#242424',
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '60px',
      zIndex: 1000,
    }}>
      {/* Left - Home */}
      <div style={{ flex: 1 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px' }}>
          Home
        </Link>
      </div>

      {/* Center - Search */}
      <div style={{ flex: 2, textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search videos..."
          onKeyDown={handleSearch}
          style={{
            width: '60%',
            padding: '6px 12px',
            borderRadius: '20px',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>

      {/* Right - Auth Buttons */}
      <div style={{ flex: 1, textAlign: 'right' }}>
        {token ? (
          <button
            onClick={onLogout}
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '6px 12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '30px',
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '2 0px',
              }}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginRight: '30px',
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



