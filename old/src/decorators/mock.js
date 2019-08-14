import { createDecorator } from "vue-class-component";
import { getDevbarOptions } from "../component-info";
import Vue from "vue";

// Key inserted into components to track what mocks are active for which props
const ACTIVE_MOCKS_KEY = "devbar_active_mocks";
// Key used for storage of $data based mocks
const DATA_MOCKS_KEY = "devbar_data_mocks";

Vue.mixin({
  data: () => ({
    [ACTIVE_MOCKS_KEY]: {},
    [DATA_MOCKS_KEY]: {}
  })
});

export class MockInfo {
  /** @member {string} */
  key;
  /** @member {string} */
  label;
  /** @member {function(): *} */
  factory;
  /** @member {MockInfoGroup} */
  group;

  constructor({ label, factory, group }) {
    this.label = label;
    this.factory = factory;
    this.group = group;
  }
}

export class MockGroupInfo {
  /** @member {string} */
  label;
  /** @member {string} */
  key;
  /** @member {boolean} */
  isComputed;
  /** @member {MockInfo[]} */
  presets;
  /** @member {WeakMap} */
  activationMap;

  constructor(label, key, isComputed) {
    this.label = label;
    this.key = key;
    this.isComputed = isComputed;
    this.presets = [];
    this.activationMap = new WeakMap();
  }

  /**
   * @param {ComponentOptions} component
   * @param {string} key
   * @param {string} label
   */
  static install(component, key, label = key) {
    const isComputed = component.computed.hasOwnProperty(key);
    const group = new MockGroupInfo(label, key, isComputed);
    if (isComputed) {
      const computed = component.computed[key];
      const isFunction = typeof computed === "function";
      const newComputed = {};
      newComputed.set = isFunction ? undefined : computed.set;
      const getter = isFunction ? computed : computed.get;
      console.assert(getter, "No computed getter for mock to override");
      newComputed.get = function mockComputedGetter(vm) {
        const activeMock = group.getActiveMock(vm);
        if (activeMock) {
          return activeMock.factory(vm);
        } else {
          return getter.call(vm, vm);
        }
      };
      component.computed[key] = newComputed;
    }
    return group;
  }

  /**
   * Indicates if the group has only 1 preset
   * If it only has one preset then you should just toggle this on/off
   * @returns {boolean}
   */
  get isToggle() {
    return this.presets.length === 1;
  }

  /**
   * @param {Vue} component
   * @returns {?MockInfo}
   */
  getActiveMock(component) {
    const mocks = component[ACTIVE_MOCKS_KEY];
    if (!mocks.hasOwnProperty(this.key)) {
      Vue.set(mocks, this.key, undefined);
    }
    return mocks[this.key];
  }

  /**
   * Sets a mock to be the active override for a data or computed property
   * @param {Vue} component
   * @param {?MockInfo} mock
   */
  setActiveMock(component, mock) {
    console.assert(
      !mock || this.presets.includes(mock),
      "using preset not registered with group"
    );
    const mocks = component[ACTIVE_MOCKS_KEY];
    Vue.set(mocks, this.key, mock);
  }
}

export function MockGroup(label) {
  return createDecorator((component, key) => {
    const devbar = getDevbarOptions(component);
    if (devbar.mocks.hasOwnProperty(key)) {
      console.warn("mock group already created, use @MockGroup before @Mock");
      devbar.mocks[key].label = label;
    } else {
      Vue.set(devbar.mocks, key, MockGroupInfo.install(component, key, label));
    }
  });
}

export function Mock({ label, factory } = {}) {
  return createDecorator((component, key) => {
    console.assert(typeof factory === "function", "factory must be a function");
    const devbar = getDevbarOptions(component);
    if (!devbar.mocks.hasOwnProperty(key)) {
      Vue.set(devbar.mocks, key, MockGroupInfo.install(component, key));
    }
    devbar.mocks[key].presets.push(
      new MockInfo({
        label,
        factory
      })
    );
  });
}
