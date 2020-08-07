import React from 'react'
import {
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const LoadingContainer = styled(Backdrop)({
  'z-index': 1200
})

const LoadingBackdrop = ({ isLoading }) => {
  return (
    <LoadingContainer
      open={isLoading}
    >
      <CircularProgress
        disableShrink
      />
    </LoadingContainer>
  )
}

export default LoadingBackdrop
