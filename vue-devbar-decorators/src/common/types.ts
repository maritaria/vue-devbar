import Vue, {ComponentOptions} from "vue";

// Supporing types

export type DecoratedVueOptions<V extends Vue> = ComponentOptions<V> & {
  devbarDecoratorData?: DevbarData<V>,
}
export type VueComponentMethod<V extends Vue> = (this: V, ...args: any[]) => any

// Devbar types

export type DevbarData<V extends Vue> = {
  cloak: CloakData,
  kicks: KickData<V>[],
  mocks: { [key: string]: MockData<V> },
}

export type CloakData = {
  self: boolean,
  children: boolean,
}

export type KickData<V extends Vue> = {
  label: string,
  method: VueComponentMethod<V>,
}

export type MockData<V extends Vue> = {
  label: string,
  type: MockTargetType,
  key: string,
  entries: MockEntry<V>[],
}

export enum MockTargetType {
  Data = 'data',
  Computed = 'computed',
  Property = 'property',
}

export type MockEntry<V extends Vue> = {
  label: string,
  factory: (this: V, vm: V) => any,
}
