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
          locale: ['locale'],
          driverForm: formPath,
          driverMeta: ['drivers', ...formPath]
        };
      },

      getValidationData() {
        return {
          fields: validationFields
        };
      },

      getBindings(props, t) {
        validationFields = [];

        const inputProps = function (name, {
          label = null,
          value = props.driverMeta && props.driverMeta[name] && props.driverMeta[name].inputValue,
          format = value => value === null ? '' : value,
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
            required
          }, signalData);
          validationFields.push(signalInput);
          let message = '';
          if (isError) {
            message = t[validationKey] ? t[validationKey]() : validationKey;
          } else if (useInputValue && formattedValue !== value) {
            message = formattedValue;
          }
          return {
            label: label !== null ? label : t[name + 'Label'] ? t[name + 'Label']() : name,
            value: useInputValue ? value : formattedValue,
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
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : moment(value * 1000 * 60).utcOffset(0).format('H:mm'),
            onChangeSignal: props.signals.driver.timeValueChanged,
            validationType: 'time'
          }, options));
        };

        const inputDateProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : moment(value).format('L'),
            onChangeSignal: props.signals.driver.dateValueChanged,
            validationType: 'date'
          }, options));
        };

        const inputIntProps = function (name, options = {}) {
          return inputProps(name, Object.assign({
            format: value => value === null ? '' : '' + value,
            onChangeSignal: props.signals.driver.intValueChanged,
            validationType: 'int'
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
          menuOpenProps,
          menuProps,
          inputProps,
          inputTimeProps,
          inputDateProps,
          inputIntProps,
          checkboxProps,
          selectProps
        };
      }
    }
  }

}
