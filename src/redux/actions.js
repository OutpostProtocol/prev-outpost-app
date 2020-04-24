import { SET_ETHERS, SET_BOX, SET_SPACE } from './actionTypes'

export const setEthers = library => ({
  type: SET_ETHERS,
  library
})

export const setBox = box => ({
  type: SET_BOX,
  box
})

export const setSpace = space => ({
  type: SET_SPACE,
  space
})
