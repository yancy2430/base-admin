<template>
    <quill-editor
            v-if="contentType==='RichText'"
            v-model="content"
            :options="editorOption"
    />
    <vue-simplemde v-else-if="contentType==='Markdown'"
                   v-model="content"
    >
    </vue-simplemde>
</template>

<script>

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {quillEditor} from 'vue-quill-editor'
    import 'simplemde/dist/simplemde.min.css' // 引入文本编辑器样式
    import VueSimplemde from 'vue-simplemde'  // 引入文本编辑器

    export default {
        name: 'Editor',
        components: {
            VueSimplemde,
            quillEditor
        },
        props:['value','contentType'],
        data() {
            const v = this.value
            return {
                content: v,
                editorOption: {}
            }
        },
        created(){
        },
        watch:{
            value(e){
                this.$emit('change', e)
            },
            contentType(e){
            }
        },
        methods: {

        },
        computed: {
        },

    }
</script>

<style>
    .quill-editor {
        background: #ffffff;
        padding: 16px 0px;
    }

    .ql-container.ql-snow {
        border: 1px solid #e8eaec;
    }

    .ql-toolbar.ql-snow {
        border: 1px solid #e8eaec;
    }

    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        min-height: 400px;
        border-top: 1px;
    }

    .ql-editor {
        min-height: 400px;
    }

    .editor-toolbar {
        position: relative;
        opacity: 1;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
        padding: 0 10px;
        border: 1px solid #e8eaec;
        border-bottom: 0px solid #e8eaec;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
    }
    .CodeMirror {
        height: auto;
        min-height: 300px;
        border: 1px solid #e8eaec;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        padding: 10px;
        font: inherit;
        z-index: 1;
    }
    .editor-toolbar:before {
        margin-bottom: 4px;
    }
    .editor-toolbar{
        height: 42px;
    }
    .editor-toolbar a {
        display: inline-block;
        text-align: center;
        text-decoration: none!important;
        color: #444!important;
        width: 30px;
        height: 30px;
        margin: 0;
        border: 1px solid transparent;
        border-radius: 3px;
        cursor: pointer;
    }
    .CodeMirror-fullscreen,
    .editor-preview-side,
    .editor-toolbar.fullscreen {
        z-index: 1111;
    }

    .editor-preview {
        z-index: 1111;
    }
    .vue-simplemde{
        padding: 16px 0px;
    }
    .CodeMirror-scroll {
        min-height: 400px;
    }
    .edit-item-with-help .edit-explain{
        clear: both;
        min-height: 22px;
        margin-top: -2px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        line-height: 1.5;
        transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        color: #f5222d;
    }
    .edit-item-with-help >div {
        background-color: #fff;
        border-color: #f5222d;
    }
</style>
