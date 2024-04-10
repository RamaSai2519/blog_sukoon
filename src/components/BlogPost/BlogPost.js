import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaLink } from 'react-icons/fa';
import axios from 'axios'; // Import Axios for HTTP requests
import './BlogPost.css';
import ReactGA from 'react-ga'; // Import ReactGA
import load from '../assets/loading.png';

const BlogPost = () => {
  const { id } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null); // State to store the selected blog

  useEffect(() => {
    // Function to fetch blog data from the server
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`); // Make GET request to fetch specific blog by ID
        setSelectedBlog(response.data); // Set selectedBlog state with fetched data
        ReactGA.pageview(window.location.pathname + window.location.search); // Track page view
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData(); // Call the fetchBlogData function when the component mounts
  }, [id]); // Include id in the dependency array to re-fetch blog data when id changes

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(selectedBlog.title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(selectedBlog.title)}`, '_blank');
  };

  if (!selectedBlog) {
    return <div className='loading'>
      <img src={load} alt='loading...'></img>
    </div>; // Render loading state while blog data is being fetched
  }

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{selectedBlog.title}</title>
        <meta name="description" content={selectedBlog.description} />
        <meta property="og:title" content={selectedBlog.title} />
        <meta property="og:description" content={selectedBlog.description} />
        <meta property="og:image" content={selectedBlog.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={selectedBlog.title} />
        <meta name="twitter:description" content={selectedBlog.description} />
        <meta name="twitter:image" content={selectedBlog.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${window.location.href}"
            },
            "headline": "${selectedBlog.title}",
            "description": "${selectedBlog.description}",
            "image": "${selectedBlog.image}",
            "author": {
              "@type": "Person",
              "name": "Rama Sathya Sai.Ch"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sukoon.Love",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sukoon-media.s3.ap-south-1.amazonaws.com/logo.png"
              }
            }
          }
        `}
        </script>
      </Helmet>
      <section className="blog-post-section" style={{ backgroundImage: `url(${selectedBlog.image})` }}>
        <Link to="/" className="back-link">
          <FaArrowLeft className="back-icon" />
        </Link>
        <div className="social-icons">
          <FaFacebook className="social-icon" onClick={shareOnFacebook} />
          <FaTwitter className="social-icon" onClick={shareOnTwitter} />
          <FaLinkedin className="social-icon" onClick={shareOnLinkedIn} />
          <FaLink className="social-icon" onClick={copyUrlToClipboard} />
        </div>
      </section>
      <div className="text-container">
        <div className="blog-text">
          <h2 className="blog-title">{selectedBlog.title}</h2>
          <div className="blog-description" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
