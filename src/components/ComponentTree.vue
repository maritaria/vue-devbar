<template>
  <component-tree-node :item="root" />
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ComponentTreeNode from "./ComponentTreeNode";

@Component({
  components: { ComponentTreeNode }
})
export default class ComponentTree extends Vue {
  /** @member {Vue} */
  @Prop({ type: Vue })
  root;
}
</script>
