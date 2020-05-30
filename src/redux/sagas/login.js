import { takeLeading, put, all } from 'redux-saga/effects'
import Box from '3box'
import { LOGIN_ASYNC, SET_ADDR, SET_IS_LOGGED_IN, SET_COMMUNITIES } from '../../redux/actionTypes'
import { DEFAULT_SPACE, COMMUNITIES, DEFAULT_COMMUNITY } from '../../constants'

function * tryLogin (action) {
  try {
    let provider
    // Temporary?
    if (window.web3 && window.web3.currentProvider) {
      provider = window.web3.currentProvider
    } else {
      provider = yield Box.get3idConnectProvider()
    }

    const address = action.address
    const box = yield Box.openBox(address, provider)
    console.log('fuvk slow spaces')
    const space = yield box.openSpace(DEFAULT_SPACE)
    console.log('slowwww')
    window.space = space

    let communities = yield space.public.get(COMMUNITIES)
    if (!communities || communities.length === 0) {
      communities = [DEFAULT_COMMUNITY]
      yield window.space.public.set(COMMUNITIES, communities)
    }

    yield all([
      put({ type: SET_ADDR, address: address }),
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
