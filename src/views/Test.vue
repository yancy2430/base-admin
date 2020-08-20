<template>
  <section>
    <!-- Two-way Data-Binding -->
<!--    <Editor/>-->
    <r-select :inputType="9" :hash="-912237235" value="1208681585011900417"></r-select>
    <r-select :inputType="15" :hash="2025773125" value="1"></r-select>
    <r-select :inputType="11" :hash="-1863031764" value="1"></r-select>
    <r-select :inputType="14" :hash="-1863031764" value="1"></r-select>
    <r-select :inputType="10" :hash="181221937" value="1"></r-select>
  </section>
</template>
<script>

  import Editor from '../base/Editor.vue'
  import RSelect from '../base/modules/RSelect'

  export default {
    name: 'Test',
    components: {
      RSelect,
      Editor
    }
  }
</script>

<style>
</style>
