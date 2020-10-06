import React, {
  createContext, useReducer, useCallback
} from 'react'

const SET_TOKEN = 'SET_TOKEN'
const SET_IS_GETTING_TOKEN = 'SET_IS_GETTING_TOKEN'

function reducer (state, { type, payload }) {
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        authToken: payload.token
      }
    case SET_IS_GETTING_TOKEN:
      return {
        ...state,
        isGettingToken: payload.isGettingToken
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const AuthContext = createContext({
  setAuthToken: () => {
    throw new Error('No auth provider found.')
  },
  setIsGettingToken: () => {
    throw new Error('No auth provider found.')
  },
  isGettingToken: false,
  authToken: null
})
AuthContext.displayName = 'AuthContext'

export function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, {})
  const { authToken, isGettingToken } = state

  const setAuthToken = useCallback(
    (token) => {
      dispatch({ type: SET_TOKEN, payload: { token } })
    },
    []
  )

  const setGettingToken = useCallback(
    (isGettingToken) => {
      dispatch({ type: SET_IS_GETTING_TOKEN, payload: { isGettingToken } })
    },
    []
  )

  return (
    <AuthContext.Provider
      value={{
        setAuthToken,
        setGettingToken,
        authToken,
        isGettingToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
