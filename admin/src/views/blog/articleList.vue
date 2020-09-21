<template>
    <page-header-wrapper>

        <div class="page-header-index-wide">
            <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
                <div class="account-settings-info-main" >
                    <div class="account-settings-info-left">
                        <div style="color: #1890ff;text-align: center;">
                            <a-button type="link" icon="plus"  @click="showModal" style="font-size: 14px" >添加分类</a-button></div>
                        <a-menu
                                :style="{ border: '0'}"
                                type="inner"
                                :selectedKeys="cateSelectedKeys"
                                @click="onOpenChange">
                            <a-menu-item v-for="item in categorys" :key="item.id">
                                {{item.name}}
                            </a-menu-item>
                        </a-menu>
                    </div>
                    <div class="account-settings-info-article">
                        <div style="color: #1890ff;text-align: center;">
                        <a-button type="link" icon="plus" style="font-size: 14px" >添加文章</a-button></div>
                        <a-menu
                                :style="{ border: '0'}"
                                :selectedKeys="selectedKeys"
                                @click="selectArticle"
                                type="inner"
                        >
                            <a-menu-item v-for="item in articleList.records" :key="item.id">
                                {{item.title}}
                            </a-menu-item>
                        </a-menu>
                    </div>
                    <div class="account-settings-info-right">
                        <div class="account-settings-info-title">
                            <a-input class="article-title" v-model="article.title" size="large" placeholder="large size"/>
                        </div>
                        <mavon-editor v-model="article.content" style="box-shadow: none;" />
                    </div>
                </div>
            </a-card>
        </div>
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
  import { articleList, articleOne, categorys } from 'tdeado-api/blogmanage'
  import CreateNewCategory from './module/CreateNewCategory'
  import { addCategory, updateCategory,removeCategory } from 'tdeado-api/blogmanage'

  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "articleList",
    components: {
      CreateNewCategory,
      'mavon-editor': mavonEditor.mavonEditor
    },
    data(){
      return {
        categorys:[],
        openKeys: [],
        articleList:[],
        article:{},
        visible: false,
        cateSelectedKeys: [],
        selectedKeys:[]
      }
    },
    created () {
        this.getCategorys()
    },
    watch:{
      categorys(v){
        this.cateSelectedKeys=[this.categorys[0].id]
        this.onOpenChange({key:this.categorys[0].id})
      },
      articleList(v){
        if (v.records.length>0){
          this.selectedKeys=[v.records[0].id]
          this.article=v.records[0]
        }
      },
      article(e){
        this.selectedKeys=[e.id]
      }
    },
    methods: {
      getCategorys(){
        categorys().then(res=>{
          this.categorys = res.data
        })
      }
      ,
      onOpenChange (openKeys) {
        articleList(1,10,openKeys.key).then(res=>{
            this.articleList = res.data
        })
      },
      selectArticle(e){
        articleOne(e.key).then(res=>{
          this.article = res.data
        })
      },
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
              this.getCategorys()
            })
          } else {
            addCategory(values).then(res=>{
              this.getCategorys()
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
          this.getCategorys()
        })
      }
    },
  }
</script>

<style lang="less" scoped>
    .account-settings-info-main {
        width: 100%;
        display: flex;
        height: 100%;
        overflow: auto;

        &.mobile {
            display: block;

            .account-settings-info-left {
                border-right: unset;
                border-bottom: 1px solid #e8e8e8;
                width: 100%;
                height: 50px;
                overflow-x: auto;
                overflow-y: scroll;
            }

            .account-settings-info-right {
                padding: 20px 40px;
            }
        }

        .account-settings-info-left {
            border-right: 1px solid #e8e8e8;
            width: 160px;
        }
        .account-settings-info-article {
            border-right: 1px solid #e8e8e8;
            width: 260px;
        }

        .account-settings-info-right {
            flex: 1 1;
            padding: 8px 0px;

            .account-settings-info-title {
                color: rgba(0, 0, 0, .85);
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                margin-bottom: 0px;
                border-bottom: 1px solid #f2f6fc;
            }

            .account-settings-info-view {
                padding-top: 12px;
            }
        }
    }
    .ant-input {
        height: 45px;
        padding: 4px 16px;
        border: 0;
    }
    .ant-input:focus {
        border-color: #40a9ff;
        border-right-width: 0px !important;
        outline: 0;
        box-shadow: 0 0 0 0px rgba(24, 144, 255, 0.2);
    }
    .article-title{
        font-size: 24px;
        font-weight: 500;
    }
    .v-note-wrapper{
        z-index: 1;
    }
</style>
