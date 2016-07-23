import { Computed } from 'cerebral'

export default Computed(({driverModuleName, formModuleName}) => ({
  driver: driverModuleName,
  form: formModuleName
}), ({driver, form, driverModuleName, formModuleName}) => {
  // console.log(driver, form)
  return {
    driver,
    form,
    meta: {
      driverModuleName,
      driverModulePath: driverModuleName.split('.'),
      formModuleName,
      formModulePath: formModuleName.split('.')
    }
  }
})
