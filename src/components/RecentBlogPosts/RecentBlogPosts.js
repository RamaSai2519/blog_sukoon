// RecentBlogPosts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecentBlogPosts.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const RecentBlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/blogs')
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="recent-blog-posts">
      <h2>Recent Blog Posts</h2>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div className="blog-post" key={blog.id }>
          <Link to={`/blog/${blog.id}`} className='blog-post-link'>
          
            <img src={blog.image} alt={blog.description}></img>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
          
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogPosts;
