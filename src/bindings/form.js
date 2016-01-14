export default function ({
  formModule,
  props,
  propsMap
}) {
  return function bindForm (signal, fieldProps) {
    const formFields = formModule.meta.form.fields

    const fields = Object.keys(formFields).reduce((fields, name) => {
      fields[name] = {
        name,
        type: formFields[name].type
      }
    }, {})

    return Object.assign({
      [propsMap['onSubmit']]: function onSubmit () {
        signal({ fields })
      }
    }, props, fieldProps)
  }
}
