export default (driverModuleName, formModuleName) => {
  const state = (get) => {
    return {
      driver: get(driverModuleName.split('.')),
      form: get(formModuleName.split('.')),
      meta: {
        driverModuleName,
        driverModulePath: driverModuleName.split('.'),
        formModuleName,
        formModulePath: formModuleName.split('.')
      }
    }
  }

  state.computedRef = `${driverModuleName} ${formModuleName}`

  return state
}
