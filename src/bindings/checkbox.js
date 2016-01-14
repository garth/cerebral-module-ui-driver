import inputBindings from './input'

export default function (args) {
  return function bindCheckbox (fieldName, fieldProps) {
    return inputBindings(args)(fieldName, Object.assign({ type: 'checkbox' }, fieldProps), true)
  }
}
