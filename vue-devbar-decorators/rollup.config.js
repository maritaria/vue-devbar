export default {
  input: 'lib/vue-devbar-decorators.js',
  output: {
    file: 'lib/vue-devbar-decorators.umd.js',
    format: 'umd',
    name: 'VueDevbarDecorators',
    globals: {
      'vue': 'Vue',
      'vue-class-component': 'VueClassComponent',
    },
    exports: 'named',
  },
  external: ['vue', 'vue-class-component'],
}
