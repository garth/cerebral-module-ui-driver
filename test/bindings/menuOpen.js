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

  describe('menuOpen', function () {
    beforeEach(function () {
      tree = controller.model.tree
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
