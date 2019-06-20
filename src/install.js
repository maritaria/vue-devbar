/** @class ComponentOptions
 * @property {?Devbar} devbar
 */

/**
 * @param {VueConstructor<Vue>} vue
 */
export function install(vue) {
  vue.mixin({
    /** @this Vue */
    beforeCreate() {
      const options = this.$options;
      if (options.devbar) {
        this._devbar = options.devbar;
        this.$devbar.init(this);
      } else if (this.$root && this.$root.$devbar) {
        this._devbar = this.$root.$devbar;
      }
      // Make the Devbar class instance reactive
      vue.util.defineReactive(this, "_devbar");
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
