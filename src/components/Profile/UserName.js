import React from 'react'

import { useUser } from '../../hooks'
import { shortenAddress } from '../../utils'

const UserName = ({ userDid }) => {
  const { data } = useUser(userDid)
  const name = (data && data.user && data.user.name) ? data.user.name : shortenAddress(userDid)

  return (
    <span>
      {name}
    </span>
  )
}

export default UserName
