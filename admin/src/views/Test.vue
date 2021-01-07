<template>
  <section>
    <!--<mavon-editor v-if="$auth('AdminInfo')" />-->
    <td-city-select @change="onChange" v-model="aaaa"></td-city-select>
  </section>
</template>
<script>
  import request from '../utils/request'
  import TdCitySelect from '../base/TdCitySelect'

  export default {
    components: { TdCitySelect },
    data() {
      return {
        aaaa: "",
      };
    },
    methods:{
      onChange(value, selectedOptions) {
        console.log(value, selectedOptions)
        console.log(this.aaaa)
      },
    }
  };
</script>

<style>
</style>
