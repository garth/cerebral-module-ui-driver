import moment from 'moment';
import sideEffects from './sideEffects';

export default {

  registerSideEffect: sideEffects.register,

  createForm(formStatePath) {
    const formPath = Array.isArray(formStatePath) ? formStatePath : [formStatePath];
    const formName = formPath.join('.');
    let validationFields = [];

    return {

      props() {
        return {
          driverForm: formPath,
          driverMeta: ['drivers', ...formPath]
        };
      },

      getValidationData() {
        return {
          fields: validationFields
        };
      },

      getBindings(props, t=null) {
        validationFields = [];
        const translate = t !== null;
        if (!translate) {
          t = {};
        }

        const inputProps = function (name, {
          label = null,
          value = props.driverMeta && props.driverMeta[name] && props.driverMeta[name].inputValue,
          inputType = 'text',
          format = value => value === null ? '' : value,
          messages = {},
          validationType = 'string',
          required = false,
          signalData = {}
        } = {}) {
          const useInputValue = typeof value !== 'undefined' && value !== null;
          const validationKey = props.driverForm && props.driverForm.validation && props.driverForm.validation[name];
          const isError = !!validationKey;
          const formattedValue = props.driverForm && format(props.driverForm[name]);
          const statePath = [...formPath, name];
          const signalInput = Object.assign({
            formName,
            name,
            inputValueStatePath: ['drivers', ...statePath, 'inputValue'],
            validationKeyStatePath: [...formPath, 'validation', name],
            statePath,
            validationType,
            validationKeyPrefix: translate ? name : '',
            required
          }, signalData);
          validationFields.push(signalInput);
          let message = '';
          if (isError) {
            if (translate) {
              message = t[validationKey] ? t[validationKey]() : validationKey;
            } else {
              let key = validationKey.toLowerCase();
              message = messages[key] ? messages[key] : key;
            }
          } else if (useInputValue && formattedValue !== value) {
            message = formattedValue;
          }
          return {
            label: label !== null ? label : t[name + 'Label'] ? t[name + 'Label']() : name,
            value: useInputValue ? value : formattedValue,
            type: inputType,
            isError,
            message,
            onChange(e) {
              props.signals.driver.valuesChanged.sync({
                fields: [
                  Object.assign({
                    inputValue: e.target.value
                  }, signalInput)
                ]
              });
            }
          };
        };

        const inputTimeProps = function (name, options = {}) {
          const timeFormat = options.timeFormat ? options.timeFormat : 'H:mm';
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : moment(value * 1000 * 60).utcOffset(0).format(timeFormat),
            validationType: 'time',
            signalData: { timeFormat }
          }, options));
        };

        const inputDateProps = function (name, options = {}) {
          const dateFormat = options.dateFormat ? options.dateFormat : 'L';
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : moment(value).format(dateFormat),
            validationType: 'date',
            signalData: { dateFormat }
          }, options));
        };

        const inputIntProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : '' + value,
            validationType: 'int'
          }, options));
        };

        const inputEmailProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            validationType: 'email'
          }, options));
        };

        const inputPasswordProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            validationType: options.checkStrength ? 'password' : 'string',
            inputType: 'password'
          }, options));
        };

        const inputEqualsProps = function (name, compare, options = {}) {
          return inputProps(name, Object.assign({
            validationType: 'equal',
            signalData: { compare }
          }, options));
        };

        const menuOpenProps = function (name, {
          eventType = 'onTouchTap'
        } = {}) {
          const statePath = [...formPath, name];
          const driverPath = ['drivers', ...statePath];
          const isOpenPath = [...driverPath, 'isOpen'];
          let p = {};
          p[eventType] = function() {
            props.signals.driver.isOpenChanged({
              statePath: isOpenPath,
              value: true
            });
          };
          return p;
        };

        const menuProps = function (name) {
          const statePath = [...formPath, name];
          const driverPath = ['drivers', ...statePath];
          const isOpenPath = [...driverPath, 'isOpen'];
          return {
            isOpen: !!(props.driverMeta && props.driverMeta[name] && props.driverMeta[name].isOpen),
            onClose() {
              props.signals.driver.isOpenChanged({
                statePath: isOpenPath,
                value: false
              });
            }
          };
        };

        const selectProps = function (name, selectOptions, options = {}) {
          return Object.assign(
            { options: selectOptions },
            inputProps(name, Object.assign({
              value: null,
              validationType: 'none'
            }, options)),
            menuOpenProps(name, { eventType: 'onOpen' }),
            menuProps(name));
        };

        const checkboxProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            value: null,
            validationType: 'none'
          }, options));
        };

        return {
          checkboxProps,
          inputDateProps,
          inputEmailProps,
          inputEqualsProps,
          inputIntProps,
          inputPasswordProps,
          inputProps,
          inputTimeProps,
          menuOpenProps,
          menuProps,
          selectProps
        };
      }
    }
  }

}
