import React from 'react'
import Post from './Post'

const Feed = ({ posts }) => {
  if (!Array.isArray(posts)) {
    console.error("Feed: 'posts' is not an array", posts);
    return <p>Invalid post data.</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Feed
