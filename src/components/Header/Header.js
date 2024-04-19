import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header>
      <Helmet>
        <title>Sukoon Blogs</title>
        <meta name="description" content="Discover engaging narratives, diverse languages, and the essence of heartfelt conversations in senior living on the sukoon.love blog. Embrace the wisdom of elders and nurture authentic connections through our enriching content." />
      </Helmet>
      <div className="logo">
        {/* Logo */}
        <Link to="/">
          <img src={require('../assets/logo.svg')} alt="Sukoon Logo" className='logo_svg' />
        </Link>
      </div>
      <div className='nav-buttons'>
        <nav>
          <ul>
            <li key="home">
              <Link to="/" className='outlined-button' aria-label="Navigate to the Blog">
                <span>Blog</span>
              </Link>
            </li>
            {/* Conditional rendering of login/logout button */}
            {isLoggedIn ? (
              <li key="logout">
                <button className='outlined-button' onClick={onLogout} aria-label="Log out">
                  <span>Log Out</span>
                </button>
              </li>
            ) : (
              <li key="login">
                <Link to="/admin" className='outlined-button' aria-label="Navigate to the Admin Login">
                  <span>Log In</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default React.memo(Header);
