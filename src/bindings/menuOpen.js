export default function ({
  driverModule,
  formModule,
  props,
  propsMap
}) {
  return function bindMenuOption (fieldName, fieldProps) {
    const driverPath = [...driverModule.path, ...formModule.path, 'fields', fieldName]
    const isOpenPath = [...driverPath, 'isOpen']

    return Object.assign({
      [propsMap['onOpen']]: function onOpen () {
        driverModule.meta.signals.isOpenChanged({
          statePath: isOpenPath,
          value: true
        })
      }
    }, props, fieldProps)
  }
}
