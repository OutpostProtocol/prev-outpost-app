import React, {
  useEffect, useState
} from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import Box from '3box'
import moment from 'moment'
import LockOpenIcon from '@material-ui/icons/LockOpen'

const PostContainer = styled('div')({
  padding: '10px',
  'border-radius': '4px',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#f4f3f0'
  },
  display: 'flex',
  border: '1px solid #F0F0F0',
  position: 'relative',
  margin: '10px 0'
})

const FeaturedImage = styled('img')({
  height: '120px',
  width: '120px',
  'border-radius': '50%',
  'margin-right': '20px'
})

const PostInfo = styled('div')({
  position: 'relative'
})

const Title = styled('h3')({
  'margin-block-end': '0.5em'
})

const Subtitle = styled('div')({})

const Context = styled('div')({
  position: 'absolute',
  bottom: '0',
  display: 'flex'
})

const Author = styled('div')({
  'margin-right': '20px'
})

const Date = styled('div')({
  'min-width': '250px'
})

const Requirement = styled('div')({
  position: 'absolute',
  top: '10px',
  right: '20px',
  color: '#9A9A99'
})

const StyledLock = styled(LockOpenIcon)({
  position: 'relative',
  top: '5px',
  'margin-right': '10px'
})

const DATE_FORMAT = 'MMMM D YYYY'

const PostPreview = ({ post }) => {
  const { title, subtitle, user, featuredImg, timestamp, community } = post
  const [creatorName, setCreatorName] = useState(null)

  const handleRedirect = () => {
    const url = '/post/' + post.txId
    navigate(url)
  }

  useEffect(() => {
    const setProfile = async () => {
      const profile = await Box.getProfile(did)

      if (profile.name) {
        setCreatorName(profile.name)
      }
    }

    const did = user.did

    setProfile()
  }, [user])

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      <FeaturedImage src={featuredImg} alt={`featured image for ${title}`} />
      <PostInfo>
        <Title>
          {title}
        </Title>
        <Subtitle>
          {subtitle}
        </Subtitle>
        <Context>
          <Author>
            {creatorName}
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
