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

const Container = styled('div')({
  'margin-top': '15px',
  '@media only screen and (max-width: 1000px)': {
    display: 'none'
  }
})

const ButtonContainer = styled('span')({
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
    <Container>
      <ButtonContainer>
        <LinkButton
          onClick={handleCopy}
        >
          <FontAwesomeIcon
            icon={faLink}
            color='#FFFFFE'
          />
        </LinkButton>
      </ButtonContainer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity='success'>
        Link copied
        </Alert>
      </Snackbar>
      <ButtonContainer>
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
      </ButtonContainer>
      <ButtonContainer>
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
      </ButtonContainer>
    </Container>
  )
}

export default Share
