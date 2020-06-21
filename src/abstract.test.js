import abstract from './abstract'

const increment = (state, value) => state + value
const decrement = (state, value) => state - value

const actions = { increment, decrement }
const initialState = 10
const moduleName = 'Test'

describe('abstract', () => {
  const { Provider, useTestState, useTestActions } = abstract(
    actions,
    initialState,
    moduleName,
  )

  it('should return a provider and two custom hooks', () => {
    expect(Provider).toBeTruthy()

    expect(useTestActions).toBeTruthy()
    expect(typeof useTestActions).toBe('function')

    expect(useTestState).toBeTruthy()
    expect(typeof useTestState).toBe('function')
  })
})
