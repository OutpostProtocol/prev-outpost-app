import React, {
  useState, useEffect
} from 'react'
import {
  gql, useQuery, useMutation
} from '@apollo/client'
import {
  Button, Chip, Tooltip, CircularProgress
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import { ROLES } from 'outpost-protocol'

import { joinCommunity } from '../../uploaders'

const RoleChip = styled(Chip)({
  'border-radius': '4px',
  'background-color': '#3D5AFE',
  color: '#f1f1f1',
  margin: '0.5em 2px'
})

const PendingRoleChip = styled(RoleChip)({
  'background-color': '#FF5252'
})

const UploadProgress = styled(CircularProgress)({
  color: '#f1f1f1'
})

const JoinButton = styled(Button)({
  height: '2.5em',
  width: '70px'
})

const GET_USER_ROLES = gql`
  query userRoles($did: String) {
    userRoles(did: $did) {
      id
      role
      community {
        name
        txId
      }
      transaction {
        blockHash
      }
    }
  }
`

const UPLOAD_ROLE = gql`
  mutation UploadRole($role: RoleUpload!) {
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

const RoleStatus = ({ communityTxId, isOpen }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isRoleLoading, setIsRoleLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [uploadRoleToDb] = useMutation(UPLOAD_ROLE)
  const { data } = useQuery(GET_USER_ROLES, {
    variables: {
      did: window.box && window.box.DID
    },
    skip: !window.box
  })

  useEffect(() => {
    const comRoles = data && data.userRoles.filter(role => role.community.txId === communityTxId)

    setRoles(comRoles)
  }, [communityTxId, data])

  const join = async () => {
    if (communityTxId) {
      setIsRoleLoading(true)
      const txId = (await joinCommunity(communityTxId)).data

      const roleUpload = {
        txId: txId,
        communityTxId,
        userDid: window.box.DID,
        role: ROLES.MEMBER
      }

      await uploadRoleToDb({
        variables: {
          role: roleUpload
        },
        refetchQueries: [{
          query: GET_USER_ROLES,
          variables: { did: window.box.DID }
        }]
      })
    }
  }

  if (roles && roles.length) {
    return (
      <div>
        {
          roles.map((role, i) => {
            return (
              <RoleTile
                role={role.role}
                txBlockHash={role.transaction.blockHash}
                key={i}
              />
            )
          })
        }
      </div>
    )
  }

  if (isRoleLoading) {
    return (
      <JoinButton
        disableElevation
        color='primary'
        variant='contained'
      >
        <UploadProgress
          style={{
            width: '1em',
            height: '1em'
          }}
        />
      </JoinButton>
    )
  }

  return (
    <>
      {isLoggedIn && isOpen &&
        <JoinButton
          onClick={join}
          disableElevation
          color='primary'
          variant='contained'
        >
          JOIN
        </JoinButton>
      }
    </>
  )
}

const pendingDescription = 'The transaction has been sent to the network but is not yet confirmed.'

const RoleTile = ({ role, txBlockHash }) => {
  if (!txBlockHash) {
    const label = `${role.toUpperCase()}`

    return (
      <Tooltip title={pendingDescription} placement='top' enterDelay={200}>
        <PendingRoleChip label={label} />
      </Tooltip>
    )
  }

  return (
    <RoleChip label={role.toUpperCase()} />
  )
}

export default RoleStatus
