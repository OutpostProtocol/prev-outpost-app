import {
  SET_ETHERS, SET_IS_LOGGED_IN, SET_COMMUNITIES, ADD_COMMUNITY,
  REMOVE_COMMUNITY
} from './actionTypes'

export const setEthers = library => ({
  type: SET_ETHERS,
  library
})

export const setIsLoggedIn = isLoggedIn => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn
})

export const setCommunities = communities => ({
  type: SET_COMMUNITIES,
  communities
})

export const addCommunity = community => ({
  type: ADD_COMMUNITY,
  community
})

export const removeCommunity = abbr => ({
  type: REMOVE_COMMUNITY,
  abbr
})
