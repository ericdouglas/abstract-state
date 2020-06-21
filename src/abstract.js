import { createContext } from 'react'

import createContextHook from './create-context-hook'
import ProviderFactory from './provider-factory'

const abstract = (actions = {}, initialState, moduleName = '') => {
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
