import debounce from 'cerebral-addons/debounce'
import beginValidate from '../actions/beginValidate'
import doValidate from '../actions/doValidate'
import endValidate from '../actions/endValidate'

export default function (debounceTimeout) {
  return [
    beginValidate,
    debounce(debounceTimeout, [
      [ doValidate ],
      endValidate, {
        success: [],
        error: []
      }
    ])
  ]
}
