const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
};