import html from './html.js'
import routeConfig from './routeConfig.js'

export default class Router {
  constructor() {
    this.wrapper = document.querySelector('.main-content__wrapper');
  }

  init(model) {
    this.routeConfig = new routeConfig(model);
    this.route();
  }

  route() {
    const potentialMatches = this.routeConfig.routes.map(route => {
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

    this.render(match.route);
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

  render(route) {
    if (!this.getHtml(route.path)) {
      this.navigateTo('/');
      this.route();
      return null;
    }

    this.setTitle(route.title);
    this.wrapper.innerHTML = this.getHtml(route.path);
  }

  getHtml(path) {
    return html[path];
  }

  setTitle(title) {
    document.title = title;
  }
}