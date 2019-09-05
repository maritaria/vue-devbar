import Vue, {ComponentOptions} from "vue";
import {DecoratedClass} from "vue-class-component/lib/declarations";
import {getDevbarOptions} from "../common/component-info";
import {CloakData} from "../common/types";

export function Cloak(cloakOptions: CloakData): MethodDecorator {
  return (componentClass: DecoratedClass) => {
    console.assert(componentClass.__decorators__, "Use @Cloak decorator after @Component");
    componentClass.__decorators__.push((options: ComponentOptions<Vue>) => {
      const devbar = getDevbarOptions(options);
      devbar.cloak = {...cloakOptions};
    });
  };
}
