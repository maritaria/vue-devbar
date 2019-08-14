import { createDecorator } from "vue-class-component";
import { getDevbarOptions } from "../component-info";

class KickInfo {
  label;
  method;

  constructor({ label, method }) {
    this.label = label;
    this.method = method;
  }

  execute(instance, ...args) {
    return this.method.call(instance, ...args);
  }
}

export function Kick({ label } = {}) {
  return createDecorator((component, key) => {
    const method = component.methods[key];
    console.assert(method, "Kick could not find the method");
    const devbar = getDevbarOptions(component);
    devbar.kicks.push(
      new KickInfo({
        label: label || method.name,
        method
      })
    );
  });
}
