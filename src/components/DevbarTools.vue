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
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getDevbarOptions } from "../decorators/util";

@Component({})
export default class DevbarTools extends Vue {
  get root() {
    return this.$devbar.root;
  }
  get actions() {
    console.log(this.root);
    return getDevbarOptions(this.root.$options).actions;
  }
}
</script>
