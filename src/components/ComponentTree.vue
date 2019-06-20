<template>
  <div>
    <div>
      filter settings
    </div>
    <component-tree-node :item="root" />
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ComponentTreeNode from "./ComponentTreeNode";
import { Cloak } from "../decorators/cloak";

@Component({
  components: { ComponentTreeNode }
})
@Cloak()
export default class ComponentTree extends Vue {
  /** @member {Vue} */
  @Prop({ type: Vue })
  root;
}
</script>
