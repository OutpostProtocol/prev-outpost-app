import {
  useState,
  useEffect
} from 'react'
import {
  gql,
  useQuery
} from '@apollo/client'
import moment from 'moment'
import Box from '3box'

import {
  DEFAULT_COMMUNITY,
  ROLES
} from '../constants'

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

/**
 * Get all communities
 *
 * @returns {Object} All the communities
 */
export const useAllCommunities = () => {
  const GET_ALL_COMMUNITIES = gql`
    query {
      Community {
        name
        txId
        isOpen
      }
    }
  `
  const { loading, error, data } = useQuery(GET_ALL_COMMUNITIES)

  if (loading || error) return []
  else return data
}

/**
 * Get the owners, admins, moderators, and members for a community
 *
 * @param   {String}  id  of the community to get the roles for
 *
 * @returns {Object}      The owners, admins, moderators, and members of a community
 */
export const useCommunityRoles = (id) => {
  const GET_COMMUNITY_ROLES = gql`
    query getAllCommunityRoles($testID: String!) {
      getAllCommunityRoles(communityTxId: $testID) {
        role
        user {
          did
        }
      }
    }
  `
  const { loading, error, data } = useQuery(
    GET_COMMUNITY_ROLES,
    {
      variables: {
        testID: id
      }
    }
  )

  const owners = []
  const admins = []
  const moderators = []
  const members = []

  if (data) {
    for (const result of data.getAllCommunityRoles) {
      const { role, user } = result
      switch (role) {
        case ROLES.Owner:
          owners.push(user.did)
          break
        case ROLES.Admin:
          admins.push(user.did)
          break
        case ROLES.Moderator:
          moderators.push(user.did)
          break
        case ROLES.Member:
          members.push(user.did)
          break
        default:
          console.error('Unrecognized role', role)
      }
    }
  }

  if (loading || error) return []
  else return { owners, admins, moderators, members }
}

/**
 * Get a users roles within a community
 *
 * @param   {String}  did of the user
 * @param   {String}  id  of the community
 *
 * @returns {Object}      The user's roles within the community
 */
export const useUserRolesForCommunity = (did, id) => {
  const GET_USER_COMMUNITY_ROLES = gql`
    query getUserRolesForCommunity($did: String!, $id: String!) {
      getUserRolesForCommunity(did: $did, id: $id) {
        role
      }
    }
  `
  const { data } = useQuery(
    GET_USER_COMMUNITY_ROLES,
    {
      variables: {
        did: did,
        id: id
      }
    }
  )

  const roles = {
    isOwner: false,
    isAdmin: false,
    isModerator: false,
    isMember: false
  }

  if (data) {
    for (const result of data.getUserRolesForCommunity) {
      const { role } = result
      switch (role) {
        case ROLES.Owner:
          roles.isOwner = true
          break
        case ROLES.Admin:
          roles.isAdmin = true
          break
        case ROLES.Moderator:
          roles.isModerator = true
          break
        case ROLES.Member:
          roles.isMember = true
          break
        default:
          console.error('Unrecognized role', role)
      }
    }
  }

  return roles
}
