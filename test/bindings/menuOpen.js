/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import { Computed } from 'cerebral'
import onSignalEnd from '../helpers/onSignalEnd'
import controller from '../helpers/controller'
import driver from '../../src/bind'
import state from '../../src/state'

const modules = controller.getModules()
const bind = function () {
  Computed.cache = {}
  return driver({ modules, state: state({ form: 'form' }).get(controller.get()) })
}

describe('bindings', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('menuOpen', function () {
    beforeEach(function () {
      let tree = controller.model.tree
      tree.set({ driver: { form: { fields: { menu: { isOpen: false } } } } })
      tree.commit()
    })

    it('should be initially closed', function () {
      let menuProps = bind().menu('menu')
      let props = bind().menuOpen('menu')
      expect(menuProps.isOpen).to.be.false
      expect(props.onOpen).to.be.a.function
    })

    it('changes to open onClick', function () {
      let props = bind().menuOpen('menu')
      const promise = onSignalEnd(controller, function () {
        let menuProps = bind().menu('menu')
        expect(menuProps.isOpen).to.be.true
      })
      props.onClick()
      return promise
    })
  })
})
