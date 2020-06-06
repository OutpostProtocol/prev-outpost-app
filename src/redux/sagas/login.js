import { takeLeading, put, all } from 'redux-saga/effects'
import Box from '3box'
import { LOGIN_ASYNC, SET_ADDR, SET_IS_LOGGED_IN, SET_COMMUNITIES } from '../../redux/actionTypes'
import { DEFAULT_SPACE, COMMUNITIES, DEFAULT_COMMUNITY } from '../../constants'

function * tryLogin () {
  try {
    const provider = window.web3.provider

    const box = yield Box.openBox(provider.selectedAddress, provider)
    const space = yield box.openSpace(DEFAULT_SPACE)
    window.space = space

    let communities = yield space.public.get(COMMUNITIES)
    if (!Array.isArray(communities)) {
      communities = [DEFAULT_COMMUNITY]
      yield window.space.public.set(COMMUNITIES, communities)
    }

    yield all([
      put({ type: SET_ADDR, address: provider.selectedAddress }),
      put({ type: SET_COMMUNITIES, communities }),
      put({ type: SET_IS_LOGGED_IN, isLoggedIn: true })
    ])
  } catch (e) {
    console.error(e)
  }
}

export default function * login () {
  yield takeLeading(LOGIN_ASYNC, tryLogin)
}
