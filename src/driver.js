export default function ({ moduleName, modules, state, props }) {
  const driverModule = modules['cerebral-module-ui-driver']
  const formModule = modules[moduleName]
  const driverOptions = driverModule.meta.options
  const propsMaps = driverModule.meta.propsMaps
  return driverOptions.bindingTypes.reduce((bindings, binding) => {
    bindings[binding] = driverOptions.bindings[binding]({
      driverModule,
      formModule,
      state,
      props,
      propsMap: propsMaps[binding]
    })
  }, {})
}
