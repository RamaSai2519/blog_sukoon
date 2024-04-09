// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        <div className="footer-column">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="https://sukoon.love/#faq-section">FAQ's</a></li>
            <li><a href="https://sukoon.love/">Visit Us</a></li>
            <li><a href="https://sukoon.love/#saarthis-section">Speak With experts</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="https://sukoon.love/#who-we-are-section">Who we are</a></li>
            <li><a href="https://sukoon.love/#what-do-we-do-section">What do we do</a></li>
            <li><a href="https://sukoon.love/terms-and-conditions">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
