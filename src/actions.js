import moment from 'moment'
import { validate as checkEmail } from 'email-validator'
import sideEffects from './sideEffects'

function checkRequired (value, required) {
  if (value === null || value === undefined || value.length === 0) {
    return required ? {
      isValid: false,
      errorKey: 'Required'
    } : {
      isValid: true,
      value: null
    }
  }
}

function checkMaxLength (string, maxLength) {
  if (maxLength && string.length > maxLength) {
    return {
      isValid: false,
      errorKey: 'Invalid'
    }
  }
}

const validate = {
  string (string, { required, maxLength } = {}) {
    return checkRequired(string, required) || checkMaxLength(string, maxLength) || {
      isValid: true,
      value: string
    }
  },

  time (timeString, { required, timeFormat } = {}) {
    const time = moment(timeString, timeFormat)
    return checkRequired(timeString, required) || (typeof timeString === 'string' && time.isValid() ? {
      isValid: true,
      value: (time.get('hour') * 60) + time.get('minute')
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  date (dateString, { required, dateFormat } = {}) {
    const date = moment(dateString, dateFormat)
    return checkRequired(dateString, required) || (typeof dateString === 'string' && date.isValid() ? {
      isValid: true,
      value: date.toDate()
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  int (intString, { required, multiplier } = {}) {
    const int = parseInt(intString, 10)
    return checkRequired(intString, required) || (!isNaN(int) ? {
      isValid: true,
      value: multiplier ? int * multiplier : int
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  email (email, { required } = {}) {
    return checkRequired(email, required) || (typeof email === 'string' && checkEmail(email) ? {
      isValid: true,
      value: email
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  password (password, {
    required,
    minLength = 8,
    maxLength = 128,
    minPhraseLength = 20,
    minPassingTests = 3,
    tests = [
      /[a-z]/,
      /[A-Z]/,
      /[0-9]/,
      /[^A-Za-z0-9]/
    ]
  } = {}) {
    let ok = false
    if (typeof password === 'string') {
      // password should be between min and max length and not have 3 or more repeating chars
      if (password.length >= minLength && password.length <= maxLength && !/(.)\1{2,}/.test(password)) {
        if (password.length >= minPhraseLength) {
          // password is phrase
          ok = true
        } else {
          // password should pass some tests
          ok = minPassingTests <= tests.reduce((total, re) => re.test(password) ? total + 1 : total, 0)
        }
      }
    }
    return checkRequired(password, required) || (ok ? {
      isValid: true,
      value: password
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  equal (string, { compare } = {}) {
    return string === compare ? {
      isValid: true,
      value: string
    } : {
      isValid: false,
      errorKey: 'Invalid'
    }
  }
}

export function validateForm ({ input, state, output }) {
  let isFormValid = true

  input.fields.forEach(field => {
    if (field.validationType === 'none') {
      if (typeof field.inputValue !== 'undefined') {
        sideEffects.exec(field, field.inputValue, state)
        state.set(field.statePath, field.inputValue)
      }
    } else {
      const inputValue = typeof field.inputValue === 'string'
        ? field.inputValue
        : state.get(field.inputValueStatePath) === undefined
          ? field.displayValue
          : state.get(field.inputValueStatePath)
      if (field.validationType) {
        const { isValid, value, errorKey } = validate[field.validationType](inputValue, field)
        if (isValid) {
          sideEffects.exec(field, value, state)
          state.unset(field.validationKeyStatePath)
          state.set(field.statePath, value)
        } else {
          isFormValid = false
          state.set(field.validationKeyStatePath, field.validationKeyPrefix + errorKey)
        }
        state.set(field.inputValueStatePath, inputValue)
      } else if (field.required) {
        const value = state.get(field.statePath)
        if (value === null || value === undefined || (typeof value === 'string' && value.length === 0)) {
          isFormValid = false
          state.set(field.validationKeyStatePath, field.validationKeyPrefix + 'Required')
        }
      }
    }
  })

  return isFormValid ? output.success() : output.error()
}

export function resetFormDriver (statePath) {
  const formPath = Array.isArray(statePath) ? statePath : [statePath]
  const driverPath = ['drivers', ...formPath]
  const validationPath = [...formPath, 'validation']
  return function resetForm ({ state }) {
    state.set(driverPath, {})
    state.unset(validationPath)
  }
}
