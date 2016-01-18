export default function ({ module, modules, state, props }) {
  const driverModule = modules['cerebral-module-ui-driver']
  const driverOptions = driverModule.meta.options
  const propsMaps = driverModule.meta.propsMaps
  return driverOptions.bindingTypes.reduce((bindings, binding) => {
    bindings[binding] = driverOptions.bindings[binding]({
      driverModule,
      formModule: module,
      state,
      props,
      propsMap: propsMaps[binding]
    })
    return bindings
  }, {})
}
