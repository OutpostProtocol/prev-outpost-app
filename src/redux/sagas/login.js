import {
  put,
  all,
  takeLatest
} from 'redux-saga/effects'
import {
  LOGIN_ASYNC,
  SET_IS_LOGGED_IN,
  SET_IS_LOADING
} from '../../redux/actionTypes'
import Box from '3box'

function * tryLogin (action) {
  try {
    yield put({ type: SET_IS_LOADING, isLoading: true })
    const address = action.account
    const box = yield Box.openBox(address, window.web3.provider)
    window.box = box

    yield all([
      put({ type: SET_IS_LOADING, isLoading: false }),
      put({ type: SET_IS_LOGGED_IN, isLoggedIn: true })
    ])
  } catch (e) {
    yield put({ type: SET_IS_LOADING, isLoading: false })
    console.error(e)
  }
}

export default function * login () {
  yield takeLatest(LOGIN_ASYNC, tryLogin)
}
