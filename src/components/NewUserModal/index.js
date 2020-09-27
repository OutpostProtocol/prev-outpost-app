import React, { useState } from 'react'
import {
  Dialog,
  IconButton,
  TextField,
  Button,
  Fade
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import {
  Close,
  Done
} from '@material-ui/icons'

import { useIsNameAvailable } from '../../hooks'

const ModalContainer = styled(Dialog)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Heading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  'padding-left': '5px'
})

const ContentContainer = styled('div')({
  padding: '10px',
  width: '22vw',
  'background-clip': 'content-box',
  'border-radius': '4px'
})

const ExitButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  padding: 0,
  'margin-left': 'auto'
})

const UsernameField = styled(TextField)({
  width: '100%'
})

const SubmitButton = styled(Button)({
  width: '100%',
  'margin-top': '10px'
})

const AvailabiltyContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px'
})

const NewUserModal = ({ open, handleClose }) => {
  const [name, setUsername] = useState('')
  const { data } = useIsNameAvailable(name)

  const getUnfilledRequirement = () => {
    if (name.length < 5) {
      return 'Username is less than 5 characters'
    } else if (!data?.isNameAvailable) {
      return 'Username is not available'
    }
    return null
  }
  const requirements = getUnfilledRequirement()

  const handleName = (event) => {
    if (event && event.target) {
      setUsername(event.target.value)
    }
  }

  const ModalContent = (
    <ContentContainer>
      <Heading>
        <ExitButton
          onClick={handleClose}
        >
          <Close />
        </ExitButton>
      </Heading>
      <UsernameField
        value={name}
        onChange={handleName}
        label='USERNAME'
        variant='outlined'
      />
      { requirements === null
        ? <AvailabiltyContainer>
          <Done />
          Username looks good
        </ AvailabiltyContainer>
        : <AvailabiltyContainer>
          <Close />
          { requirements }
        </ AvailabiltyContainer>
      }
      <SubmitButton
        disabled={requirements !== null}
        onClick={() => alert('need to set up new user modal')}
        disableElevation
        color='secondary'
        variant='contained'
      >
        SAVE
      </SubmitButton>
    </ContentContainer>
  )

  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
    >
      <Fade
        in={open}
      >
        {ModalContent}
      </Fade>
    </ModalContainer>
  )
}

export default NewUserModal
