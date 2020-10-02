import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'
import LockOpenIcon from '@material-ui/icons/LockOpen'

import { use3boxProf } from '../../hooks/use3boxProf'

const PostContainer = styled('div')({
  padding: '10px',
  'border-radius': '4px',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafa'
  },
  display: 'flex',
  border: '1px solid #F0F0F0',
  position: 'relative',
  margin: '10px 0',
  'min-height': '140px',
  '@media only screen and (max-width: 800px)': {
    'flex-direction': 'column'
  }
})

const FeaturedImage = styled('img')({
  height: '120px',
  'border-radius': '10px'
})

const ImgContainer = styled('div')({
  height: '120px',
  'max-width': '250px',
  overflow: 'hidden',
  'border-radius': '10px'
})

const FixedImgWidth = styled('div')({
  width: '250px'
})

const PostInfo = styled('div')({
  position: 'relative',
  'margin-left': '20px'
})

const Title = styled('h3')({
  'margin-block-end': '0.5em'
})

const Subtitle = styled('div')({})

const Context = styled('div')({
  position: 'absolute',
  bottom: '0',
  display: 'flex',
  '@media only screen and (max-width: 800px)': {
    position: 'static',
    'padding-top': '15px'
  }
})

const Author = styled('div')({
  'margin-right': '20px',
  'min-width': '125px'
})

const Date = styled('div')({
  'min-width': '250px'
})

const Requirement = styled('div')({
  position: 'absolute',
  top: '0',
  right: '10px',
  color: '#9A9A99',
  'font-size': '0.75em'
})

const StyledLock = styled(LockOpenIcon)({
  position: 'relative',
  top: '5px',
  'margin-right': '10px'
})

const DATE_FORMAT = 'MMMM D YYYY'

const PostPreview = ({ post }) => {
  const { title, subtitle, user, featuredImg, timestamp, community } = post
  const { name } = use3boxProf(user.address)

  const handleRedirect = () => {
    const url = '/post/' + post.txId
    navigate(url)
  }

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      {featuredImg &&
        <FixedImgWidth>
          <ImgContainer>
            <FeaturedImage src={featuredImg} alt={`featured image for ${title}`} />
          </ImgContainer>
        </FixedImgWidth>
      }
      <PostInfo>
        <Title>
          {title}
        </Title>
        <Subtitle>
          {subtitle}
        </Subtitle>
        <Context>
          <Author>
            {name}
          </Author>
          <Date>
            {moment.unix(timestamp).format(DATE_FORMAT)}
          </Date>
        </Context>
      </PostInfo>
      <Requirement>
        <StyledLock />
        REQUIRES {community.readRequirement} ${community.tokenSymbol}
      </Requirement>
    </PostContainer>
  )
}

export default PostPreview
