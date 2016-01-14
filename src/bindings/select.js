import inputBindings from './input'
import menuBindings from './menu'
import menuOpenBindings from './menuOpen'

export default function (args) {
  return function (fieldName, fieldProps) {
    return Object.assign(
      inputBindings(args)(fieldName),
      menuOpenBindings(args)(fieldName),
      menuBindings(args)(fieldName),
      fieldProps)
  }
}
