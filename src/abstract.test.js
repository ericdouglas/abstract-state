// import React from 'react'
// import { renderHook } from '@testing-library/react-hooks'

import abstract from './abstract'

const increment = (state, value) => state + value
const decrement = (state, value) => state - value

const actions = { increment, decrement }
const initialState = 0
const moduleName = 'Test'

describe('abstract', () => {
  it('should return a provider and two custom hooks', () => {
    const { Provider, useTestState, useTestActions } = abstract(
      actions,
      initialState,
      moduleName,
    )

    expect(Provider).toBeTruthy()

    expect(useTestActions).toBeTruthy()
    expect(typeof useTestActions).toBe('function')

    expect(useTestState).toBeTruthy()
    expect(typeof useTestState).toBe('function')
  })

  // it('should return the current state when using the custom hook', () => {
  //   const { Provider, useTestState } = abstract(
  //     actions,
  //     initialState,
  //     moduleName,
  //   )
  //   const wrapper = ({ children }) => <Provider>{children}</Provider>
  //   const { result } = renderHook(() => useTestState(), { wrapper })
  //   console.log('result.current :::', result.current)

  //   expect(result.current).toBe(0)
  // })
})
