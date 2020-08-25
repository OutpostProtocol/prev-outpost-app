import React from 'react'
<<<<<<< HEAD
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import moment from 'moment'
=======
>>>>>>> dfe80949e43d123cc914e51d39d603c645290b9a
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { CreateOutlined } from '@material-ui/icons'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import Share from '../Share'
import PendingChip from '../PendingChip'
import PostContext from '../PostContext'

const PostContainer = styled('div')({
  padding: '10px',
  marginTop: '5px',
  'border-radius': '4px'
})

<<<<<<< HEAD
const ProfileContainer = styled('div')({
  float: 'right',
  display: 'flex',
  justifyContent: 'center',
  'margin-left': 'auto'
})

const PostMetaData = styled('span')({
  display: 'block'
})

=======
>>>>>>> dfe80949e43d123cc914e51d39d603c645290b9a
const PostContent = styled('div')({
  marginTop: '5vh',
  'line-height': '1.5em',
  'font-size': '1.1em'
})

const PostHeader = styled('div')({
  height: '100%',
  'align-items': 'center',
  'margin-top': '10px'
})

const Title = styled('h1')({
  margin: 0,
  'font-size': '40px',
  '@media only screen and (max-width: 700px)': {
    'font-size': '18px'
  }
})

const TitleContainer = styled('div')({
  display: 'flex',
  'margin-bottom': '10px'
})

const SubHeader = styled('div')({
  display: 'flex',
  'justify-content': 'space-between'
})

const EditButton = styled(IconButton)({
  'margin-right': '10px'
})
const pendingDescription = 'The post has been sent to the network but has not yet been confirmed.'

const Post = ({ post }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const { title, subtitle, postText, user } = post
  const did = useSelector(state => state.did)

  const isAuthor = () => {
    return user && user.did && post.user.did === did
  }

  const handleEdit = () => {
    navigate('/editor', { state: { post } })
  }

  return (
    <PostContainer>
      <PostHeader>
        <PostMetaData>
          <TitleContainer>
            <Title color='primary'>
              {title}
            </Title>
            <PendingChip
              isPending={!post.transaction.blockHash}
              description={pendingDescription}
            />
          </TitleContainer>
          <PostCommunityAndDate>
            {post.community.name} · {time}
          </PostCommunityAndDate>
        </PostMetaData>
        { isAuthor() &&
          <EditButton
            onClick={handleEdit}
          >
            <CreateOutlined />
          </EditButton>
        }
        <SubHeader>
          <PostContext
            userDid={post.user.did}
            communityName={post.community.name}
            timestamp={post.timestamp}
          />
          <Share
            url={window.location.href}
            title={title}
            description={subtitle}
          />
        </SubHeader>
      </PostHeader>
      <PostContent>
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(postText).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default Post
