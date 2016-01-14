import isOpenChanged from './chains/isOpenChanged'
import valuesChanged from './chains/valuesChanged'
import defaultPropsMaps from './propsMaps'
import bindingTypes from './bindingTypes'
import defaultCasts from './casts'

export default (options = {}, propsMaps = {}) => {
  // set undefined options
  options.casts = Object.assign({}, defaultCasts, options.casts)
  options.dateFormat = options.dateFormat || 'L'
  options.timeFormat = options.timeFormat || 'H:mm'
  options.invalidDateMessage = options.invalidDateMessage || 'Invalid date'
  options.invalidNumberMessage = options.invalidNumberMessage || 'Invalid number'
  options.invalidTimeMessage = options.invalidTimeMessage || 'Invalid time'
  options.bindingTypes = options.bindingTypes || bindingTypes
  // configure props maps
  options.bindingTypes.forEach(binding => {
    propsMaps[binding] = Object.assign({},
      defaultPropsMaps.base,
      propsMaps.base,
      defaultPropsMaps[binding],
      propsMaps[binding])
  })
  // configure bindings
  options.bindings = Object.assign(
    bindingTypes.reduce((bindings, binding) => bindings[binding] = require(`./bindings/${binding}`), {}),
    options.bindings)

  // prepare the module
  return (module) => {
    module.alias('cerebral-module-ui-driver')

    // register signals
    module.signals({
      isOpenChanged
    })
    module.signalsSync({
      valuesChanged
    })

    // register services
    module.services({
      options,
      propsMaps
    })

    return {
      isUiDriverModule: true
    }
  }
}
