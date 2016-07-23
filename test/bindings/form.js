/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import onSignalEnd from '../helpers/onSignalEnd'
import controller from '../helpers/controller'
import driver from '../../src/bind'
import state from '../../src/state'

const modules = controller.getModules()
const signals = modules.form.meta.signals
const bind = function () {
  return driver({ modules, state: state({ driverModuleName: 'driver', formModuleName: 'form' }).get(controller.get()) })
}

describe('bindings', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('form', function () {
    let tree

    beforeEach(function () {
      tree = controller.model.tree
      tree.set({ form: { email: '', number: 12, select: 1, acceptTerms: false } })
      tree.commit()
    })

    it('should initially be valid', function () {
      let props = bind().form(signals.submitForm)
      expect(props.isError).to.be.false
      expect(props.isValidating).to.be.false
      expect(props.message).to.be.undefine
      expect(props.onSubmit).to.be.a.function
    })

    it('validates all fields on submit', function () {
      let props = bind().form(signals.submitForm)
      const promise = onSignalEnd(controller, function () {
        props = bind().form(signals.submitForm)
        expect(props.isError).to.be.true
        expect(props.isValidating).to.be.false
        expect(props.message).to.equal('form has validation errors')
      })
      props.onSubmit()
      return promise
    })

    it('returns isError=false when the form is valid', function () {
      tree.set({ form: { email: '', number: 10, select: 1, acceptTerms: true } })
      tree.commit()
      let props = bind().form(signals.submitForm)
      const promise = onSignalEnd(controller, function () {
        props = bind().form(signals.submitForm)
        expect(props.isError).to.be.false
        expect(props.isValidating).to.be.false
        expect(props.message).to.be.undefined
      })
      props.onSubmit()
      return promise
    })
  })
})
