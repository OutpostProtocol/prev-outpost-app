import { SET_ETHERS } from '../actionTypes'

export default function ethers (state = {}, action) {
  switch (action.type) {
    case SET_ETHERS:
      return {
        ...state,
        library: action.library
      }
    default:
      return state
  }
}
