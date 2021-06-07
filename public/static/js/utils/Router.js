import html from './html.js'

import OrganizationsView from '../views/OrganizationsView.js'
import OrganizationConstructorView from '../views/OrganizationConstructorView.js'

import OrganizationsController from '../controllers/OrganizationsController.js'
import OrganizationConstructorController from '../controllers/OrganizationConstructorController.js'

export default class Router {
  constructor() {
    this.wrapper = document.querySelector('.main-content__wrapper');
  }

  init(model) {
    this.model = model;
    this.route();
  }

  route() {
    const routes = [
      { 
        path: '/',
        init: () => {
          const view = new OrganizationsView();
          const controller = new OrganizationsController(view, this.model);

          controller.init();
        }
      },
      { 
        path: '/organization-constructor/:action/:id',
        init: (params) => {
          const view = new OrganizationConstructorView();
          const controller = new OrganizationConstructorController(view, this.model);

          controller.init(params);
        }
      }
    ];

    const potentialMatches = routes.map(route => {
      return {
        route: route,
        result: location.pathname.match(this.pathToRegex(route.path))
      };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
      console.log('Did not find a match!');
      match = {
        route: routes[0],
        result: [location.pathname]
      }
    }

    this.render(match.route.path);
    match.route.init(this.getParams(match));
  }

  pathToRegex(path) {
    return new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');
  }

  getParams(match) {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map( (key, i) => {
      return [key, values[i]];
    }));
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.route();
  }

  render(path) {
    this.setTitle(path);
    this.wrapper.innerHTML = this.getHtml(path);
  }

  getHtml(path) {
    return html[path];
  }

  setTitle(path) {
    let title = '';

    switch (path) {
      case '/' : title = 'Organizations'; break;
      case '/organization-constructor/:action/:id' : title = 'Organization Constructor'; break;
    }
    document.title = title;
  }
}