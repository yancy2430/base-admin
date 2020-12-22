<template>
    <page-header-wrapper>
        <td-table url="blog/category">
            <a-button type="primary">
                添加管理员
            </a-button>
        </td-table>
        <create-new-category
                ref="createNewCategory"
                :visible="visible"
                @cancel="handleCancel"
                @create="handleCreate"
        >
        </create-new-category>
    </page-header-wrapper>
</template>

<script>
  import CreateNewCategory from './module/CreateNewCategory'
  import TdTable from '../../base/TdTable'

  export default {
    name: "Category",
    components: {
      TdTable,
      CreateNewCategory,
    },
    data () {
      return {
        visible: false,
      };
    },
    methods: {
      showModal () {
        const form = this.$refs.createNewCategory.form;
        form.resetFields();
        this.visible = true;
      },
      handleCancel () {
        this.visible = false;
      },
      handleCreate () {
        const form = this.$refs.createNewCategory.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('Received values of form: ', values);
          if (values.id){
            updateCategory(values).then(res=>{
              this.$refs.table.refresh()
            })
          } else {
            addCategory(values).then(res=>{
              this.$refs.table.refresh()
            })
          }
          form.resetFields();
          this.visible = false;
        });
      },
      updateCategory(data){
        this.visible = true;
        const form = this.$refs.createNewCategory.form;
        this.$nextTick(() => {
          form.setFieldsValue({
            id:data.id,
            name:data.name,
            keywords:data.keywords,
            description:data.description,
          })});
      },
      deleteCategory(id){
        removeCategory(id).then(res=>{
          this.$refs.table.refresh()
        })
      }
    }
  }
</script>

<style scoped>

</style>
