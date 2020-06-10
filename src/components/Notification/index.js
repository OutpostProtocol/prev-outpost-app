import React, { useState } from 'react'
import {
  Portal,
  Snackbar
} from '@material-ui/core'

const Notifictation = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
        message={message}
      />
    </Portal>
  )
}

export default Notifictation
