import React from 'react'
import { styled } from '@material-ui/core/styles'

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share'

const ShareContainer = styled('div')({
  'margin-top': '15px'
})
const ShareButtonContainer = styled('span')({
  'border-radius': '50%',
  'margin-right': '10px'
})

const Share = ({ url, title, description }) => {
  const BUTTON_SIZE = 30

  return (
    <ShareContainer>
      <ShareButtonContainer>
        <EmailShareButton
          url={url}
          subject={title}
          body={description}
          seperator='\n'
        >
          <EmailIcon
            size={BUTTON_SIZE}
            round={true}
          />
        </EmailShareButton>
      </ShareButtonContainer>
      <ShareButtonContainer>
        <TwitterShareButton
          url={url}
          title={title}
          hashtags={['OutpostProtocol']}
        >
          <TwitterIcon
            size={BUTTON_SIZE}
            round={true}
          />
        </TwitterShareButton>
      </ShareButtonContainer>
      <ShareButtonContainer>
        <FacebookShareButton
          url={url}
          hashtag='OutpostProtocol'
          quote={description}
        >
          <FacebookIcon
            size={BUTTON_SIZE}
            round={true}
          />
        </FacebookShareButton>
      </ShareButtonContainer>
      <ShareButtonContainer>
        <RedditShareButton
          url={url}
          title={title}
        >
          <RedditIcon
            size={BUTTON_SIZE}
            round={true}
          />
        </RedditShareButton>
      </ShareButtonContainer>
    </ShareContainer>
  )
}

export default Share
