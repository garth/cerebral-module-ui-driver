export default function ({
  driverModule,
  formModule,
  props,
  propsMap
}) {
  return function bindMenuOption (fieldName, fieldProps) {
    return Object.assign({
      [propsMap['onOpen']]: function onOpen () {
        driverModule.meta.signals.isOpenChanged({
          statePath: [...driverModule.path, ...formModule.path, 'fields', fieldName, 'isOpen'],
          value: true
        })
      }
    }, props, fieldProps)
  }
}
