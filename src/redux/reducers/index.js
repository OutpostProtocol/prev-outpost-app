import { combineReducers } from 'redux'
import {
  SET_ETHERS, SET_IS_LOGGED_IN, SET_COMMUNITIES, ADD_COMMUNITY, TOGGLE_VISIBILITY
} from '../actionTypes'
import { DEFAULT_COMMUNITY } from '../../constants'

const ethers = (state = {}, action) => {
  switch (action.type) {
    case SET_ETHERS:
      return {
        ...state,
        ...action.library
      }
    default:
      return state
  }
}

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.isLoggedIn
    default:
      return state
  }
}

const toggleVisibility = (state, action) => {
  return state.map((item, _) => {
    if (item.address !== action.address) {
      return item
    } else {
      const updatedCommunity = {
        abbr: item.abbr,
        address: item.address,
        name: item.name,
        visible: !item.visible
      }
      return updatedCommunity
    }
  })
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
    case TOGGLE_VISIBILITY:
      return toggleVisibility(state, action)
    default:
      return state
  }
}

const app = combineReducers({
  ethers,
  isLoggedIn,
  communities
})

export default app
