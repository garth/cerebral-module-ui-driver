/*global beforeEach,afterEach,describe,it*/
import { expect } from 'chai'
import sendSignal from '../helpers/sendSignal'
import controller from '../helpers/controller'

const signals = controller.getSignals()

describe('signals', function () {
  afterEach(function () {
    controller.reset()
  })

  describe('driver.isOpenChanged', function () {
    let tree

    beforeEach(function () {
      tree = controller.model.tree
      tree.set({ testPath: null })
      tree.commit()
    })

    it('should set a given value on a give statePath', function () {
      return sendSignal(controller, signals.driver.isOpenChanged, {
        statePath: 'testPath',
        value: 'x'
      }, () => {
        expect(tree.get('testPath')).to.equal('x')
      })
    })
  })
})
