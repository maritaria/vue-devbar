<template>
  <li>
    <button @click.prevent="expanded = !expanded">{{ title }}</button>
    <ul v-if="postMount && expanded">
      <component-tree-node
        v-for="child in children"
        :key="child._uid"
        :item="child"
      />
    </ul>
  </li>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class ComponentTreeNode extends Vue {
  /** @member {Vue} */
  @Prop({ type: Vue })
  item;

  expanded = false;
  postMount = false;

  async mounted() {
    // For the root elem it can be a tick until $vnode is set, because of this we wait 1 more tick.
    // If after the wait no $vnode exists then I dont know what to do for now.
    if (!this.item.$vnode) {
      await this.$nextTick();
    }
    this.postMount = true;
  }

  get children() {
    return this.item.$children;
  }

  get title() {
    return this.itemName ? this.itemName : "[unnamed]";
  }

  get itemName() {
    return (
      this.item.$options.name || (this.item.$vnode && this.item.$vnode.tag)
    );
  }
}
</script>
