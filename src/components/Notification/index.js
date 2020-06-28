import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Portal,
  Snackbar,
  SnackbarContent
} from '@material-ui/core'

const Error = styled(SnackbarContent)({
  backgroundColor: 'Red'
})

const Notifictation = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
      >
        <Error
          message={message}
        />
      </Snackbar>
    </Portal>
  )
}

export default Notifictation
