export default class SomeController {
  constructor(view, model) {
    this.model = model;
    this.view = view;
  }

  init(params) {
    this.view.init(params.id);
  }
}