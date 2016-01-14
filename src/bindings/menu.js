import getMeta from '../helpers/getMeta'

export default function ({
  driverModule,
  formModule,
  state,
  props,
  propsMap
}) {
  return function (fieldName, fieldProps) {
    const statePath = [...formModule.path, fieldName]
    const driverPath = [...driverModule.path, ...statePath]
    const isOpenPath = [...driverPath, 'isOpen']

    const meta = getMeta(state, formModule.path)

    return Object.assign({
      [propsMap['isOpen']]: !!(meta && meta[fieldName] && meta[fieldName].isOpen),
      [propsMap['onClose']]: function onClose () {
        driverModule.signals.isOpenChanged({
          statePath: isOpenPath,
          value: false
        })
      }
    }, props, fieldProps)
  }
}
