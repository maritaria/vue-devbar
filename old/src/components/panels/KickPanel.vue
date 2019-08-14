<template>
  <div>
    Kicks
    <button
      v-for="kick in kicks"
      :key="kick.label"
      @click.prevent="kick.execute(component)"
    >
      {{ kick.label }}
    </button>
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { getDevbarOptions } from "../../component-info";

@Component({})
export default class KickPanel extends Vue {
  /** @member {Vue} */
  @Prop({ type: Vue })
  component;

  get kicks() {
    return this.component
      ? getDevbarOptions(this.component.$options).kicks
      : [];
  }
}
</script>
