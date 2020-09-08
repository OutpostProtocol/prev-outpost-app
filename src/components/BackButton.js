import React from 'react'
import { styled } from '@material-ui/core/styles'
import { navigate } from 'gatsby'
import { IconButton } from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

const BackIcon = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const BackButton = ({ prevPage }) => {
  return (
    <BackIcon
      color='inherit'
      aria-label='Go back'
      edge='end'
      onClick={() => navigate(prevPage)}
    >
      <ChevronLeft />
    </BackIcon>
  )
}

export default BackButton
