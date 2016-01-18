export default function validate ({ module, modules, input: { moduleName, fields }, output }) {
  const singleField = module.meta.isUiDriverModule
  const driverModule = modules['cerebral-module-ui-driver']
  const formModule = modules[moduleName]
  const form = formModule.meta.form
  const driverOptions = driverModule.meta.options
  const formOptions = form.driverOptions
  const values = []

  let isValid = true

  fields.forEach(field => {
    // get the value and check its type
    const fieldPath = `${moduleName}.fields.${field.name}`
    let value
    if (singleField) {
      // single field validation values come from input and may need to be cast
      value = !field.noCasting && field.type && driverOptions.casts[field.type]
        ? driverOptions.casts[field.type](field.value, Object.assign({}, driverOptions, formOptions))
        : { isTypeValid: true, typedValue: field.value }
    } else {
      // form validation values come from state (previous single field validation result is used if found)
      value = driverModule.state.get(fieldPath) || {
        isTypeValid: true,
        typedValue: formModule.state.get(field.name)
      }
    }
    value.name = field.name

    if (value.isTypeValid) {
      value.isValid = true
      // update the form value
      formModule.state.set(field.name, value.typedValue)
      // validate the value
      const formField = form.fields[field.name] || {}
      if (typeof formField.validate === 'function') {
        value.isValidating = true
        values.push(value)
      }
    } else {
      // type was not valid
      isValid = false
      value.isValid = false
    }

    // update the driver form value
    driverModule.state.set(fieldPath, value)
  })

  driverModule.state.set([moduleName, 'isValid'], isValid)
  driverModule.state.set([moduleName, 'isValidating'], true)

  output({ moduleName, fields: values, validateForm: !singleField })
}
