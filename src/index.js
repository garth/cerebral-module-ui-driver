import isOpenChanged from './chains/isOpenChanged'
import valuesChanged from './chains/valuesChanged'
import defaultPropsMaps from './propsMaps'
import bindingTypes from './bindingTypes'

export default (options = {}) => {
  // configure props maps
  const propsMaps = options.propsMaps || {}
  bindingTypes.forEach(binding => {
    propsMaps[binding] = Object.assign({},
      defaultPropsMaps.base,
      propsMaps.base,
      defaultPropsMaps[binding],
      propsMaps[binding])
  })

  // prepare the module
  return (module) => {
    module.state({})

    module.signals({
      isOpenChanged
    })
    module.signalsSync({
      valuesChanged
    })

    module.services({
      options,
      propsMaps
    })

    return {}
  }
}
