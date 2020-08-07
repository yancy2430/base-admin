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
      result: Array,
    },data() {
      return {
        data: [],
        value: [],
        mValue:this.result,
      };
    },
    watch: {
      result(val) {
        this.mValue = val;//新增result的watch，监听变更并同步到myResult上
      },
      mValue(val){
        //xxcanghai 小小沧海 博客园
        let v = []
        for (let i = 0; i < val.length; i++) {
          v.push(val[i].key)
        }
        this.$emit("input",v);
      }
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