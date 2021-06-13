import Router from './router/Router.js'
import observer from './helpers/observer.js'
import asyncObserver from './helpers/async-observer.js'

import Model from './mvc/Model.js'
import View from './mvc/View.js'
import Controller from './mvc/Controller.js'

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();

  window.app = window.app || {};
  window.app.observer = observer;
  window.app.asyncObserver = asyncObserver;

  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view, router);

  controller.init();
});