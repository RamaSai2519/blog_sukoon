import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import FeaturedBlog from './components/FeaturedBlog/FeaturedBlog';
import RecentBlogPosts from './components/RecentBlogPosts/RecentBlogPosts';
import Footer from './components/Footer/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import CallList from './components/Admin/CallList';
import CallDetails from './components/Admin/CallDetails';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga'; // Import ReactGA

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <FeaturedBlog />
      <RecentBlogPosts />
    </div>
  );
}

const BlogPost = lazy(() => import('./components/BlogPost/BlogPost'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/calls/dashboard" element={<AdminDashboard />} />
                <Route path="/calls" element={<CallList />} />
                <Route path="/calls/:callId" element={<CallDetails />} />
                <Route path="*" element={<Navigate to="/calls/dashboard" />} />
              </>
            ) : (
              <Route path="/calls*" element={<Navigate to="/admin" />} />
            )}
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
