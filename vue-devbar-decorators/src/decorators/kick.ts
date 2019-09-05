import {createDecorator} from "vue-class-component";
import {getDevbarOptions} from "../common/component-info";
import Vue, {ComponentOptions} from "vue";

export type KickSettings = {
  label?: string
}

export function Kick(kickInfo: KickSettings = {}): MethodDecorator {
  return createDecorator((component: ComponentOptions<Vue>, key: string) => {
    const method = component.methods[key];
    console.assert(method, "Use @Kick on a method");
    const devbar = getDevbarOptions(component);
    devbar.kicks.push({
      label: kickInfo.label || method.name,
      method,
    });
  });
}
