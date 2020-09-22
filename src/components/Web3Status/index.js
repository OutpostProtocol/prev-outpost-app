import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import { styled } from '@material-ui/core/styles'
import store from 'store'
import { Button } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import {
  useMutation, gql
} from '@apollo/client'

import {
  LOGIN_TOKEN, ERROR_TYPES
} from '../../constants'
import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'
import usePrevWallet from '../../hooks/usePrevWallet'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
})

const SIGN_IN_TOKEN = gql`
  mutation getToken($addr: String!) {
    getSignInToken(addr: $addr)
  }
`

const AUTHENTICATE = gql`
  mutation auth($sig: String!, $addr: String!) {
    authAccount(signature: $sig, addr: $addr)
  }
`

const Web3Status = () => {
  const { active, account, library } = useWeb3React()
  const [getToken] = useMutation(SIGN_IN_TOKEN)
  const [authAccount] = useMutation(AUTHENTICATE)
  const [curAccount, setCurAccount] = useState()
  usePrevWallet()

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const mixpanel = useMixpanel()

  const checkError = useCallback(
    (loginRes) => {
      const { error } = loginRes
      if (error) {
        const info = {
          type: ERROR_TYPES.login,
          message: error.message
        }
        mixpanel.track('ERROR', info)
        return true
      }
      return false
    },
    [mixpanel]
  )

  useEffect(() => {
    const fetchToken = async () => {
      const tokenRes = await getToken({
        variables: {
          addr: account
        }
      })

      checkError(tokenRes)
      const token = tokenRes.data.getSignInToken
      const signer = library.getSigner()
      const sig = await signer.signMessage(token)

      const authRes = await authAccount({
        variables: {
          sig,
          addr: account
        }
      })

      checkError(authRes)
      store.set(`${LOGIN_TOKEN}.${account}`, authRes.data.authAccount)
      mixpanel.identify(account)
    }

    // if the account changes check if we have an auth token for the account
    if (account !== curAccount) {
      setCurAccount(account)

      const curToken = store.get(`${LOGIN_TOKEN}.${account}`)
      if (!curToken) {
        fetchToken()
      }
    }
  }, [account, curAccount, setCurAccount, getToken, authAccount, library, checkError, mixpanel])

  const SignInButton = () => {
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
      {(!active || !account)
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
