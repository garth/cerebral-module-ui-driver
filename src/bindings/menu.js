import getMeta from '../helpers/getMeta'

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function bindMenu (fieldName, fieldProps) {
    const meta = getMeta(state, ['driver', ...formModule.path, 'fields', fieldName]) || {}

    return Object.assign({
      [propsMap['isOpen']]: !!meta.isOpen,
      [propsMap['onClose']]: function onClose () {
        driverModule.meta.signals.isOpenChanged({
          statePath: [...driverModule.path, ...formModule.path, 'fields', fieldName, 'isOpen'],
          value: false
        })
      }
    }, props, fieldProps)
  }
}
