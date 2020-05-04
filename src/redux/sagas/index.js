import { all } from 'redux-saga/effects'
import addCommunity from './addCommunity'
import removeCommunity from './removeCommunity'
import login from './login'

export default function * rootSaga () {
  yield all([
    addCommunity(),
    removeCommunity(),
    login()
  ])
}
