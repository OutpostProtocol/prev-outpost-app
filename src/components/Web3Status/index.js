import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Button, CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import {
  useLazyQuery, gql
} from '@apollo/client'

import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
})

const SIGN_IN_TOKEN = gql`
  query {
    getSignInToken
  }
`

const Web3Status = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { active, account/*, deactivate */, library } = useWeb3React()
  const [getSignInToken, { data, loading, error }] = useLazyQuery(SIGN_IN_TOKEN)

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const mixpanel = useMixpanel()

  useEffect(() => {
    const login = async () => {
      setIsLoading(true)

      getSignInToken()
    }

    if (active && account && !isLoading) {
      login()
    }
  }, [active, account, isLoading, getSignInToken])

  useEffect(() => {
    const getAuth = async () => {
      const token = data.getSignInToken
      console.log(library, 'THE LIBRARY')
      const signer = library.getSigner()
      const sig = await signer.signMessage(token)
      console.log(sig, 'THE SIGNATURE')

      // mixpanel.identify(account)
    }

    if (data) {
      getAuth()
    }
  }, [data, loading, error])

  useEffect(() => {
    if (isLoading) {
      setIsWalletModalOpen(false)
    }
  }, [isLoading])

  /*
  const handleWalletChange = async () => {
    await window.box.logout()
    console.log('just logged out', !Box.isLoggedIn(account))
    window.box = undefined
    deactivate()
    setIsWalletModalOpen(true)
  }
  */

  const SignInButton = () => {
    if (isLoading) {
      return (
        <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
        >
          <CircularProgress
            color='secondary'
            style={{
              width: '1em',
              height: '1em'
            }}
          />
        </Web3Button>
      )
    }

    return (
      <Web3Button
        variant='outlined'
        color='secondary'
        disableElevation
        onClick={() => setIsWalletModalOpen(true)}
      >
        SIGN IN
      </Web3Button>
    )
  }

  return (
    <Web3Container>
      {(!active || window.box === undefined)
        ? <SignInButton />
        : <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
          style={{
            cursor: 'default'
          }}
        >
          {shortenAddress(account, 5)}
        </Web3Button>
      }
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status
