import React from 'react'
import { useCommunities } from '../../hooks'
import { styled } from '@material-ui/core/styles'

import CommunityTile from '../CommunityTile'

const Heading = styled('h4')({
  margin: '20px 0px 10px 10%',
  color: '#c4c4c4',
  'font-weight': 100
})

const CommunityView = () => {
  const { data, loading, error } = useCommunities()

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const communities = data.Community

  return (
    <>
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
    </>
  )
}

export default CommunityView
