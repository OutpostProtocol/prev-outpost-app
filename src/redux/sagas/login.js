import {
  takeLeading,
  put,
  all
} from 'redux-saga/effects'
import {
  LOGIN_ASYNC,
  SET_IS_LOGGED_IN,
  SET_COMMUNITIES
} from '../../redux/actionTypes'
import {
  DEFAULT_SPACE,
  COMMUNITIES,
  DEFAULT_COMMUNITY
} from '../../constants'
import Box from '3box'

function * tryLogin (action) {
  try {
    const address = action.account
    console.log('opening box')
    const box = yield Box.openBox(address, window.web3.provider)
    console.log('box opened, opening space')
    const space = yield box.openSpace(DEFAULT_SPACE)
    console.log('space opened, syncing space')
    yield space.syncDone
    console.log('space synced, setting state')
    window.space = space

    let communities = yield space.public.get(COMMUNITIES)
    if (!Array.isArray(communities)) {
      communities = [DEFAULT_COMMUNITY]
      yield window.space.public.set(COMMUNITIES, communities)
    }

    yield all([
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
