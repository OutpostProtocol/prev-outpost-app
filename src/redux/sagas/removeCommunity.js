import { takeEvery, put } from 'redux-saga/effects'
import { SET_COMMUNITIES, REMOVE_COMMUNITY_ASYNC } from '../actionTypes'
import { COMMUNITIES } from '../../constants'

function * tryRemove (action) {
  try {
    let communities = yield window.space.public.get(COMMUNITIES)

    communities = communities.filter(com => com.abbr !== action.abbr)
    yield window.space.public.set(COMMUNITIES, communities)

    yield put({ type: SET_COMMUNITIES, communities })
  } catch (e) {

  }
}

export default function * removeCommunity () {
  yield takeEvery(REMOVE_COMMUNITY_ASYNC, tryRemove)
}
