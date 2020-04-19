import { SET_ETHERS } from '../actionTypes'

export default function ethers (state = {}, action) {
  switch (action.type) {
    case SET_ETHERS:
      return {
        ...state,
        ethers: action.ethers
      }
    default:
      return state
  }
}
