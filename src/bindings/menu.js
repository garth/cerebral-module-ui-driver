import getMeta from '../helpers/getMeta'

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function bindMenu (fieldName, fieldProps) {
    const driverPath = [...driverModule.path, ...formModule.path, 'fields', fieldName]
    const isOpenPath = [...driverPath, 'isOpen']

    const meta = getMeta(state, driverPath) || {}

    return Object.assign({
      [propsMap['isOpen']]: !!meta.isOpen,
      [propsMap['onClose']]: function onClose () {
        driverModule.meta.signals.isOpenChanged({
          statePath: isOpenPath,
          value: false
        })
      }
    }, props, fieldProps)
  }
}
