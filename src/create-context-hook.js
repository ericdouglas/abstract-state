import { useContext } from 'react'

function createContextHook(hookName, providerName, context) {
  const contextRef = useContext(context)

  if (contextRef === undefined)
    throw new Error(`${hookName} must be used within a ${providerName}`)

  return contextRef
}

export default createContextHook
