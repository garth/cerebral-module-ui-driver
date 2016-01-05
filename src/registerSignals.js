import { setStateValue, validateForm } from './actions';

export default function register(controller) {

  controller.signal('driver.isOpenChanged', [
    setStateValue
  ]);

  controller.signalSync('driver.valuesChanged', [
    validateForm, {
      success: [],
      error: []
    }
  ]);

}
