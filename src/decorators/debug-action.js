import { createDecorator } from "vue-class-component";
import { getDevbarOptions } from "../component-info";

class DebugActionInfo {
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

export function DebugAction({ label } = {}) {
  return createDecorator((component, key) => {
    const method = component.methods[key];
    console.assert(method, "DebugAction could not find the method");
    const devbar = getDevbarOptions(component);
    const data = new DebugActionInfo({
      label: label || method.name,
      method
    });
    (devbar.actions || (devbar.actions = [])).push(data);
  });
}
