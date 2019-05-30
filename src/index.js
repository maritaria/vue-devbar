import { install } from "./install";

export default class Devbar {
  static install(vue, options) {
    install(vue, options);
  }

  root = null;

  /**
   * Called by the global mixin when the devbar instance is passed as option to a vue component (assumed app root component).
   * @private
   * @param {Vue} app
   */
  init(app) {
    this.root = app;
  }
}
