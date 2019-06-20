<template>
  <li class="node" :class="{ expanded, leaf }">
    <div class="node__parent">
      <a @click="expanded = !expanded">
        <i class="mdi" :class="expanderIcon" />
        {{ title }}
      </a>
    </div>
    <ul v-if="!childrenHidden && expanded" class="node__children">
      <component-tree-node
        v-for="child in children"
        :key="child._uid"
        :item="child"
      />
    </ul>
  </li>
</template>
<style scoped lang="scss">
@import "../style/bootstrap";

.node {
  display: block;

  & > .node__children {
    margin-left: $indent;
  }
}
</style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { getComponentName, getDevbarOptions } from "../decorators/util";

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
    const result = [];
    // Pending is a reversed array so when we push() children of a node they get popped first
    const pending = this.item.$children.slice();
    while (pending.length) {
      const current = pending.shift();
      if (!current.$options) {
        continue;
      }
      const cloak = getDevbarOptions(current.$options).cloak;
      if (!cloak.self) {
        result.push(current);
      } else if (!cloak.children) {
        pending.unshift(...current.$children);
      }
    }
    return result;
  }

  get title() {
    return this.itemName ? this.itemName : "[unnamed]";
  }

  get itemName() {
    return getComponentName(this.item);
  }

  get leaf() {
    return this.childrenHidden || this.children.length === 0;
  }

  get expanderIcon() {
    if (this.leaf) {
      return "mdi-circle-medium";
    }
    return this.expanded ? "mdi-chevron-down" : "mdi-chevron-right";
  }

  get childrenHidden() {
    return (
      !this.postMount && getDevbarOptions(this.item.$options).cloak.children
    );
  }
}
</script>
