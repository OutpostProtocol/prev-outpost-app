import { combineReducers } from 'redux'
import {
  SET_IS_LOGGED_IN,
  SET_COMMUNITIES,
  SET_IS_LOADING,
  ADD_COMMUNITY
} from '../actionTypes'
import { DEFAULT_COMMUNITY } from '../../constants'

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.isLoggedIn
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

const communities = (state = [DEFAULT_COMMUNITY], action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return [
        ...action.communities
      ]
    case ADD_COMMUNITY:
      return [
        ...state,
        action.community
      ]
    default:
      return state
  }
}

const app = combineReducers({
  isLoggedIn,
  isLoading,
  communities
})

export default app
