<template>
    <page-header-wrapper>
        <a-card :bordered="false">
            <a-form :layout="'horizontal'" :form="form" @submit="submit">
                <a-form-item>
                    <a-input style="width: 50%" placeholder="请输入文章标题"
                             v-decorator="['title',{ rules: [{ required: true, message: '文章分类、标题不能为空' }] },]"
                    >
                        <a-select slot="addonBefore" placeholder="选择分类" style="width: 120px"
                                  v-decorator="['categoryId',{ rules: [{ required: true, message: '文章分类、标题不能为空' }] },]"
                        >
                            <a-select-option v-for="item in categorys" :value="item.id" :key="item.id">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-textarea v-decorator="['summary',{ rules: [{ required: true, message: '文章摘要不能为空' }] },]" placeholder="请输入文章摘要" :rows="3"/>
                </a-form-item>
                <a-form-item prefixCls="edit">
                    <!--<mavon-editor-->
                            <!--v-decorator="['content',{ rules: [{ required: true, message: '文章内容不能为空' }] },]"-->
                    <!--&gt;-->
                    <!--</mavon-editor>-->
                    <mavon-editor style="box-shadow: none;border: 1px solid #d9d9d9;
    border-radius: 2px;" v-decorator="['content',{ rules: [{ required: true, message: '文章内容不能为空' }] },]" />
                </a-form-item>
                <footer-toolbar :siderWidth="180" :collapsed="true">
                    <a-button :loading="false" style="margin-right: 16px">取消发布</a-button>
                    <a-button type="primary" :loading="submitLoading" html-type="submit">保存文章</a-button>
                </footer-toolbar>
            </a-form>
        </a-card>
    </page-header-wrapper>
</template>

<script>
    import {FooterToolbar} from '@/components'
    import {categorys,addArticle,articleOne} from "tdeado-api/blogmanage"
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import mavonEditor from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "articleRelease",
        components: {
            AFormItem,
            FooterToolbar,
          'mavon-editor': mavonEditor.mavonEditor
        },
        data() {
            return {
                submitLoading:false,
                contentType: "RichText",
                categorys: [],
                form: this.$form.createForm(this, {name: 'dynamic_rule'}),
            };
        },
        created() {
            categorys().then(res => {
                this.categorys = res.data
            });
            this.id = this.$route.params.id
            if (this.id) {
                this.$multiTab.rename("/blog/articleRelease/"+this.id,"");
                articleOne(this.id).then(res => {
                    this.$multiTab.rename("/blog/articleRelease/"+this.id,res.data.title);
                    // this.$route.meta.customTitle = res.data.title
                    // console.log(this.$route.meta.customTitle)
                  console.log(res.data)
                    this.form.setFieldsValue(res.data)
                });
            }else {
                this.$multiTab.rename("/blog/articleRelease","发布文章");
            }

        },
        computed: {},
        methods: {
            submit(e) {
                e.preventDefault();
                this.submitLoading = true
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        addArticle(values).then(res=>{
                            this.submitLoading = false
                            this.$message.success('发布成功',0.5).then(res=>{
                                // this.$router.push({ path: '/blog/articleList' })
                                this.$multiTab.closeCurrentPage();
                            });
                        })
                    }else {
                        this.submitLoading = false
                    }
                });
            },
            onContentType(e) {
                this.contentType = e.target.value
            },
            onChange(e){
                console.log(e)
            }
        },
    }
</script>

<style scoped>
    .v-note-wrapper{
        z-index: 1;}
    .v-note-wrapper.fullscreen{
        z-index: 999;
    }
</style>
