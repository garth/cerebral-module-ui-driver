import moment from 'moment';
import sideEffects from './sideEffects';

function checkRequired(value, required) {
  if (value === null || value === undefined || value.length === 0) {
    if (required) {
      return {
        isValid: false,
        errorKey: 'Required'
      };
    } else {
      return {
        isValid: true,
        value: null
      };
    }
  }
}

function checkMaxLength(string, maxLength) {
  if (maxLength && string.length > maxLength) {
    return {
      isValid: false,
      errorKey: 'Invalid'
    };
  }
}

const validate = {
  string(string, signalData) {
    return checkRequired(string, signalData.required) || checkMaxLength(string, signalData.maxLength) || {
      isValid: true,
      value: string
    };
  },

  time(timeString, signalData) {
    const time = moment(timeString, 'H:mm');
    return checkRequired(timeString, signalData.required) || (time.isValid() ? {
      isValid: true,
      value: (time.get('hour') * 60) + time.get('minute')
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  date(dateString, signalData) {
    const date = moment(dateString, 'L');
    return checkRequired(dateString, signalData.required) || (date.isValid() ? {
      isValid: true,
      value: date.toDate()
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  },

  int(intString, signalData) {
    const int = parseInt(intString, 10)
    return checkRequired(intString, signalData.required) || (!isNaN(int) ? {
      isValid: true,
      value: signalData.multiplier ? int * signalData.multiplier : int
    } : {
      isValid: false,
      errorKey: 'Invalid'
    })
  }
};

export default {

  setStateValue(input, state) {
    state.set(input.statePath, input.value);
  },

  validateForm(input, state, output) {
    let isFormValid = true;

    input.fields.forEach(field => {
      if (field.validationType === 'none') {
        if (typeof field.inputValue !== 'undefined') {
          sideEffects.exec(field, field.inputValue, state);
          state.set(field.statePath, field.inputValue);
        }
      } else {
        const inputValue = typeof field.inputValue === 'string'
          ? field.inputValue
          : state.get(field.inputValueStatePath);
        if (inputValue !== undefined && field.validationType) {
          const { isValid, value, errorKey } = validate[field.validationType](inputValue, field);
          if (isValid) {
            sideEffects.exec(field, value, state);
            state.unset(field.validationKeyStatePath);
            state.set(field.statePath, value);
          } else {
            isFormValid = false;
            state.set(field.validationKeyStatePath, field.name + errorKey);
          }
          state.set(field.inputValueStatePath, inputValue);
        } else if (field.required) {
          const value = state.get(field.statePath);
          if (value === null || value === undefined || (typeof value === 'string' && value.length === 0)) {
            isFormValid = false;
            state.set(field.validationKeyStatePath, field.name + 'Required');
          }
        }
      }
    });

    return isFormValid ? output.success() : output.error();
  },

  resetForm(statePath) {
    const formPath = Array.isArray(statePath) ? statePath : [statePath];
    const driverPath = ['drivers', ...formPath];
    const validationPath = [...formPath, 'validation'];
    return function resetForm(input, state) {
      state.set(driverPath, {});
      state.unset(validationPath);
    };
  }

}
