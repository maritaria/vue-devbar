<template>
  <div id="app">
    <navigation />
    <router-view />
    <devbar-host />
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import DevbarHost from "../src/components/DevbarHost";
import Navigation from "./components/Navigation";

@Component({
  components: {
    Navigation,
    DevbarHost
  }
})
export default class App extends Vue {}
</script>
