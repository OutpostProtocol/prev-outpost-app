import React from 'react'
import Post from '../Post'

const Feed = ({ posts }) => {
  if (posts.length) {
    return (
      <div>
        {posts.map((post, i) => {
          return (
            <Post
              author={post.author}
              message={post.message}
              timestamp={post.timestamp}
              key={i}
            />
          )
        })
        }
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

export default Feed
