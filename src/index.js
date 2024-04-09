// src/index.js
import React from 'react';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga'; // Import ReactGA
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';

ReactGA.initialize('G-X1P4R644F2');


ReactDOM.render(
  <Router>
    <Helmet>
      {/* Add meta tags */}
      <title>Sukoon Blogs</title>
      <meta name="description" content="Discover engaging narratives, diverse languages, and the essence of heartfelt conversations in senior living on the sukoon.love blog. Embrace the wisdom of elders and nurture authentic connections through our enriching content." />
      {/* Add more meta tags as needed */}
    </Helmet>
    <App />
  </Router>,
  document.getElementById('root')
);
