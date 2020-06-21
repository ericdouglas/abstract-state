import { createContext } from 'react'

import createContextHook from './create-context-hook'
import ProviderFactory from './provider-factory'

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

  const Provider = ProviderFactory(
    actions,
    initialState,
    StateContext,
    ActionsContext,
  )

  return {
    Provider,
    [useModuleStateName]: () =>
      createContextHook(useModuleStateName, providerName, StateContext),
    [useModuleActionsName]: () =>
      createContextHook(useModuleActionsName, providerName, ActionsContext),
  }
}

export default abstract
