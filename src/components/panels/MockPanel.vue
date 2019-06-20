<template>
  <div>
    Mocks
    <mock-binding
      v-for="(group, key) in mockGroups"
      :key="key"
      :component="component"
      :group="group"
    />
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { getDevbarOptions } from "../../component-info";
import MockBinding from "./MockBinding";

@Component({
  components: { MockBinding }
})
export default class MockPanel extends Vue {
  /** @member {Vue} */
  @Prop({ type: Vue })
  component;

  /**
   * @returns {Record<string,MockGroupInfo>}
   */
  get mockGroups() {
    return this.component
      ? getDevbarOptions(this.component.$options).mocks
      : {};
  }
}
</script>
