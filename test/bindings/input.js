/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import onSignalEnd from '../helpers/onSignalEnd'
import controller from '../helpers/controller'
import driver from '../../src/driver'

const modules = controller.getModules()
let tree
const bind = function () {
  return driver({ module: modules.form, modules, state: tree.get() })
}

describe('bindings', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('input', function () {
    beforeEach(function () {
      tree = controller.model.tree
      tree.set({ form: { email: '', number: 0, date: null, time: null } })
      tree.commit()
    })

    it('should be initially valid', function () {
      let props = bind().input('email')
      expect(props.value).to.equal('')
      expect(props.isError).to.be.false
      expect(props.isValidating).to.be.false
      expect(props.message).to.be.undefined
      expect(props.onChange).to.be.a.function
      expect(props.type).to.equal('text')
    })

    it('updates the value on change', function () {
      let props = bind().input('email')
      const promise = onSignalEnd(controller, function () {
        props = bind().input('email')
        expect(props.value).to.equal('test')
        expect(props.isError).to.be.false
        expect(props.isValidating).to.be.false
        expect(props.message).to.be.undefined
        expect(props.onChange).to.be.a.function
        expect(props.type).to.equal('text')
      })
      props.onChange({ target: { value: 'test' } })
      return promise
    })

    it('fails an invalid type', function () {
      let props = bind().input('number')
      const promise = onSignalEnd(controller, function () {
        props = bind().input('number', { type: 'number' })
        expect(props.value).to.equal('x')
        expect(props.isError).to.be.true
        expect(props.isValidating).to.be.false
        expect(props.message).to.equal('invalid number')
        expect(props.onChange).to.be.a.function
        expect(props.type).to.equal('number')
      })
      props.onChange({ target: { value: 'x' } })
      return promise
    })

    it('casts numbers', function () {
      let props = bind().input('number')
      const promise = onSignalEnd(controller, function () {
        props = bind().input('number', { type: 'number' })
        expect(tree.get(['form', 'number'])).to.equal(5)
        expect(props.value).to.equal('5')
        expect(props.isError).to.be.false
        expect(props.isValidating).to.be.false
        expect(props.message).to.be.undefined
        expect(props.onChange).to.be.a.function
        expect(props.type).to.equal('number')
      })
      props.onChange({ target: { value: '5' } })
      return promise
    })

    it('casts dates', function () {
      let props = bind().input('date')
      expect(props.value).to.equal('')
      expect(props.isError).to.be.false
      expect(props.isValidating).to.be.false
      expect(props.message).to.be.undefined
      expect(props.onChange).to.be.a.function
      const promise = onSignalEnd(controller, function () {
        props = bind().input('date')
        expect(tree.get(['form', 'date'])).to.eql(new Date('2012-12-12'))
        expect(props.value).to.equal('2012-12-12')
        expect(props.isError).to.be.false
        expect(props.isValidating).to.be.false
        expect(props.message).to.be.undefined
      })
      props.onChange({ target: { value: '2012-12-12' } })
      return promise
    })

    it('casts times', function () {
      let props = bind().input('time')
      expect(props.value).to.equal('')
      expect(props.isError).to.be.false
      expect(props.isValidating).to.be.false
      expect(props.message).to.be.undefined
      expect(props.onChange).to.be.a.function
      const promise = onSignalEnd(controller, function () {
        props = bind().input('time')
        expect(tree.get(['form', 'time'])).to.equal(60)
        expect(props.value).to.equal('01:00')
        expect(props.isError).to.be.false
        expect(props.isValidating).to.be.false
        expect(props.message).to.be.undefined
      })
      props.onChange({ target: { value: '01:00' } })
      return promise
    })

    it('fails when valid function outputs an error', function () {
      let props = bind().input('number')
      const promise = onSignalEnd(controller, function () {
        props = bind().input('number', { type: 'number' })
        expect(props.value).to.equal('11')
        expect(props.isError).to.be.true
        expect(props.isValidating).to.be.false
        expect(props.message).to.equal('too big')
        expect(props.onChange).to.be.a.function
        expect(props.type).to.equal('number')
      })
      props.onChange({ target: { value: '11' } })
      return promise
    })
  })
})
