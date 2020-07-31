<template>
  <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
  />

</template>

<script>

    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

    export default {
      name: 'Editor',
      components: {
        quillEditor
      },data () {
        return {
          content: '<h2>I am Example</h2>',
          editorOption: {
          }
        }
      },methods: {
      },
      computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
      mounted() {
        console.log('this is current quill instance object', this.editor)
      }
    }
</script>

<style>
  .quill-editor{
    background: #ffffff;
    padding: 16px;
  }
  .ql-container.ql-snow {
    border: none;
  }
  .ql-toolbar.ql-snow{
    border: none;
    border-bottom: 1px solid #e8eaec;
  }
  .ql-toolbar.ql-snow+.ql-container.ql-snow {
    border-top: 0;
    min-height: 400px;
  }
</style>