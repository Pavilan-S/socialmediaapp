import './App.css';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import Header from './Header';
import EditPost from './EditPost';
import React, { useState, useEffect } from 'react';
import { format, set } from 'date-fns';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import api from './API/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  // const [editTitle, setEditTitle] = useState('');
  // const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        const normalizedPosts = response.data.map(post => ({
          ...post,
          id: Number(post.id)
        }));
        setPosts(normalizedPosts);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.headers);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  // Search filtering
  useEffect(() => {
    const filteredResults = posts.filter(post =>
      (post.body || '').toLowerCase().includes(search.toLowerCase()) ||
      (post.title || '').toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxId = posts.length ? Math.max(...posts.map(post => post.id)) : 0;
    const nid = maxId+1;
    const id = nid.toString();
    const datetime = format(new Date(), 'MMMM dd yyyy , yy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post('/posts', newPost);
      if (response.status !== 201) {
        console.error('Failed to create new post');
        return;
      }

      const addedPost = { ...response.data, id: Number(response.data.id) }; // normalize ID
      const allPosts = [...posts, addedPost];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.error('Error creating new post:', err);
    }
  };
const handleedit = async (e, id) => {
  e.preventDefault();
  const postid = Number(id);
  const datetime = format(new Date(), 'MMMM dd yyyy , yy pp');
  const updatedPost = {
    id: postid,
    title: postTitle,
    datetime,
    body: postBody
  };

  try {
    const response = await api.put(`/posts/${postid}`, updatedPost);
    console.log("PUT response:", response.data);

    const updatedPosts = posts.map((post) =>
      post.id === postid ? { ...response.data, id: postid } : post
    );

    setPosts(updatedPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  } catch (e) {
    console.error("Error updating post:", e);
  }
};


  const handleDelete = async (id) => {
    console.log("Request to delete post with ID:", id);

    try {
      const response = await api.delete(`/posts/${id}`);
      console.log("Delete response:", response);

      if (response.status === 200 || response.status === 204) {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        navigate('/');
      } else {
        console.error('Delete failed with status:', response.status);
      }
    } catch (err) {
      console.error('Error deleting post:', err.message);
      if (err.response) {
        console.log('Status:', err.response.status);
        console.log('Data:', err.response.data);
        console.log('URL:', err.config.url);
    }
    }
  };

  return (
    <div className="App">
      <Header title="First React App" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route index element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          } />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>
         <Route path="/edit/:id" element={
          <EditPost posts={posts} 
          handleedit={handleedit} 
          postTitle={postTitle} 
          setPostTitle={setPostTitle} 
          postBody={postBody} 
          setPostBody={setPostBody} />} 
         />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
