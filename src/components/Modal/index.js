import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

import modalOptions from './modalOptions'

import styles from './index.module.css'

const web3Modal = new Web3Modal(modalOptions)

const Modal = (props) => {
  const { setEthers } = props

  const signIn = async () => {
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = 10000
    setEthers(library)
  }

  return (
    <div className={styles.modalContainer}>
      <Button
        onClick={signIn}
        variant='contained'
        disableElevation
        color="primary"
        classes={{
          root: styles.modalButton
        }}
      >
        Sign In
      </ Button>
    </div>
  )
}

Modal.propTypes = {
  setEthers: PropTypes.func.isRequired
}

export default Modal
