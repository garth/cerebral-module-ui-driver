export default function validate (args) {
  const { modules, input: { moduleName, fields, error }, output } = args
  const driverModule = modules['cerebral-module-ui-driver']
  const formModule = modules[moduleName]
  const form = formModule.meta.form

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

  if (typeof form.afterValidate === 'function') {
    form.afterValidate(args)
  }

  return isValid ? output.success() : output.error()
}
