import { takeLatest, put } from 'redux-saga/effects'
import Box from '3box'
import { LOGIN_ASYNC, SET_ADDR, SET_IS_LOGGED_IN, SET_COMMUNITIES } from '../../redux/actionTypes'
import { DEFAULT_SPACE, COMMUNITIES, DEFAULT_COMMUNITY } from '../../constants'

function * tryLogin (action) {
  /**
   * Creates a 3Box instance using a provider
   * @param {provider} provider Connection to ethereum network
   * @return {Box} Instance of a box
   */
  const getBox = async (provider) => {
    const box = await Box.create(provider)
    await box.syncDone
    return box
  }

  /**
   * Get the default space using a box and ethereum address
   * @param {Box} box
   * @param {String} address
   * @return {Space} Instance of the default space
   */
  const getDefaultSpace = async (box, address) => {
    await box.auth([DEFAULT_SPACE], { address })
    const space = await box.openSpace(DEFAULT_SPACE)
    await space.syncDone
    return space
  }

  /**
   * Add the user to the default community
   * @param {Space} space
   * @param {String} address
   */
  const addToDefaultCommunity = async (space, address) => {
    const thread = await window.space.getThreadByAddress(DEFAULT_COMMUNITY.address)
    await thread.addMember(address)
  }

  try {
    const provider = yield Box.get3idConnectProvider()
    const box = yield getBox(provider) // TODO: Exit provider and unpause
    const address = action.address
    const space = yield getDefaultSpace(box, address)
    window.space = space

    yield put({ type: SET_ADDR, address: address })

    const communities = yield space.public.get(COMMUNITIES)
    if (communities && communities.length > 0) {
      yield put({ type: SET_COMMUNITIES, communities })
    } else {
      addToDefaultCommunity(space, address)
      yield window.space.public.set(COMMUNITIES, [DEFAULT_COMMUNITY])
    }

    yield put({ type: SET_IS_LOGGED_IN, isLoggedIn: true })
  } catch (e) {
    console.error(e)
  }
}

export default function * login () {
  yield takeLatest(LOGIN_ASYNC, tryLogin)
}
