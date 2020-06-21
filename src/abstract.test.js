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
    expect(useTestState).toBeTruthy()
  })
})
