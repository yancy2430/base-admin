<template>
  <a-checkbox v-model="data" @change="onChange">
    {{ title }}
  </a-checkbox>
</template>

<script>
  export default {
    name: 'RoleCheckbox',
    props: ['value', 'title'],
    data () {
      return {
        data: Boolean('' + this.value)
      }
    },
    methods: {
      onChange (e) {
        this.$emit('value', e.target.checked)
        this.$emit('change', e.target.checked)
      }
    }
  }
</script>

<style scoped>

</style>
