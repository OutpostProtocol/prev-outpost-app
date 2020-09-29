import React from 'react'
import { styled } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

import SEO from './seo'

const ProgressContainer = styled('div')({
  display: 'flex',
  height: '100vh',
  'align-items': 'center',
  'justify-content': 'center'
})

const PageLoading = ({ title, description, image, canonicalLink }) => {
  return (
    <div>
      <SEO
        title={title}
      />
      <ProgressContainer>
        <CircularProgress />
      </ProgressContainer>
    </div>
  )
}

export default PageLoading
