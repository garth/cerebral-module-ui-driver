import Controller from 'cerebral';
import Model from 'cerebral-baobab';

const state = {
  locale: 'en'
};

const model = Model(state);
const controller = Controller(model, {});
controller.model = model;
controller.reset = () => {
  model.tree.set(state);
  model.tree.commit();
};

export default controller;
