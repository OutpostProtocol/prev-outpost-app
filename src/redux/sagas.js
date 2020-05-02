import { takeLatest, all, put } from 'redux-saga/effects'
import { ADD_COMMUNITY_ASYNC, ADD_COMMUNITY } from './actionTypes'
import { COMMUNITIES } from '../constants'

export function * tryAdd (action) {
  try {
    const { name, moderatorAddress } = action.community
    const thread = yield window.space.joinThread(name, {
      firstModerator: moderatorAddress,
      members: true
    })

    const community = {
      ...action.community,
      address: thread.address
    }

    const communities = yield window.space.public.get(COMMUNITIES)

    /*
    yield communities
      ? window.space.public.set(COMMUNITIES, [
        ...communities,
        community
      ])
      : window.space.public.set(COMMUNITIES, [
        community
      ])
    // check return value and throw error if bad
    */

    yield put({ type: ADD_COMMUNITY, community })
  } catch (e) {

  }
}

export function * addCommunity () {
  yield takeLatest(ADD_COMMUNITY_ASYNC, tryAdd)
}

export default function * rootSaga () {
  yield all([
    addCommunity()
  ])
}
