export default function validate ({ modules, input: { moduleName, fields, error }, output }) {
  const driverModule = modules['cerebral-module-ui-driver']

  let isValid = driverModule.get([moduleName, 'isValid'])

  if (error) {
    isValid = false
    driverModule.state.set([moduleName, 'error'], error)
    driverModule.state.set([moduleName, 'isValid'], isValid)
  }

  fields.forEach(field => {
    isValid = isValid && field.isValid
    driverModule.state.set(`${moduleName}.fields.${field.name}`, field)
  })

  driverModule.state.set([moduleName, 'isValidating'], false)
  driverModule.state.set([moduleName, 'isValid'], isValid)

  return isValid ? output.success() : output.error()
}
