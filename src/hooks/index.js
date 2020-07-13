import {
  useState,
  useEffect
} from 'react'

import moment from 'moment'
import Box from '3box'

import { DEFAULT_COMMUNITY } from '../constants'

export const usePosts = (isLoggedIn, communities) => {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(undefined)

  useEffect(() => {
    const getPosts = async () => {
      if (isLoggedIn) {
        const posts = await fetchPostsLoggedIn(communities)
        setPosts(posts)
      } else {
        const posts = await fetchPostsLoggedOut([DEFAULT_COMMUNITY])
        setPosts(posts)
      }
    }

    const fetchPostsLoggedIn = async (communities) => {
      const tempPosts = []
      for (const community of communities) {
        const threadName = community.address.split('/').slice(-1)[0].split('.')[3]
        try {
          const thread = await window.space.joinThreadByAddress(community.address)
          const threadPosts = await thread.getPosts()
          threadPosts.forEach((post) => {
            post.Id = post.postId
            post.threadName = threadName
          })
          tempPosts.push(threadPosts)
        } catch (error) {
          setError(error)
        }
      }
      return chronologicalSort(tempPosts.flat())
    }

    const fetchPostsLoggedOut = async (communities) => {
      const tempPosts = []
      for (const community of communities) {
        const threadName = community.address.split('/').slice(-1)[0].split('.')[3]
        const threadPosts = await Box.getThreadByAddress(community.address)
        threadPosts.forEach((post) => {
          post.Id = post.postId
          post.threadName = threadName
        })
        tempPosts.push(threadPosts)
      }
      return chronologicalSort(tempPosts.flat())
    }

    const chronologicalSort = (posts) => {
      posts.sort(function (a, b) {
        return moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
      })
      return posts
    }

    getPosts()
  }, [communities, isLoggedIn])

  return { posts, error }
}
