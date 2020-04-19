import { SET_ETHERS } from './actionTypes'

export const setEthers = ethers => ({
  type: SET_ETHERS,
  ethers
})
