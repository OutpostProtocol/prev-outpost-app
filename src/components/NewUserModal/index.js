import React, { useState } from 'react'
import {
  Dialog,
  IconButton,
  TextField,
  Button,
  Fade
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import { gql } from '@apollo/client'

import { useSetName } from '../../hooks'

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

const NewUserModal = ({ open, handleClose, did }) => {
  const [name, setUsername] = useState('')
  const [setName] = useSetName()

  const handleName = (event) => {
    if (event && event.target && event.target.value) {
      setUsername(event.target.value)
    }
  }

  const handleSetName = async () => {
    setName({
      variables: {
        did: did,
        name: name
      },
      refetchQueries: [
        {
          query: gql`
            query hasUsername($did: String!) {
              hasUsername(did: $did)
            }
          `,
          variables: { did: did }
        },
        {
          query: gql`
            query user($did: String!) {
              user(did: $did) {
                name,
                id
              }
            }
          `,
          variables: { did: did }
        }
      ]
    })
    handleClose()
  }
  const ModalContent = (
    <ContentContainer>
      <Heading>
        <h3>
          Enter a username
        </h3>
        <ExitButton
          onClick={handleClose}
        >
          <Close />
        </ExitButton>
      </Heading>
      <UsernameField
        value={name}
        onChange={handleName}
        label='Username'
        variant='outlined'
      />
      <SubmitButton
        onClick={handleSetName}
        disableElevation
        color='secondary'
        variant='contained'
      >
        SET USERNAME
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
