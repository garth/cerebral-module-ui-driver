export default function ({
  moduleName,
  driverModule,
  props,
  propsMap
}) {
  return function bindMenuOption (fieldName, fieldProps) {
    const statePath = [moduleName, fieldName]
    const driverPath = [driverModule.name, ...statePath]
    const isOpenPath = [...driverPath, 'isOpen']

    return Object.assign({
      [propsMap['onOpen']]: function onOpen () {
        driverModule.signals.isOpenChanged({
          statePath: isOpenPath,
          value: true
        })
      }
    }, props, fieldProps)
  }
}
