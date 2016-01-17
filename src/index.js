import isOpenChanged from './chains/isOpenChanged'
import valueChanged from './chains/valueChanged'
import defaultPropsMaps from './propsMaps'
import bindings from './bindings'
import defaultCasts from './casts'
import defaultFormatters from './formatters'

export default (options = {}, propsMaps = {}) => {
  // set undefined options
  options.bindings = Object.assign({}, bindings, options.bindings)
  options.bindingTypes = options.bindingTypes || Object.keys(options.bindings)
  options.casts = Object.assign({}, defaultCasts, options.casts)
  options.formatters = Object.assign({}, defaultFormatters, options.formatters)
  options.dateFormat = options.dateFormat || 'L'
  options.timeFormat = options.timeFormat || 'H:mm'
  options.invalidDateMessage = options.invalidDateMessage || 'invalid date'
  options.invalidNumberMessage = options.invalidNumberMessage || 'invalid number'
  options.invalidTimeMessage = options.invalidTimeMessage || 'invalid time'
  // configure props maps
  options.bindingTypes.forEach(binding => {
    propsMaps[binding] = Object.assign({},
      defaultPropsMaps.base,
      propsMaps.base,
      defaultPropsMaps[binding],
      propsMaps[binding])
  })

  // prepare the module
  return (module) => {
    module.alias('cerebral-module-ui-driver')

    // register signals
    module.signals({ isOpenChanged })
    module.signalsSync({
      valueChanged: valueChanged(options.debounceTimeout || 200)
    })

    return {
      signals: module.getSignals(),
      options,
      propsMaps,
      isUiDriverModule: true
    }
  }
}
