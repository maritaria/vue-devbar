import Vue from 'vue';
import {DecoratedVueOptions, DevbarData} from './types';

export function getDevbarOptions<V extends Vue>(options: DecoratedVueOptions<V>): DevbarData<V> {
  return (
    options.devbarDecoratorData ||
    (options.devbarDecoratorData = {
      kicks: [],
      mocks: [],
      cloak: {self: false, children: false}
    })
  );
}

export function getComponentName(component: Vue): string {
  return component.$options.name || (component.$vnode && component.$vnode.tag) || "";
}
