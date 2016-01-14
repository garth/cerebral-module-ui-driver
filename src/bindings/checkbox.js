import inputBindings from './input'

export default function (args) {
  return function (fieldName, fieldProps) {
    return inputBindings(args)(fieldName, Object.assign({ type: 'checkbox' }, fieldProps))
  }
}
