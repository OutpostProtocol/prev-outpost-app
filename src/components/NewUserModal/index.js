import React, { useState } from 'react'
import {
  Dialog,
  IconButton,
  TextField,
  Button,
  Fade,
  CircularProgress
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import {
  gql, useMutation
} from '@apollo/client'
import {
  DEV_CONTRACT_ID, ROLES
} from 'outpost-protocol'

import { joinCommunity } from '../../uploaders'

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

const UploadProgress = styled(CircularProgress)({
  color: '#f1f1f1'
})

const UPLOAD_NEW_USER = gql`
  mutation setUsername($did: String!, $name: String!, $role: RoleUpload!) {
    setUsername(did: $did, name: $name) {
      id,
      name
    }
    uploadRole(role: $role) {
      success
      role {
        role
        transaction {
          blockHash
        }
      }
    }
  }
`

const NewUserModal = ({ open, handleClose }) => {
  const [name, setUsername] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadNewUser] = useMutation(UPLOAD_NEW_USER)

  const handleName = (event) => {
    if (event && event.target) {
      setUsername(event.target.value)
    }
  }

  const handleNewUser = async () => {
    setIsUploading(true)
    const txId = (await joinCommunity(DEV_CONTRACT_ID)).data

    const did = window.box.DID

    const roleUpload = {
      txId: txId,
      communityTxId: DEV_CONTRACT_ID,
      userDid: did,
      role: ROLES.MEMBER
    }

    await uploadNewUser({
      variables: {
        role: roleUpload,
        name,
        did
      },
      refetchQueries: [
        {
          query: gql`
            query user($did: String) {
              user(did: $did) {
                name,
                id
              }
            }
          `,
          variables: { did }
        }
      ]
    })

    handleClose()
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
      { isUploading
        ? <SubmitButton
          disableElevation
          color='secondary'
          variant='contained'
        >
          <UploadProgress
            style={{
              width: '2em',
              height: '2em'
            }}
          />
        </SubmitButton>
        : <SubmitButton
          onClick={handleNewUser}
          disableElevation
          color='secondary'
          variant='contained'
        >
          SAVE
        </SubmitButton>
      }
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
