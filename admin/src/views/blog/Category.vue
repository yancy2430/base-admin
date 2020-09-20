<template>
    <page-header-wrapper>
        <base-table module="blogCategory" ref="table">
            <template slot="leftHeaderBtn">
                <a-button type="primary" icon="plus"  @click="showModal" >添加分类</a-button>
            </template>
            <template slot="tableOperationBtn" slot-scope="record">
                <a @click="updateCategory(record.data)">编辑</a>
                <a-divider type="vertical"/>
                <a-popconfirm
                        title="是否删除这篇文章?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="deleteCategory(record.data.id)"
                >
                    <a>删除</a>
                </a-popconfirm>
            </template>
        </base-table>
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
  import BaseTable from "../../base/BaseTable";
  import CreateNewCategory from './module/CreateNewCategory'
  import { addCategory, updateCategory,removeCategory } from 'tdeado-api/blogmanage'

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
