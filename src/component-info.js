/**
 * Define the DevbarOptions type, each decorator code file will add its own extensions to it
 * @typedef {Object} DevbarDecoratorData
 * @property {KickInfo[]} kicks
 * @property {CloakInfo} cloak
 */

/**
 * Extend the ComponentOptions to add devbarOptions, not set by users themselves but populated by the decorators
 * @class ComponentOptions
 * @property {DevbarDecoratorData} devbarDecoratorData
 */

/**
 * @param {ComponentOptions} options
 * @returns {DevbarDecoratorData}
 */
export function getDevbarOptions(options) {
  return (
    options.devbarDecoratorData ||
    (options.devbarDecoratorData = {
      kicks: [],
      cloak: { self: false, children: false }
    })
  );
}

export function getComponentName(component) {
  return component.$options.name || (component.$vnode && component.$vnode.tag);
}
