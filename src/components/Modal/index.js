import React from 'react'
import Button from '@material-ui/core/Button'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import modalOptions from './modalOptions'

import styles from './index.module.css'

const web3Modal = new Web3Modal(modalOptions)

const Modal = () => {
  const signIn = async () => {
    const provider = await web3Modal.connect()
    const web = new Web3(provider)
    console.log(web, 'GOT THE WEB')
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

export default Modal
