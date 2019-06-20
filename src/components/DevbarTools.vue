<template>
  <div class="devbar-tools">
    <kick-panel :component="focus" />
    <mock-panel :component="focus" />
    <button @click="snipe">Snipe</button>
    <component-tree :root="focus" />
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getDevbarOptions } from "../component-info";
import ComponentTree from "./ComponentTree";
import KickPanel from "./panels/KickPanel";
import MockPanel from "./panels/MockPanel";

@Component({
  components: { MockPanel, KickPanel, ComponentTree }
})
export default class DevbarTools extends Vue {
  get focus() {
    return this.$devbar.root;
  }

  set focus(value) {
    this.$devbar.root = value;
  }

  get mockGroups() {
    return getDevbarOptions(this.$devbar.root.$options).mocks;
  }

  snipe() {
    document.addEventListener("click", e => this.snipe_click(e), {
      capture: true,
      once: true
    });
  }

  /**
   * @param {MouseEvent} e
   */
  snipe_click(e) {
    e.preventDefault();
    e.stopPropagation();
    for (let elem = e.target; elem; elem = elem.parentElement) {
      const vue = elem.__vue__;
      if (vue) {
        this.$devbar.root = vue;
        break;
      }
    }
  }
}
</script>
