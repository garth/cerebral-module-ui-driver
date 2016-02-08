export default function endValidate (args) {
  const { modules, input: { driverModuleName, moduleName, fields, error, fieldNames, validateForm }, state, output } = args
  const driverModule = modules[driverModuleName]
  const formModule = modules[moduleName]
  const form = formModule.meta.form
  const driverOptions = driverModule.meta.options
  const formOptions = form.driverOptions || {}

  let isValid = !state.get([...driverModule.path, ...formModule.path, 'error'])

  if (error) {
    isValid = false
    state.set([...driverModule.path, ...formModule.path, 'error'], error)
    state.set([...driverModule.path, ...formModule.path, 'isValid'], isValid)
  }

  fields.forEach((field) => {
    isValid = isValid && field.isValid
    state.set([...driverModule.path, ...formModule.path, 'fields', field.name], field)
  })

  state.set([...driverModule.path, ...formModule.path, 'isValidating'], false)
  state.set([...driverModule.path, ...formModule.path, 'error'], isValid ? null : formOptions.invalidMessage || driverOptions.invalidMessage)

  if (typeof form.onAfterValidate === 'function') {
    form.onAfterValidate(Object.assign({}, args, {
      fields: fieldNames,
      isValid,
      isFormValidation: validateForm,
      isFieldValidation: !validateForm
    }))
  }

  return isValid ? output.success() : output.error()
}
