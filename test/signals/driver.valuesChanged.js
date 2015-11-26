import { expect } from 'chai';
import sendSignal from '../helpers/sendSignal';
import controller from '../helpers/controller';
import signals from '../../src/signals';
signals.register(controller);

describe('signals', function () {

  afterEach(function () {
    controller.reset();
  });

  describe('driver.valuesChanged', function () {

    beforeEach(function () {
      this.tree = controller.model.tree;
      this.tree.set({
        inputValue: null,
        validationKey: null,
        value: null
      });
      this.tree.commit();
    });

    it('should copy a value from input to state', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: false,
          inputValue: 'test'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'test',
          value: 'test'
        });
      });
    });

    it('should copy an invalid value from input to state', function () {
      this.tree.set('inputValue', 'test');
      this.tree.set('value', 'test');
      this.tree.commit();
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: true,
          inputValue: ''
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '',
          validationKey: 'inputRequired',
          value: 'test'
        });
      });
    });

    it('should pick input values from the state tree', function () {
      this.tree.set('inputValue', 'test');
      this.tree.commit();
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: false
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'test',
          value: 'test'
        });
      });
    });

    it('should check maxLength', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: true,
          inputValue: 'abcd',
          maxLength: 3
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'abcd',
          validationKey: 'inputInvalid',
          value: null
        });
      });
    });

    it('should detect empty values', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: true,
          inputValue: ''
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '',
          validationKey: 'inputRequired',
          value: null
        });
      });
    });

    it('should detect null values', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'string',
          required: true,
          inputValue: null
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: null,
          validationKey: 'inputRequired',
          value: null
        });
      });
    });

    it('should typecast integers', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'int',
          required: false,
          inputValue: '123'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '123',
          value: 123
        });
      });
    });

    it('should multiply integers', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'int',
          required: false,
          multiplier: 2,
          inputValue: '123'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '123',
          value: 246
        });
      });
    });

    it('should detect invalid integers', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          validationType: 'int',
          required: false,
          inputValue: 'test'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'test',
          validationKey: 'inputInvalid',
          value: null
        });
      });
    });

    it('should typecast times', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          timeFormat: 'H:mm',
          validationType: 'time',
          required: false,
          inputValue: '8:30'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '8:30',
          value: 510
        });
      });
    });

    it('should detect invalid times', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          timeFormat: 'H:mm',
          validationType: 'time',
          required: false,
          inputValue: 'test'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'test',
          validationKey: 'inputInvalid',
          value: null
        });
      });
    });

    it('should convert empty times to null', function () {
      this.tree.set('value', 100);
      this.tree.commit();
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          timeFormat: 'H:mm',
          validationType: 'time',
          required: false,
          inputValue: ''
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '',
          value: null
        });
      });
    });

    it('should typecast dates', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          dateFormat: 'L',
          validationType: 'date',
          required: false,
          inputValue: '12/12/2012'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: '12/12/2012',
          value: new Date(2012, 11, 12)
        });
      });
    });

    it('should detect invalid dates', function () {
      return sendSignal(controller, controller.signals.driver.valuesChanged, {
        fields: [{
          name: 'input',
          validationKeyPrefix: 'input',
          inputValueStatePath: ['inputValue'],
          validationKeyStatePath: ['validationKey'],
          statePath: ['value'],
          dateFormat: 'L',
          validationType: 'date',
          required: false,
          inputValue: 'test'
        }]
      }, () => {
        expect(this.tree.get()).to.eql({
          inputValue: 'test',
          validationKey: 'inputInvalid',
          value: null
        });
      });
    });
  });

});
