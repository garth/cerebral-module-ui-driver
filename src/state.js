import { Computed } from 'cerebral'

export default Computed(({ driver = 'driver', form }) => ({
  driverState: driver,
  formState: form
}), ({driver = 'driver', form, driverState, formState}) => {
  return {
    driver: driverState,
    form: formState,
    meta: {
      driverModuleName: driver,
      driverModulePath: driver.split('.'),
      formModuleName: form,
      formModulePath: form.split('.')
    }
  }
})
