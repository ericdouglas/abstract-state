import React from 'react'
import { useImmerReducer } from 'use-immer'
import onli, { onliSend } from 'onli-reducer'

/**
 * Provider factory
 *
 * @param {Object} actions object with actions/methods attached to it
 * @param {*} initialState
 * @param {ReactContext} StateContext
 * @param {ReactContext} ActionsContext
 * @returns {ReactNode} State and Actions Provider with given children inside of it
 */
const ProviderFactory = (
  actions,
  initialState,
  StateContext,
  ActionsContext,
) => ({ children }) => {
  const [reducer, types] = onli(actions)
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const send = onliSend(dispatch, types)

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={send}>{children}</ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export default ProviderFactory
