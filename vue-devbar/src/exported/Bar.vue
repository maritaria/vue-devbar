<template>
  <div class="test">reddit</div>
</template>
<style scoped lang="scss">
.test {
  font-size: 100px;
}
</style>
<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
class Bar extends Vue {
}
export default Bar;
</script>
