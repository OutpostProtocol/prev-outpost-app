import {
  takeLatest,
  put
} from 'redux-saga/effects'
import {
  ADD_COMMUNITY_ASYNC,
  ADD_COMMUNITY
} from '../actionTypes'
import { COMMUNITIES } from '../../constants'

function * tryAdd (action) {
  try {
    const { name, moderatorAddress, isOpenToView, isOpenToPost } = action.community
    let thread
    if (isOpenToView) {
      thread = yield window.space.joinThread(name, {
        firstModerator: moderatorAddress,
        members: !isOpenToPost
      })
    } else {
      thread = yield window.space.joinThread(name, {
        firstModerator: moderatorAddress,
        confidential: true
      })
    }

    yield window.space.subscribeThread(thread.address)

    const community = {
      ...action.community,
      address: thread.address
    }

    const communities = yield window.space.public.get(COMMUNITIES)

    yield Array.isArray(communities)
      ? window.space.public.set(COMMUNITIES, [
        ...communities,
        community
      ])
      : window.space.public.set(COMMUNITIES, [
        community
      ])
    yield put({ type: ADD_COMMUNITY, community })
  } catch (e) {
    console.error(e)
  }
}

export default function * addCommunity () {
  yield takeLatest(ADD_COMMUNITY_ASYNC, tryAdd)
}
