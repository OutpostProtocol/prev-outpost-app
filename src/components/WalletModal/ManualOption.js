import React from 'react'
import { styled } from '@material-ui/core/styles'

const Container = styled('div')({
  display: 'flex',
  padding: '0 5%',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafa'
  },
  'max-width': '300px',
  margin: 'auto'
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto',
  height: '50px'
})

const OptionName = styled('h3')({
  'font-weight': 300
})

const ManualOption = ({ wallet, connectWallet }) => {
  return (
    <Container
      onClick={() => connectWallet()}
    >
      <OptionName>
        {wallet.name}
      </OptionName>
      <Logo
        src={wallet.imgSrc}
        alt={wallet.name}
      />
    </Container>
  )
}

export default ManualOption
