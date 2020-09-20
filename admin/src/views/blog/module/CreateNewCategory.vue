<template>
    <a-modal
            :visible="visible"
            title='添加分类'
            okText='添加'
            @cancel="() => { $emit('cancel') }"
            @ok="() => { $emit('create') }"
    >
        <a-form layout='vertical' :form="form">
            <a-form-item label='ID' style="display: none">
                <a-input v-decorator="['id']"/>
            </a-form-item>
            <a-form-item label='分类名称'>
                <a-input
                        v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '分类名称不能为空' }],
              }
            ]"
                />
            </a-form-item>
            <a-form-item label='分类关键词'>
                <a-input
                        placeholder="分类关键词 用,分割"
                        v-decorator="['keywords']"
                />
            </a-form-item>
            <a-form-item label='分类描述'>
                <a-input

                        type='textarea'
                        v-decorator="['description']"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
  export default {
    name: "CreateNewCategory",
    props: ['visible'],
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'form_in_modal' });
    },
    methods:{
    }

  }
</script>

<style scoped>

</style>
