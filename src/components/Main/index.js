import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'
import Box from '3box'

import { DEFAULT_COMMUNITY } from '../../constants'
import Feed from '../Feed'
import NewPost from '../NewPost'

const MainContainer = styled('div')({
  flex: 3,
  padding: '1em',
  'padding-left': '15%',
  'padding-right': '15%'
})

const Main = () => {
  const communities = useSelector(state => state.communities)
  const [allPosts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      if (window.space && communities) {
        setPosts(await fetchPosts(communities))
      } else {
        setPosts(await fetchPosts([DEFAULT_COMMUNITY]))
      }
    }

    const fetchPosts = async (communities) => {
      const tempPosts = []
      for (const community of communities) {
        const threadName = community.address.split('/').slice(-1)
        const posts = await Box.getThreadByAddress(community.address)
        posts.forEach((post) => {
          post.threadName = threadName
        })
        tempPosts.push(posts)
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
  }, [communities])

  return (
    <MainContainer>
      <NewPost />
      <Feed posts={allPosts} />
    </MainContainer>
  )
}

export default Main
