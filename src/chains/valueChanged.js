import debounce from 'cerebral-addons/debounce'
import beginValidate from '../actions/beginValidate'
import doValidate from '../actions/doValidate'
import endValidate from '../actions/endValidate'

export default [
  beginValidate,
  debounce(200, [
    [ doValidate ],
    endValidate
  ])
]
