/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import onSignalEnd from '../helpers/onSignalEnd'
import controller from '../helpers/controller'
import driver from '../../src/bind'
import state from '../../src/state'

const modules = controller.getModules()
const bind = function () {
  return driver({ modules, state: state({ form: 'form' }).get(controller.get()) })
}

describe('bindings', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('menu', function () {
    beforeEach(function () {
      let tree = controller.model.tree
      tree.set({ driver: { form: { fields: { menu: { isOpen: true } } } } })
      tree.commit()
    })

    it('should be initially open', function () {
      let props = bind().menu('menu')
      expect(props.isOpen).to.be.true
      expect(props.onClose).to.be.a.function
    })

    it('changes to closed onClose', function () {
      let props = bind().menu('menu')
      const promise = onSignalEnd(controller, function () {
        props = bind().menu('menu')
        expect(props.isOpen).to.be.false
        expect(props.onClose).to.be.a.function
      })
      props.onClose()
      return promise
    })
  })
})
