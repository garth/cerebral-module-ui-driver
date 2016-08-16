import debounce from 'cerebral/operators/debounce'
import beginValidate from '../actions/beginValidate'
import doValidate from '../actions/doValidate'
import endValidate from '../actions/endValidate'

export default function (debounceTimeout) {
  return [
    beginValidate,
    debounce(debounceTimeout, [
      doValidate,
      endValidate, {
        success: [],
        error: []
      }
    ], { immediate: false, throttle: false })
  ]
}
