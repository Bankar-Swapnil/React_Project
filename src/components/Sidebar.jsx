import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Menu</h2>
      <Link
        to="/"
        style={{
          ...styles.link,
          ...(location.pathname === '/' ? styles.activeLink : {}),
          ...(hovered === '/' ? styles.hoverLink : {}),
        }}
        onMouseEnter={() => setHovered('/')}
        onMouseLeave={() => setHovered(null)}
      >
        📦 Product Details
      </Link>

      <Link
        to="/compare"
        style={{
          ...styles.link,
          ...(location.pathname === '/compare' ? styles.activeLink : {}),
          ...(hovered === '/compare' ? styles.hoverLink : {}),
        }}
        onMouseEnter={() => setHovered('/compare')}
        onMouseLeave={() => setHovered(null)}
      >
        🔍 Compare Products
      </Link>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    height: '114vh',
    backgroundColor: '#001529',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    fontSize: '18px',
    color: 'white',
    padding: '12px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    transition: 'background 0.3s ease-in-out',
  },
  activeLink: {
    backgroundColor: '#1890ff',
    fontWeight: 'bold',
  },
};

export default Sidebar;
