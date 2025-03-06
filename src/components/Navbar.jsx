import React from 'react';
import websiteLogo from '../assets/website_logo.png';
import profile_logo from '../assets/profile_logo.png'

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}><img src={websiteLogo} alt="Sidebar Icon" width="60" />QuickCart</div>
      <img style={styles.profilePic} src={profile_logo} alt="Sidebar Icon" width="50" />
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#001529',
    color: 'white',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center'
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default Navbar;
