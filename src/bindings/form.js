import getMeta from '../helpers/getMeta'

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function bindForm (signal, fieldProps) {
    const driverPath = [...driverModule.path, ...formModule.path]
    const meta = getMeta(state, driverPath) || {}
    const formFields = (formModule.meta.form && formModule.meta.form.fields) || {}

    const fields = Object.keys(formFields).map((name) => {
      return {
        name,
        type: formFields[name].type
      }
    })

    return Object.assign({
      [propsMap['isError']]: !!meta.error,
      [propsMap['isValidating']]: !!meta.isValidating,
      [propsMap['message']]: meta.error,
      [propsMap['onSubmit']]: function onSubmit () {
        signal({
          validateForm: true,
          moduleName: formModule.name,
          fields
        })
      }
    }, props, fieldProps)
  }
}
