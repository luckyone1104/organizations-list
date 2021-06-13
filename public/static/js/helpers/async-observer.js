export default {
  subscribers : {},

  subscribeEvent(name, subscriber) {
    if (typeof subscriber === 'function') {
      this.subscribers[name] = subscriber;
    }
  },

  async callEvent(name, data) {
    if (!this.subscribers[name]) return null;
    await this.subscribers[name](data);
  }
};