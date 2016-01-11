const sideEffects = {}

export default {
  register (formName, fieldName, handler) {
    if (typeof handler === 'function') {
      if (!sideEffects[formName]) {
        sideEffects[formName] = {}
      }
      if (!sideEffects[formName][fieldName]) {
        sideEffects[formName][fieldName] = {}
      }
      sideEffects[formName][fieldName] = handler
    }
  },

  exec (field, value, state) {
    if (sideEffects[field.formName] && sideEffects[field.formName][field.name]) {
      sideEffects[field.formName][field.name](field, value, state)
    }
  }
}
