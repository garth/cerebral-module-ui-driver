export default function validate ({ module, modules, input: { moduleName, fields, validateForm }, output }) {
  const driverModule = modules['cerebral-module-ui-driver']
  const formModule = modules[moduleName]
  const form = formModule.meta.form

  Promise.all(fields.maps(field => new Promise(resolve => {
    form[field.name].validate({
      module: formModule,
      field
    }, error => {
      field.isValidating = false
      if (error) {
        field.isValid = false
        field.error = error
      }
      resolve(field)
    })
  }))).then(values => {
    if (validateForm && typeof form.validate === 'function') {
      new Promise(resolve => {
        form.validate({
          module: formModule,
          fields: driverModule.get([moduleName, 'fields'])
        }, resolve)
      }).then(error => output({ moduleName, fields: values, error }))
    } else {
      output({ moduleName, fields: values })
    }
  })
}
