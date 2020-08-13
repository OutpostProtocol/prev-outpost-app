import {
  SET_ADDR,
  SET_IS_LOGGED_IN,
  SET_IS_LOADING,
  SET_DID
} from './actionTypes'

export const setAddr = address => ({
  type: SET_ADDR,
  address
})

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  isLoading
})

export const setIsLoggedIn = isLoggedIn => ({
  type: SET_IS_LOGGED_IN,
  isLoggedIn
})

export const setDid = did => ({
  type: SET_DID,
  did
})
