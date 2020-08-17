<template>
  <div>
    <a-select
      v-if="data.length>5"
      mode="multiple"
      v-model="mValue">
      <a-select-option v-for="d in data" :key="d.id" :value="d.id">
        {{ d.name }}
      </a-select-option>
    </a-select>
    <a-checkbox-group v-else v-model="mValue">
      <a-checkbox :value="d.id" v-for="d in data" :key="d.id" >
        {{ d.name }}
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>
<script>
  import { getEnums } from '@/api/baseData'
  export default {
    name: 'SSelect',
    props: {
      hash: Number,
      result: Array
    },
data () {
      return {
        data: [],
        value: [],
        mValue: this.result
      }
    },
    watch: {
      value (val) {
        this.mValue = val
      },
      mValue (val) {
        let v = []
        if (this.data.length > 5) {
          for (let i = 0; i < val.length; i++) {
            v.push(val[i].key)
          }
        } else {
          v = val
        }
        this.$emit('input', v)
      }
    },
    created () {
      getEnums(this.hash)
        .then(res => {
          this.data = res.data
        })
    }

  }
</script>

<style scoped>

</style>
