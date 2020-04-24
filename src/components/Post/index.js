import React from 'react'

const Post = ({ author, message, timestamp }) => {
  return (
    <div>
      <div>
        <span>{author}</span>
        <span>{timestamp}</span>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default Post
