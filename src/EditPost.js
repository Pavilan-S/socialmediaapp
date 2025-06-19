import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';

const EditPost = () => {
  const { posts, handleedit, postTitle, setPostTitle, postBody, setPostBody } =useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id === Number(id));

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setPostBody(post.body);
    }
  }, [post, setPostTitle, setPostBody]);

  return (
    <main className="NewPost">
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={(e) => handleedit(e, post.id)}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default EditPost;
