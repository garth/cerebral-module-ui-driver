export default function doValidate (args) {
  const {
    modules,
    input: {
      driverModuleName,
      fieldNames,
      fields,
      moduleName,
      validateForm
    },
    state,
    output
  } = args
  const driverModule = modules[driverModuleName]
  const formModule = modules[moduleName]
  const form = formModule.meta.form

  Promise.all(fields.map((field) => new Promise((resolve) => {
    form.fields[field.name].validate(Object.assign({}, args, {
      value: field.typedValue,
      done (error) {
        field.isValidating = false
        if (error) {
          field.isValid = false
          field.error = error
        }
        resolve(field)
      }
    }))
  }))).then((values) => {
    if (validateForm && typeof form.validate === 'function') {
      const allFields = state.get([...driverModule.path, ...formModule.path, 'fields'])
      form.validate(Object.assign({}, args, {
        values: Object.keys(allFields).reduce((data, name) => {
          data[name] = allFields[name].typedValue
          return data
        }, {}),
        done (error) {
          output({ moduleName, fields: values, error, fieldNames })
        }
      }))
    } else {
      output({ moduleName, fields: values, fieldNames })
    }
  })
}
