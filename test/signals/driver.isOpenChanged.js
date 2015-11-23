import { expect } from 'chai';
import sendSignal from '../helpers/sendSignal';
import controller from '../helpers/controller';
import signals from '../../src/signals';
signals.register(controller);

describe('signals', function () {

  afterEach(function () {
    controller.reset();
  });

  describe('driver.isOpenChanged', function () {

    beforeEach(function () {
      this.tree = controller.model.tree;
      this.tree.set({ testPath: null });
      this.tree.commit();
    });

    it('should set a given value on a give statePath', function () {
      return sendSignal(controller, controller.signals.driver.isOpenChanged, {
        statePath: 'testPath',
        value: 'x'
      }, () => {
        expect(this.tree.get('testPath')).to.equal('x');
      });
    });

  });

});
