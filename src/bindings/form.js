import getMeta from '../helpers/getMeta'

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function bindForm (signal, fieldProps) {
    const meta = getMeta(state, ['driver', ...formModule.path]) || {}
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
          driverModuleName: driverModule.name,
          moduleName: formModule.name,
          validateForm: true,
          fields
        })
      }
    }, props, fieldProps)
  }
}
