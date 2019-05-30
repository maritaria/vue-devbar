<template>
  <div class="devbar-host">
    <devbar-tools />
  </div>
</template>
<style scoped lang="scss">
.devbar-host {
  /* CSS reset inherited properties */
  all: initial;
  /* Fixate the tool at the bottom of the screen */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import DevbarTools from "./DevbarTools";

@Component({
  components: { DevbarTools }
})
export default class ToolHost extends Vue {}
</script>
