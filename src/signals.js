import { setStateValue, validateForm } from './actions';

export default {

  register(controller) {

    controller.signal('driver.isOpenChanged', [
      setStateValue
    ]);

    controller.signal('driver.valuesChanged', [
      validateForm, {
        success: [],
        error: []
      }
    ]);

  }

}
