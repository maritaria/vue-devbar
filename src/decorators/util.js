/**
 * Define the DevbarOptions type, each decorator code file will add its own extensions to it
 * @typedef {Object} DevbarOptions
 * @property {DebugActionInfo[]} actions
 */

/**
 * @param options
 * @returns {DevbarOptions}
 */
export function getDevbarOptions(options) {
  return (
    options.devbarOptions ||
    (options.devbarOptions = {
      actions: []
    })
  );
}
