// src/App.js
import React, { Suspense, lazy, useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import FeaturedBlog from './components/FeaturedBlog/FeaturedBlog';
import RecentBlogPosts from './components/RecentBlogPosts/RecentBlogPosts';
import Footer from './components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga'; // Import ReactGA

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div style={{maxWidth: '1100px', margin: '0 auto' }}>
      <FeaturedBlog />
      <RecentBlogPosts />
    </div>
  );
}

const BlogPost = lazy(() => import('./components/BlogPost/BlogPost'));


const App = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading delay
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 10000); // Adjust the delay time as needed

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </Suspense>
      </div>
      {contentLoaded && <Footer />}
    </div>
  );
}

export default App;
