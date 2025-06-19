import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext, { DataProvider } from './context/DataContext';

const PostPage = () => {
  const { id } = useParams();
  const {posts,handleDelete} = useContext(DataContext)
  if (!posts.length) return <p>Loading post...</p>;

  const post = posts.find(post => post.id === Number(id)); // Ensure numeric comparison

  if (!post) {
    return (
      <main className='PostPage'>
        <h2>Post not found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to="/">Visit our Home Page</Link>
        </p>
      </main>
    );
  }

  return (
    <main className='PostPage'>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="PostDate">{post.datetime}</p>
        <p className="PostBody">{post.body}</p>
        <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete</button>
        <Link to={`/edit/${post.id}`}>
          <button className="editButton">Edit</button>
        </Link>
      </article>
    </main>
  );
};

export default PostPage;
