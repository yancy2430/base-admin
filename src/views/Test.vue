<template>
  <section>
    <!-- Two-way Data-Binding -->
<!--    <Editor/>-->
    <r-select :inputType="9" :hash="-912237235" v-model="a" @change="onChange"></r-select>
    <r-select :inputType="15" :hash="2025773125" v-model="b" @change="onChange"></r-select>
    <r-select :inputType="11" :hash="-1863031764" v-model="c" @change="onChange"></r-select>
    <r-select :inputType="14" :hash="-1863031764" v-model="d" @change="onChange"></r-select>
    <r-select :inputType="10" :hash="181221937" v-model="e" @change="onChange"></r-select>
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
    },
    data(){
      return {
        a:'1208681585011900417',
        b:['admin','cpjl'],
        c:0,
        d:1,
        e:["1204222459389214720", "1204222459389214721", "1204222661546278913"],
      }
    },
    methods:{
      onChange(v){
        // console.log(this.a)
        console.log(this.e)
        // console.log(this.c)
        // console.log(this.d)
        // console.log(this.e)
      }
    }
  }
</script>

<style>
</style>
