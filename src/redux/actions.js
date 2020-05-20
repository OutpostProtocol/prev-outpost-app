import { SET_ADDR, SET_IS_LOGGED_IN, SET_COMMUNITIES, SET_POSTS } from './actionTypes'

export const setAddr = address => ({
  type: SET_ADDR,
  address
})

export const setIsLoggedIn = isLoggedIn => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn
})

export const setCommunities = communities => ({
  type: SET_COMMUNITIES,
  communities
})

export const setPosts = posts => ({
  type: SET_POSTS,
  posts
})
