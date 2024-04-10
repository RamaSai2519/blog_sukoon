// FeaturedBlog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedBlog.css';
import load from '../assets/loading.png';
import { Link } from 'react-router-dom';


const FeaturedBlog = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://ec2-15-206-127-248.ap-south-1.compute.amazonaws.com/api/featuredblog')
      .then(response => {
        setFeaturedBlog(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching featured blog:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return <div className='loading'>
      <img src={load} alt='loading...'></img>
    </div>; // Render loading indicator while fetching data
  }

  if (!featuredBlog) {
    return <div>No featured blog found.</div>; // Handle case where featuredBlog is null
  }

  return (
    <Link to={`/blog/${featuredBlog.id}`}>
      <section className="featured-blog" style={{ backgroundImage: `url(${featuredBlog.image})` }}>
        <div className="blog-content">
          <h2>{featuredBlog.title}</h2>
          <p>{featuredBlog.description}</p>
          <div className='read-more'>
            <span className='featured-span'>Read More</span>
            <svg className="arrow-icon" width="100%" height="100%" viewBox="0 -5 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default FeaturedBlog;
