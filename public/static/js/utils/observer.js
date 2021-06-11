export default {
  subscribers : {},

  subscribeEvent(name, subscriber) {
    if (typeof subscriber === 'function') {
      this.subscribers[name] = subscriber;
    }
  },

  callEvent(name, data) {
    if (!this.subscribers[name]) return null;
    this.subscribers[name](data);
  }
};