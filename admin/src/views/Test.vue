<template>
  <section>
    <mavon-editor/>
  </section>
</template>
<script>
  import mavonEditor from 'mavon-editor'
  require('mavon-editor/dist/css/index.css')
  export default {
    name: 'Test',
    components: {
      'mavon-editor': mavonEditor.mavonEditor

    },
    data(){
      return {
      }
    },
    methods:{
    }
  }
</script>

<style>
</style>
