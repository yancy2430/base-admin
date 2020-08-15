<template>
      <div>
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="Tab 1">
            <a-form-item label="拥有权限">
              <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                <a-col :xl="4" :lg="24">
                  {{ permission.name }}：
                </a-col>
                <a-col :xl="20" :lg="24">
                  <a-checkbox
                    v-if="permission.actionsOptions.length > 0"
                    :indeterminate="permission.indeterminate"
                    :checked="permission.checkedAll"
                    @change="onChangeCheckAll($event, permission)">
                    全选
                  </a-checkbox>
                  <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Tab 2">
            Content of Tab Pane 2
          </a-tab-pane>
          <a-tab-pane key="3" tab="Tab 3">
            Content of Tab Pane 3
          </a-tab-pane>
        </a-tabs>
      </div>
</template>

<script>
  export default {
    name: 'RoleEdit'
  }
</script>

<style scoped>

</style>