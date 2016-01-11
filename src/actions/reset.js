export function resetFormDriver (statePath) {
  const formPath = Array.isArray(statePath) ? statePath : [statePath]
  const driverPath = ['drivers', ...formPath]
  const validationPath = [...formPath, 'validation']
  return function resetForm ({ state }) {
    state.set(driverPath, {})
    state.unset(validationPath)
  }
}
