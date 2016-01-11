import isOpenChanged from './chains/isOpenChanged'
import valuesChanged from './chains/valuesChanged'

export default (options = {}) => {
  return (module) => {
    module.state({})

    module.signals({
      isOpenChanged
    })

    module.signalsSync({
      valuesChanged
    })

    module.services({})

    return {}
  }
}
