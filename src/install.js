/**
 * @param {VueConstructor<Vue>} vue
 * @param {Object} options
 */
export function install(vue, options = {}) {
  vue.mixin({
    beforeCreate() {
      const options = this.$options;
      if (options.devbar) {
        this._devbar = options.devbar;
      } else if (this.$root && this.$root._devbar) {
        this._devbar = this.$root._devbar;
      }
      // Make the Devbar class instance reactive
      vue.util.defineReactive(this, '_devbar');
    }
  });

  /**
   * Define the $devbar property on Vue instances since it gets added by install
   * @class Vue
   * @property {Devbar} $devbar
   */
  Object.defineProperty(vue.prototype, "$devbar", {
    get() {
      return this._devbar;
    }
  });
}
