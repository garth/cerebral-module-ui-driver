export default function resetDriver ({ modules, input: { driverModuleName, moduleName }, state }) {
  const driverModule = modules[driverModuleName]
  const formModule = modules[moduleName]
  state.set([...driverModule.path, ...formModule.path], {})
}
