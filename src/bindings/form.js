export default function ({
  formModule,
  driverModule,
  props,
  propsMap
}) {
  return function (fieldProps) {
    const formFields = formModule.meta.form.fields

    const fields = Object.keys(formFields).reduce((fields, name) => {
      fields[name] = {
        name,
        type: formFields[name].type
      }
    }, {})

    return Object.assign({
      [propsMap['onSubmit']]: function onSubmit () {
        driverModule.signals.validate({
          fields
        })
      }
    }, props, fieldProps)
  }
}
