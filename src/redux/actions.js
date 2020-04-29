import { SET_ETHERS, SET_IS_LOGGED_IN } from './actionTypes'

export const setEthers = library => ({
  type: SET_ETHERS,
  library
})

export const setIsLoggedIn = isLoggedIn => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn
})
