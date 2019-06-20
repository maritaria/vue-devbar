/**
 * Define the DevbarOptions type, each decorator code file will add its own extensions to it
 * @typedef {Object} DevbarOptions
 * @property {DebugActionInfo[]} actions
 * @property {CloakOptions} cloak
 */

/**
 * @typedef {Object} CloakOptions
 * @property {boolean} self
 * @property {boolean} children
 */

/**
 * Extend the ComponentOptions to add devbarOptions, not set by users themselves but populated by the decorators
 * @class ComponentOptions
 * @property {DevbarOptions} devbarOptions
 */

/**
 * @param {ComponentOptions} options
 * @returns {DevbarOptions}
 */
export function getDevbarOptions(options) {
  return (
    options.devbarOptions ||
    (options.devbarOptions = {
      actions: [],
      cloak: { self: false, children: false }
    })
  );
}

export function getComponentName(component) {
  return component.$options.name || (component.$vnode && component.$vnode.tag);
}
