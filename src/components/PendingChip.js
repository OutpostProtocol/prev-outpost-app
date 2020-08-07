import React from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Chip, Tooltip
} from '@material-ui/core'

const StatusChip = styled(Chip)({
  'border-radius': '4px',
  'background-color': '#FF5252',
  color: '#f1f1f1',
  'margin-left': '20px',
  height: '2em',
  'margin-top': '0.5em'
})

const PendingChip = ({ isPending, description }) => {
  if (isPending) {
    return (
      <Tooltip title={description} placement='top' enterDelay={200}>
        <StatusChip label='PENDING' />
      </Tooltip>
    )
  }

  return null
}

export default PendingChip
