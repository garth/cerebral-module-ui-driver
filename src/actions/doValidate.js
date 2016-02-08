export default function doValidate ({ modules, input: { moduleName, fields, validateForm, fieldNames }, state, output }) {
  const driverModule = modules['cerebral-module-ui-driver']
  const formModule = modules[moduleName]
  const form = formModule.meta.form

  Promise.all(fields.map((field) => new Promise((resolve) => {
    form.fields[field.name].validate(field.typedValue, function (error) {
      field.isValidating = false
      if (error) {
        field.isValid = false
        field.error = error
      }
      resolve(field)
    })
  }))).then((values) => {
    if (validateForm && typeof form.validate === 'function') {
      const allFields = state.get([...driverModule.path, moduleName, 'fields'])
      form.validate(Object.keys(allFields).reduce((data, name) => {
        data[name] = allFields[name].typedValue
        return data
      }, {}), (error) => output({ moduleName, fields: values, error, fieldNames }))
    } else {
      output({ moduleName, fields: values, fieldNames })
    }
  })
}
