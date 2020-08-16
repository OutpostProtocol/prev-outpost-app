import React from 'react'
import { useCommunities } from '../../hooks'
import { styled } from '@material-ui/core/styles'

import CommunityTile from '../CommunityTile'

const Heading = styled('h4')({
  margin: '20px 0px 10px 10%',
  color: '#999',
  'font-weight': 100
})

const Container = styled('div')({
  'overflow-y': 'scroll',
  'max-height': 'calc(100vh - 170px)'
})

const CommunityView = () => {
  const { data, loading, error } = useCommunities()

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const communities = data.community

  return (
    <Container>
      { communities &&
        <>
          <Heading>
            COMMUNITIES
          </Heading>
        </>
      }
      {communities && communities.map((community, i) => {
        return (
          <CommunityTile
            community={community}
            key={i}
          />
        )
      })}
    </Container>
  )
}

export default CommunityView
