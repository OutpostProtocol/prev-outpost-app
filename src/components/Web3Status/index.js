import React from 'react'
import { connect } from 'react-redux'
import { SET_ETHERS } from '../../redux/actionTypes'

import Modal from '../Modal'

const Web3Status = (props) => {
  // should display modal based on status of ethers
  return (
    <Modal setEthers={props.setEthers}/>
  )
}

const mapStateToProps = (state) => ({
  ethers: state.ethers
})

const mapDispatchToProps = dispatch => {
  return {
    setEthers: ethers => dispatch({ type: SET_ETHERS })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Web3Status)
