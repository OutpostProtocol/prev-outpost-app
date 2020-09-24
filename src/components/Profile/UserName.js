import React from 'react'

import { useUser } from '../../hooks'
import { shortenAddress } from '../../utils'

const UserName = ({ ethAddr }) => {
  const { data } = useUser(ethAddr)
  const name = (data && data.user && data.user.name) ? data.user.name : shortenAddress(ethAddr)

  return (
    <span>
      {name}
    </span>
  )
}

export default UserName
