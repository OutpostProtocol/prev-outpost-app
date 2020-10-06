import {
  useCallback, useContext
} from 'react'
import store from 'store'
import {
  ERROR_TYPES, LOGIN_TOKEN
} from '../constants'
import { useWeb3React } from '@web3-react/core'
import {
  useMutation, gql
} from '@apollo/client'
import { ethers } from 'ethers'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import { AuthContext } from '../context/Auth'

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

// validate token isn't really a mutation but we want it to execute like one
const VALIDATE_TOKEN = gql`
  mutation validate($token: String!) {
    verifyToken(token: $token)
  }
`

const useAuth = () => {
  const { setAuthToken, authToken, setGettingToken, isGettingToken } = useContext(AuthContext)
  const { account, library } = useWeb3React()
  const [getAuthToken] = useMutation(SIGN_IN_TOKEN)
  const [authAccount] = useMutation(AUTHENTICATE)
  const [validateToken] = useMutation(VALIDATE_TOKEN)
  const mixpanel = useMixpanel()

  const checkError = useCallback(
    (loginRes) => {
      const { error } = loginRes
      if (error) {
        const info = {
          type: ERROR_TYPES.login,
          message: error.message
        }
        console.log(error.message, 'THE ERROR MESSAGE IN CHECK ERROR WEB3 STATUS')
        mixpanel.track('ERROR', info)
        return true
      }
      return false
    },
    [mixpanel]
  )

  const validate = useCallback(
    async (token) => {
      const validation = await validateToken({
        variables: {
          token
        }
      })

      if (validation.data.verifyToken) {
        return true
      } else {
        return false
      }
    },
    [validateToken]
  )

  const fetchToken = async () => {
    setGettingToken(true)
    const tokenRes = await getAuthToken({
      variables: {
        addr: account
      }
    })

    checkError(tokenRes)
    let token = tokenRes.data.getSignInToken
    const signer = library.getSigner()

    let sig
    try {
      // signMessage with wc causes issues -.-
      if (library.provider.wc?.protocol === 'wc') {
        // convert token to hex to send
        token = ethers.utils.hexlify(Buffer.from(token, 'utf8'))
        sig = await library.provider.send('personal_sign', [token, account])
      } else {
        sig = await signer.signMessage(token)
      }
    } catch (e) {
      setGettingToken(false)
      return
    }

    const authRes = await authAccount({
      variables: {
        sig,
        addr: account
      }
    })

    checkError(authRes)
    store.set(`${LOGIN_TOKEN}.${account}`, authRes.data.authAccount)
    setAuthToken(authRes.data.authAccount)
    mixpanel.identify(account)
    setGettingToken(false)
    return authRes.data.authAccount
  }

  return {
    fetchToken,
    isGettingToken,
    checkToken: validate,
    authToken,
    setAuthToken
  }
}

export default useAuth
