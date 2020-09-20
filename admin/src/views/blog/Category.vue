<template>
    <page-header-wrapper>
        <base-table module="blogCategory">
            <template slot="leftHeaderBtn">
                <a-button type="primary" icon="plus"  @click="showModal" >发布文章</a-button>
            </template>
        </base-table>
        <create-new-category :visible="visible"
                             @cancel="handleCancel"
                             @create="handleCreate"
        >
        </create-new-category>
    </page-header-wrapper>
</template>

<script>
  import BaseTable from "../../base/BaseTable";
  import CreateNewCategory from './module/CreateNewCategory'

  export default {
    name: "Category",
    components: {
      CreateNewCategory,
      BaseTable
    },
    data () {
      return {
        visible: false,
      };
    },
    methods: {
      showModal () {
        this.visible = true;
      },
      handleCancel () {
        this.visible = false;
      },
      handleCreate () {
        const form = this.$refs.collectionForm.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('Received values of form: ', values);
          form.resetFields();
          this.visible = false;
        });
      },
    }
  }
</script>

<style scoped>

</style>
