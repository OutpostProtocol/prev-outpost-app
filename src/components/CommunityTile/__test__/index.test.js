import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'

import CommunityTile from '../index'

describe('Community Tile', () => {
  const state = { isLoggedIn: true }
  const mockStore = configureStore()
  const store = mockStore(state)

  const sampleCommunity = {
    symbol: 'ABC',
    name: 'Sample Community',
    address: '0x0',
    visible: true
  }

  test('Renders title correctly', () => {
    const { getByTestId } = render(<Provider store={store}><CommunityTile
      remove={null}
      handleToggle={null}
      community={sampleCommunity} /></Provider>)
    expect(getByTestId('communityTitle')).toHaveTextContent('Sample Community (ABC)')
  })
})
