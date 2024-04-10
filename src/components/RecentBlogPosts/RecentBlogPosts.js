import React, { useState, useEffect } from 'react';
import './RecentBlogPosts.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const RecentBlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://15.206.127.248/api/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBlogs(data);
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
