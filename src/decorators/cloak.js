import { getDevbarOptions } from "../component-info";

/**
 * @param self {boolean} Prevent the component from being sniped
 * @param children {boolean} Prevent children from being sniped
 */
export function Cloak({ self = true, children = true } = {}) {
  return something => {
    console.assert(something.__decorators__, "Use decorator after @Component");
    something.__decorators__.push(options => {
      const devbar = getDevbarOptions(options);
      devbar.cloak = { self, children };
    });
    return something;
  };
}
