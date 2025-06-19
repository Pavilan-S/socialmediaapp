import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'
const Post = ({post}) => {
  return (
    <article className="Post">
      <Link to={`/post/${post.id}`}>
        <h2 className='postTitleLink'>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
        </Link>
        <p className="PostBody">{
         (post.body).length<=25 ? post.body : `${post.body.substring(0, 25)}...`
          }</p>
            <Link to={`/post/${post.id}`} className='readMore'>Read More</Link>
    </article>
  )
}

export default Post