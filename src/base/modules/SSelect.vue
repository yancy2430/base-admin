<template>
  <div>
    <a-select
      v-if="data.length>5"
      mode="multiple">
      <a-select-option v-for="d in data" :key="d.id" :value="d.id">
        {{d.name}}
      </a-select-option>
    </a-select>
    <a-checkbox-group v-else >
      <a-checkbox :value="d.id" v-for="d in data" :key="d.id">
        {{d.name}}
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>
<script>
  import {  getEnums } from '@/api/baseData'
  export default {
    name: 'SSelect',
    props: {
      hash: Number,
    },data() {
      return {
        data: [],
        value: [],
      };
    },
    created () {
      getEnums(this.hash)
        .then(res => {
          this.data = res.data;
        })
    }

  }
</script>

<style scoped>

</style>