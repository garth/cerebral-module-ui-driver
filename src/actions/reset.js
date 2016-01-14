export default function resetDriver ({ module, modules }) {
  const driverModule = modules['cerebral-module-ui-driver']
  driverModule.state.set(module.name, {})
}
