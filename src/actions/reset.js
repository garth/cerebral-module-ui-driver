export default (moduleName) => function resetDriver ({ module, modules, state }) {
  const driverModule = modules['cerebral-module-ui-driver']
  state.set([...driverModule.path, moduleName], {})
}
