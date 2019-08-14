<template>
  <div class="spinner">Loading...</div>
</template>
<style scoped>
.spinner {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.spinner:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #f00;
  border-color: #f00 transparent #f00 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Spinner extends Vue {}
</script>
