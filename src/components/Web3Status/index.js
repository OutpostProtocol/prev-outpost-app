import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ethers } from 'ethers'
import { styled } from '@material-ui/core/styles'
import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import ProviderSelector from '../ProviderSelector'

const Web3Button = styled(Button)({
  width: '80%',
  'margin-left': '10%',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
  width: '100%'
})

const ProgressContainer = styled(Backdrop)({
  'z-index': 5
})

const Web3Status = () => {
  const address = useSelector(state => state.address)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const getAddress = async () => {
    try {
      window.web3 = new ethers.providers.Web3Provider(await ProviderSelector())
      return window.web3.provider.selectedAddress
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const signIn = async () => {
    const address = await getAddress()
    if (address) {
      setIsLoading(true)
      dispatch({ type: LOGIN_ASYNC, address })
    }
  }

  if (isLoggedIn) {
    return (
      <Web3Button
        disableElevation
        color='primary'
        variant='contained'
        disableRipple={true}
      >
        <div>{shortenAddress(address)}</div>
      </Web3Button>
    )
  } else {
    return (
      <Web3Container>
        <ProgressContainer open={isLoading && !isLoggedIn}>
          <CircularProgress />
        </ProgressContainer>
        <Web3Button
          onClick={signIn}
          variant='contained'
          disableElevation
          color='primary'
        >
          Sign In
        </Web3Button>
      </Web3Container>
    )
  }
}

export default Web3Status
