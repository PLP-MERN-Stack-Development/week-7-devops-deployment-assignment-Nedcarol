import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use environment variable with fallback
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/posts';
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>All Posts</h1>
      
      {loading && <p>Loading posts...</p>}
      
      {error && (
        <div className="error">
          <p>Error loading posts: {error}</p>
          <p>Please check your server connection</p>
        </div>
      )}
      
      {!loading && !error && (
        <ul>
          {posts.length > 0 ? (
            posts.map(post => (
              <li key={post.id || post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </li>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default App;