import getMeta from '../helpers/getMeta'

function format (value, formatter, options) {
  return typeof formatter === 'function'
    ? formatter(value, options)
    : value === undefined || value === null
      ? ''
      : `${value}`
}

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function bindInput (fieldName, fieldProps = {}, noFormatting, shouldUpdateFormValue) {
    const isFocusedPath = [...driverModule.path, ...formModule.path, 'fields', fieldName, 'isFocused']
    const formValue = getMeta(state, ['form', fieldName])
    const options = driverModule.meta.options
    const meta = getMeta(state, ['driver', ...formModule.path, 'fields', fieldName]) || {}
    const useInputValue = typeof meta.value !== 'undefined' && meta.value !== null
    const field = (formModule.meta.form && formModule.meta.form.fields && formModule.meta.form.fields[fieldName]) || {}
    const value = useInputValue
      ? meta.value
      : noFormatting
        ? formValue
        : format(formValue, options.formatters[field.type], options)

    // if the field is not formatted then it should't be cast
    field.noCasting = noFormatting

    return Object.assign({
      [propsMap['value']]: value,
      [propsMap['isError']]: !!meta.error,
      [propsMap['isValidating']]: !!meta.isValidating,
      [propsMap['message']]: meta.error,
      [propsMap['onChange']]: function (e) {
        driverModule.meta.signals.valueChanged({
          driverModuleName: driverModule.name,
          moduleName: formModule.name,
          fields: [{
            name: fieldName,
            type: field.type,
            value: e.target.value
          }],
          shouldUpdateFormValue
        })
      },
      [propsMap['isFocused']]: !!meta.isFocused,
      [propsMap['onFocus']]: function () {
        driverModule.meta.signals.focused({
          statePath: isFocusedPath,
          value: true
        })
      },
      [propsMap['onBlur']]: function () {
        driverModule.meta.signals.blurred({
          statePath: isFocusedPath,
          value: false
        })
      }
    }, { type: 'text' }, props, fieldProps)
  }
}
