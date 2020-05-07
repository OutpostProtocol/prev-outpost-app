import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import CreateForm from './CreateForm'
import styles from './index.module.css'

const CreateCommunity = () => {
  const [open, setOpen] = useState(false)
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (isLoggedIn) {
    return (
      <div className={styles.container}>
        <Button
          onClick={handleOpen}
          variant='contained'
          color='primary'
          disableElevation
          classes={{
            root: styles.buttonRoot
          }}
        >
          Create a Community
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <div>
            <DialogTitle>Create a Community</DialogTitle>
            <DialogContent>
              <CreateForm
                handleClose={handleClose}
              />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    )
  } else {
    return <div className={styles.container} />
  }
}

export default CreateCommunity
