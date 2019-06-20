<template>
  <div>
    <label :for="id(key)">{{ group.label }}</label>
    <template v-if="group.isToggle">
      <input type="checkbox" v-model="toggleProxy(group).state" :id="id(key)" />
    </template>
    <template v-else>
      <select
        @change="selectPreset(group, $event.target.selectedIndex)"
        :value="group.getActiveMock(component)"
      >
        <option
          v-for="preset in group.presets"
          :key="preset.label"
          :value="preset"
        >
          {{ preset.label }}
        </option>
      </select>
    </template>
    <button @click="unbind"></button>
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { MockGroupInfo } from "../../decorators/mock";

@Component({})
export default class MockBinding extends Vue {
  @Prop({ type: Vue })
  component;
  @Prop({ type: MockGroupInfo })
  group;

  id(name) {
    return `mock-binding-${this._uid}-${name}`;
  }

  selectPreset(group, index) {
    const mock = group.presets[index];
    group.setActiveMock(this.component, mock);
  }

  toggleProxy(group) {
    console.assert(group.isToggle);
    const mock = group.presets[0];
    const self = this;
    return {
      get state() {
        return group.getActiveMock(self.component) === mock;
      },
      set state(value) {
        if (value) {
          group.setActiveMock(self.component, mock);
        } else {
          group.setActiveMock(self.component, null);
        }
      }
    };
  }
}
</script>
