import { all } from 'redux-saga/effects'
import login from './login'

export default function * rootSaga () {
  yield all([
    login()
  ])
}
