<template>
    <page-header-wrapper>
        <base-table module="blogArticle" ref="table">
            <template slot="leftHeaderBtn">
                <router-link  to="/blog/articleRelease"><a-button type="primary" icon="plus" >发布文章</a-button></router-link>
            </template>
            <template slot="tableOperationBtn" slot-scope="record">

                <router-link  :to="{name:'blogarticleRelease',params: {id: record.data.id}}">编辑</router-link>
                <a-divider type="vertical"/>
                <a-popconfirm
                        title="是否删除这篇文章?"
                        ok-text="是"
                        cancel-text="否"
                        @confirm="deleteArticle(record.data.id)"
                >
                    <a>删除</a>
                </a-popconfirm>
            </template>
        </base-table>
    </page-header-wrapper>
</template>

<script>
    import BaseTable from "../../base/BaseTable";
    import {removeArticle} from "tdeado-api/blogmanage";
    export default {
        name: "articleList",
        components: {BaseTable},
        methods:{
            deleteArticle(id){
                removeArticle(id).then(res=>{
                    this.$refs.table.refresh()
                })
            }
        }
    }
</script>

<style scoped>

</style>
