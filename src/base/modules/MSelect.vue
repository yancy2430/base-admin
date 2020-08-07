<template>
  <a-select
    mode="multiple"
    label-in-value
    style="width: 100%"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    v-model="mValue"
    @search="fetchUser"
    @change="handleChange">
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="d in data" :key="d.id">
      {{ d.name }}
    </a-select-option>
  </a-select>
</template>
<script>
  import debounce from 'lodash/debounce';

  import {  getOptions } from '@/api/baseData'
  export default {
    props: {
      hash: Number,
      result: Array,
    },
    data() {
      this.lastFetchId = 0;
      this.fetchUser = debounce(this.fetchUser, 10);
      return {
        data: [],
        mValue:this.result,
        fetching: false,
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
    methods: {
      handleChange($event){
        console.log($event)
        // this.$emit('input', $event.target.value)

      },
      fetchUser(value) {
        if (this.init) {
          return;
        }
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.data = [];
        this.fetching = true;
        getOptions(this.hash, value)
          .then(res => {

            if (fetchId !== this.lastFetchId) {
              // for fetch callback order
              return;
            }

            this.data = res.data;
            this.fetching = false;
          })
      },
      handleChange(value) {
        Object.assign(this, {
          value,
          data: [],
          fetching: false,
        });
      },
    },
  };
</script>