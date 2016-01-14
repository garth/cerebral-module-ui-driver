/*global beforeEach,afterEach,describe*/
// /*global beforeEach,afterEach,describe,it*/
// import { expect } from 'chai'
// import sendSignal from '../helpers/sendSignal'
import controller from '../helpers/controller'

// const signals = controller.getSignals()

describe('signals', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('driver.valueChanged', function () {
    let tree

    beforeEach(function () {
      tree = controller.model.tree
      tree.set({
        inputValue: null,
        validationKey: null,
        value: null
      })
      tree.commit()
    })

    // it('should copy a value from input to state', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: false,
    //       inputValue: 'test'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'test',
    //       value: 'test'
    //     })
    //   })
    // })
    //
    // it('should copy an invalid value from input to state', function () {
    //   tree.set('inputValue', 'test')
    //   tree.set('value', 'test')
    //   tree.commit()
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: true,
    //       inputValue: ''
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '',
    //       validationKey: 'inputRequired',
    //       value: 'test'
    //     })
    //   })
    // })
    //
    // it('should pick input values from the state tree', function () {
    //   tree.set('inputValue', 'test')
    //   tree.commit()
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: false
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'test',
    //       value: 'test'
    //     })
    //   })
    // })
    //
    // it('should check maxLength', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: true,
    //       inputValue: 'abcd',
    //       maxLength: 3
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'abcd',
    //       validationKey: 'inputInvalid',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should detect empty values', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: true,
    //       inputValue: ''
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '',
    //       validationKey: 'inputRequired',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should detect null values', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'string',
    //       required: true,
    //       inputValue: null
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: null,
    //       validationKey: 'inputRequired',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should typecast integers', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'int',
    //       required: false,
    //       inputValue: '123'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '123',
    //       value: 123
    //     })
    //   })
    // })
    //
    // it('should multiply integers', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'int',
    //       required: false,
    //       multiplier: 2,
    //       inputValue: '123'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '123',
    //       value: 246
    //     })
    //   })
    // })
    //
    // it('should detect invalid integers', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       validationType: 'int',
    //       required: false,
    //       inputValue: 'test'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'test',
    //       validationKey: 'inputInvalid',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should typecast times', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       timeFormat: 'H:mm',
    //       validationType: 'time',
    //       required: false,
    //       inputValue: '8:30'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '8:30',
    //       value: 510
    //     })
    //   })
    // })
    //
    // it('should detect invalid times', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       timeFormat: 'H:mm',
    //       validationType: 'time',
    //       required: false,
    //       inputValue: 'test'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'test',
    //       validationKey: 'inputInvalid',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should convert empty times to null', function () {
    //   tree.set('value', 100)
    //   tree.commit()
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       timeFormat: 'H:mm',
    //       validationType: 'time',
    //       required: false,
    //       inputValue: ''
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '',
    //       value: null
    //     })
    //   })
    // })
    //
    // it('should typecast dates', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       dateFormat: 'L',
    //       validationType: 'date',
    //       required: false,
    //       inputValue: '12/12/2012'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: '12/12/2012',
    //       value: new Date(2012, 11, 12)
    //     })
    //   })
    // })
    //
    // it('should detect invalid dates', function () {
    //   return sendSignal(controller, signals.driver.valueChanged, {
    //     fields: [{
    //       name: 'input',
    //       validationKeyPrefix: 'input',
    //       inputValueStatePath: ['inputValue'],
    //       validationKeyStatePath: ['validationKey'],
    //       statePath: ['value'],
    //       dateFormat: 'L',
    //       validationType: 'date',
    //       required: false,
    //       inputValue: 'test'
    //     }]
    //   }, () => {
    //     expect(tree.get()).to.eql({
    //       inputValue: 'test',
    //       validationKey: 'inputInvalid',
    //       value: null
    //     })
    //   })
    // })
  })
})
