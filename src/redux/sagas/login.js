import { takeLatest, put } from 'redux-saga/effects'
import Box from '3box'

import { LOGIN_ASYNC, SET_ETHERS, SET_IS_LOGGED_IN, SET_COMMUNITIES } from '../../redux/actionTypes'
import { DEFAULT_SPACE, COMMUNITIES, DEFAULT_COMMUNITY } from '../../constants'

function * tryLogin (action) {
  const { provider } = action.library
  const address = provider.selectedAddress
  const box = yield Box.create(provider)
  yield box.auth([DEFAULT_SPACE], { address })
  const space = yield box.openSpace(DEFAULT_SPACE)
  window.box = box
  window.space = space

  const communities = yield space.public.get(COMMUNITIES)

  if (communities) yield put({ type: SET_COMMUNITIES, communities })
  else yield window.space.public.set(COMMUNITIES, [DEFAULT_COMMUNITY])

  yield put({ type: SET_ETHERS, library: action.library })
  yield put({ type: SET_IS_LOGGED_IN, isLoggedIn: true })
}

export default function * login () {
  yield takeLatest(LOGIN_ASYNC, tryLogin)
}
