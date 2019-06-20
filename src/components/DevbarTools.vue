<template>
  <div class="devbar-tools">
    tools
    <button
      v-for="action in actions"
      :key="action.label"
      @click.prevent="action.execute(root)"
    >
      {{ action.label }}
    </button>
    <component-tree :root="$devbar.root" />
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getDevbarOptions } from "../component-info";
import ComponentTree from "./ComponentTree";

@Component({
  components: { ComponentTree }
})
export default class DevbarTools extends Vue {
  get actions() {
    return getDevbarOptions(this.$devbar.root.$options).actions;
  }
}
</script>
