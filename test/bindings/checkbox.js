/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import onSignalEnd from '../helpers/onSignalEnd'
import controller from '../helpers/controller'
import driver from '../../src/bind'
import state from '../../src/state'

const modules = controller.getModules()
const bind = function () {
  return driver({ modules, state: state({ driverModuleName: 'driver', formModuleName: 'form' }).get(controller.get()) })
}

describe('bindings', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('checkbox', function () {
    beforeEach(function () {
      let tree = controller.model.tree
      tree.set({ form: { acceptTerms: false } })
      tree.commit()
    })

    it('should be initially valid', function () {
      let props = bind().checkbox('acceptTerms')
      expect(props.value).to.be.false
      expect(props.isError).to.be.false
      expect(props.message).to.be.undefined
      expect(props.onChange).to.be.a.function
      expect(props.type).to.equal('checkbox')
    })

    it('updates the value on change', function () {
      let props = bind().checkbox('acceptTerms')
      const promise = onSignalEnd(controller, function () {
        props = bind().checkbox('acceptTerms')
        expect(props.value).to.be.true
        expect(props.isError).to.be.false
        expect(props.message).to.be.null
        expect(props.onChange).to.be.a.function
        expect(props.type).to.equal('checkbox')
      })
      props.onChange({ target: { value: true } })
      return promise
    })
  })
})
