import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Feed from '../Feed'
import NewPost from '../NewPost'
import moment from 'moment'

import styles from './index.module.css'

const Main = ({ address }) => {
  const communities = useSelector(state => state.communities)
  const [allPosts, setPosts] = useState([])

  useEffect(() => {
    const chronologicalSort = (posts) => {
      posts.sort(function (a, b) {
        return moment.utc(b.timestamp).diff(moment.utc(a.timestamp))
      })
      return posts
    }

    const promiseTimeout = async (ms, fn) => {
      return Promise.race([
        fn,
        new Promise((resolve, reject) => setTimeout(() => reject(new Error('timeout')), ms))
      ]).catch(console.error)
    }

    const getPostsFromThread = async (address) => {
      const thread = await window.space.joinThreadByAddress(address)
      const posts = await thread.getPosts()
      posts.forEach((post) => {
        post.threadName = thread._name
      })
      return posts
    }

    const getPostsLoggedIn = async () => {
      const TIMEOUT = 3000 // ms
      let tempPosts = []
      for (const community of communities.filter(community => community.visible)) {
        let posts = await promiseTimeout(TIMEOUT, getPostsFromThread(community.address))
        posts = posts === undefined ? [] : posts
        tempPosts.push(posts)
      }
      tempPosts = chronologicalSort(tempPosts.flat())
      return tempPosts
    }

    // TODO: implement
    const getPostsLoggedOut = async () => {
      return chronologicalSort([])
    }

    // TODO: add caching? Does orbitDB cache automatically?
    const getPosts = async () => {
      if (!window.space) {
        const posts = await getPostsLoggedOut()
        setPosts(posts)
      } else {
        const posts = await getPostsLoggedIn()
        setPosts(posts)
      }
    }
    getPosts()
  }, [communities])

  return (
    <div className={styles.container}>
      <NewPost />
      <Feed posts={allPosts} />
    </div>
  )
}

export default Main
