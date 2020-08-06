<template>
  <a-select
    mode="multiple"
    label-in-value
    :value="value"
    placeholder="Select users"
    style="width: 100%"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="fetchUser"
    @change="handleChange"
  >
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
      init:Boolean
    },
    data() {
      this.lastFetchId = 0;
      this.fetchUser = debounce(this.fetchUser, 10);
      return {
        data: [],
        value: [],
        fetching: false,
      };
    },
    methods: {
      fetchUser(value) {
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
            console.log(this.data)
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