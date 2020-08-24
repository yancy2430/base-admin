<template>
  <a-select
    :mode="multiple?'multiple':'default'"
    style="width: 100%"
    option-label-prop="title"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="fetchUser"
    @change="handleChange">
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="d in data" :key="d.id" :title="d.name" :value="d.id">
      {{ d.name }}
    </a-select-option>
  </a-select>
</template>
<script>
  import debounce from 'lodash/debounce'

  import { options } from 'phanpy-api/common'
  export default {
    props: {
      hash: Number,
      multiple:Boolean,
      result: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    model: {
      prop: 'result',
      event: 'change'
    },
    created(){
      this.fetchUser("")
    },
    data () {
      this.lastFetchId = 0
      this.fetchUser = debounce(this.fetchUser, 100)
      return {
        data: [],
        fetching: false
      }
    },
    methods: {
      fetchUser (value) {
        if (this.init) {
          return
        }
        this.lastFetchId += 1
        const fetchId = this.lastFetchId
        this.data = []
        this.fetching = true
        console.log(value)
        options(this.hash, value)
          .then(res => {
            if (fetchId !== this.lastFetchId) {
              // for fetch callback order
              return
            }

            this.data = res.data
            this.fetching = false
          })
      },
      handleChange (value) {
        console.log(value)
        this.$emit('change', value)
      }
    }
  }
</script>
