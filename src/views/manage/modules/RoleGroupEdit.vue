<template>
  <div>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
      <a-form-item label="权限组名">
        <a-input v-model="value.name"/>
      </a-form-item>
      <a-form-item label="权限组说明">
        <a-textarea
          v-model="value.desc"
          placeholder="Controlled autosize"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: 'RoleGroupEdit',
    props: ['value']

  }
</script>

<style scoped>

</style>
