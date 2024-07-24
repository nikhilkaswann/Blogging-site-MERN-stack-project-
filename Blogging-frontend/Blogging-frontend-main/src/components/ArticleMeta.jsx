import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'

function ArticleMeta({author,createdAt}) {
  const { authUser } = useAuth()

  const canUpdate = authUser?.username === author?.username


  return (
    <div className="article-meta">
      <Link to={`/profile/${author?.username}`}>
        <img src={author?.image} />
      </Link>
      <div className="info">
        <Link to={`/profile/${author?.username}`} className="author">
          {author?.username}
        </Link>
        <span className="date">{new Date(createdAt).toDateString()}</span>
      </div>
 
    </div>
  )
}

export default ArticleMeta
