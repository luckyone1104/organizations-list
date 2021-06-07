import Router from './utils/Router.js'
import observer from './utils/observer.js'

import Model from './models/Model.js'
import View from './views/View.js'
import Controller from './controllers/Controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();

  window.app = window.app || {};
  window.app.observer = observer;

  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view, router);

  controller.init();
});