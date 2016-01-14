import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'
import driver from '../../src'
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
  driver: driver({}),
  form
})

export default controller
