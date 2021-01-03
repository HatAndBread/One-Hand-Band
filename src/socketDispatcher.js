const socketDispatcher = {
  events: [],
  dispatch: function (event, data) {
    if (!this.events[event]) {
      return;
    }
    this.events[event](data);
  },
  subscribe: function (event, callback) {
    if (!this.events[event]) {
      this.events[event] = callback;
    }
  },
  test: function (thing) {
    console.log(thing);
  }
};

export default socketDispatcher;
