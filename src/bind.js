export default function ({ modules, state, props }) {
  const driverModule = modules[state.meta.driverModuleName]
  const driverOptions = driverModule.meta.options
  const propsMaps = driverModule.meta.propsMaps
  return driverOptions.bindingTypes.reduce((bindings, binding) => {
    bindings[binding] = driverOptions.bindings[binding]({
      driverModule,
      formModule: modules[state.meta.formModuleName],
      state,
      props,
      propsMap: propsMaps[binding]
    })
    return bindings
  }, {})
}
