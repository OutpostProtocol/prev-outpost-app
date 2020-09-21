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
import {
  Close,
  Done
} from '@material-ui/icons'
import {
  gql, useMutation
} from '@apollo/client'
import {
  DEV_CONTRACT_ID, PROD_CONTRACT_ID, ROLES
} from 'outpost-protocol'

import { joinCommunity } from '../../uploaders'
import { isProduction } from '../../utils'
import {
  useIsNameAvailable,
  useErrorReporting
} from '../../hooks'
import { ERROR_TYPES } from '../../constants'

const CONTRACT_ID = isProduction() ? PROD_CONTRACT_ID : DEV_CONTRACT_ID

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

const AvailabiltyContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '10px'
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
  const [uploadNewUser, { error }] = useMutation(UPLOAD_NEW_USER)
  useErrorReporting(ERROR_TYPES.mutation, error, 'UPLOAD_NEW_USER')
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

  const handleNewUser = async () => {
    if (requirements !== null) {
      alert(requirements)
      return
    }

    setIsUploading(true)
    const txId = (await joinCommunity(CONTRACT_ID)).data

    const roleUpload = {
      txId: txId,
      communityTxId: CONTRACT_ID,
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
          disabled={requirements !== null}
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
