import React, { createContext } from 'react'
import onli, { onliSend } from 'onli-reducer'
import { useImmerReducer } from 'use-immer'

import createContextHook from './create-context-hook'

const abstract = (actions = {}, initialState, moduleName = '') => {
  const useModuleStateName = `use${moduleName}State`
  const useModuleActionsName = `use${moduleName}Actions`
  const providerName = `${moduleName}Provider`

  const StateContext = createContext({})
  const ActionsContext = createContext({})

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

  return {
    Provider,
    [useModuleStateName]: () =>
      createContextHook(useModuleStateName, providerName, StateContext),
    [useModuleActionsName]: () =>
      createContextHook(useModuleActionsName, providerName, ActionsContext),
  }
}

export default abstract
