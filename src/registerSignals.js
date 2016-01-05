import { setStateValue, validateForm } from './actions';

export default function register(controller) {

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
