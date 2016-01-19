import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import driver from '../../src/module'
import form from './form'

const model = Model({})
const controller = Controller(model)
controller.model = model
controller.reset = () => {
  model.tree.set({})
  model.tree.commit()
}

// register the driver module
controller.modules({
  driver: driver({
    debounceTimeout: 0
  }),
  form
})

export default controller
