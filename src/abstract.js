import React, { createContext } from 'react'
import onli, { onliSend } from 'onli-reducer'
import { useImmerReducer } from 'use-immer'

import createContextHook from './create-context-hook'
// import ProviderFactory from './provider-factory'

/**
 * Generate two providers (state and actions) and two custom hooks to connect to them
 *
 * @param {Object} actions
 * @param {*} initialState
 * @param {string} moduleName
 * @returns {{ ReactNode, () => any, () => any }} returns a Provider and two custom hooks
 * Name of custom hooks will be based on the `moduleName` passed to the abstract function
 */
const abstract = (actions, initialState, moduleName) => {
  const useModuleStateName = `use${moduleName}State`
  const useModuleActionsName = `use${moduleName}Actions`
  const providerName = `${moduleName}Provider`

  const StateContext = createContext({})
  const ActionsContext = createContext({})

  // eslint-disable-next-line react/prop-types
  const Provider = ({ children }) => {
    const [reducer, types] = onli(actions)
    const [state, dispatch] = useImmerReducer(reducer, initialState)
    const send = onliSend(dispatch, types)

    return (
      <StateContext.Provider value={state}>
        <ActionsContext.Provider value={send}>
          {children}
        </ActionsContext.Provider>
      </StateContext.Provider>
    )
  }

  // const Provider = ProviderFactory(
  //   actions,
  //   initialState,
  //   StateContext,
  //   ActionsContext,
  // )

  return {
    Provider,
    [useModuleStateName]: () =>
      createContextHook(useModuleStateName, providerName, StateContext),
    [useModuleActionsName]: () =>
      createContextHook(useModuleActionsName, providerName, ActionsContext),
  }
}

export default abstract
