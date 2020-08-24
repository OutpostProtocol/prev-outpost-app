import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon
} from 'outpost-react-share'

const BUTTON_SIZE = 30

const ShareContainer = styled('div')({
  'margin-top': '15px'
})

const ShareButtonContainer = styled('span')({
  'border-radius': '50%',
  'margin-right': '10px',
  outline: 'none'
})

const LinkButton = styled('button')({
  height: `${BUTTON_SIZE - 1}px`,
  width: `${BUTTON_SIZE - 1}px`,
  'border-radius': '50%',
  padding: 0,
  'background-color': '#1a1a1a',
  cursor: 'pointer',
  border: 'none',
  position: 'relative',
  bottom: '10px'
})

const Share = ({ url, title, description }) => {
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ShareContainer>
      <ShareButtonContainer>
        <LinkButton
          onClick={handleCopy}
        >
          <FontAwesomeIcon
            icon={faLink}
            color='#f7f6f3'
          />
        </LinkButton>
      </ShareButtonContainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='success'>
        Link copied
        </Alert>
      </Snackbar>
      <ShareButtonContainer>
        <TwitterShareButton
          url={url}
          title={title}
          hasBlankTarget={true}
        >
          <TwitterIcon
            size={BUTTON_SIZE}
            round={true}
            bgStyle={{
              fill: '#1a1a1a'
            }}
          />
        </TwitterShareButton>
      </ShareButtonContainer>
      <ShareButtonContainer>
        <RedditShareButton
          url={url}
          title={title}
          hasBlankTarget={true}
        >
          <RedditIcon
            size={BUTTON_SIZE}
            round={true}
            bgStyle={{
              fill: '#1a1a1a'
            }}
          />
        </RedditShareButton>
      </ShareButtonContainer>
    </ShareContainer>
  )
}

export default Share
