import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'

import CommunityTile from '../CommunityTile'

const Heading = styled('h4')({
  margin: '20px 0px 10px 10%',
  'font-weight': 100
})

const SubHeading = styled('h5')({
  color: '#c4c4c4',
  margin: 0,
  'font-weight': 100,
  'margin-left': '10%'
})

const CommunityView = () => {
  const communities = useSelector(state => state.communities)

  return (
    <>
      { communities.length !== 1 &&
        <>
          <Heading>
            Your Communities
          </Heading>
          <SubHeading>
            Member
          </SubHeading>
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
      { communities.length !== 1 &&
        <SubHeading>
          Following
        </SubHeading>
      }
    </>
  )
}

export default CommunityView
