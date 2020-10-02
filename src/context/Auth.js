import React, {
  createContext, useReducer, useCallback
} from 'react'

const SET_TOKEN = 'setToken'

function reducer (state, { type, payload }) {
  switch (type) {
    case SET_TOKEN:
      return {
        authToken: payload.token
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export const AuthContext = createContext({
  setAuthToken: () => {
    throw new Error('No auth provider found.')
  },
  authToken: null
})
AuthContext.displayName = 'AuthContext'

export function AuthProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, {})
  const { authToken } = state

  const setAuthToken = useCallback(
    (token) => {
      dispatch({ type: SET_TOKEN, payload: { token } })
    },
    []
  )

  return <AuthContext.Provider value={{ setAuthToken, authToken }}>{children}</AuthContext.Provider>
}
