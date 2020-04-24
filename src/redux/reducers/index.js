import { combineReducers } from 'redux'
import { SET_ETHERS, SET_BOX, SET_SPACE } from '../actionTypes'

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

const box = (state = {}, action) => {
  switch (action.type) {
    case SET_BOX:
      return {
        ...state,
        ...action.box
      }
    default:
      return state
  }
}

const space = (state = {}, action) => {
  switch (action.type) {
    case SET_SPACE:
      return {
        ...state,
        ...action.space
      }
    default:
      return state
  }
}

const app = combineReducers({
  ethers,
  box,
  space
})

export default app
