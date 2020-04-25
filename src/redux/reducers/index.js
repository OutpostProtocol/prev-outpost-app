import { combineReducers } from 'redux'
import { SET_ETHERS } from '../actionTypes'

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

const app = combineReducers({
  ethers
})

export default app
