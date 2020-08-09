<template>
  <div style="font-size: 14px; line-height: 22px; margin-bottom: 7px; color: rgba(0, 0, 0, 0.65);"><p
    style="margin: 0px 8px 0px 0px; display: inline-block; color: rgba(0, 0, 0, 0.85);">
    {{title}}
  </p>
    {{content}}
  </div>
</template>

<script>

  export default {
    name: 'DescriptionItem',
    props: {
      title: String,
      content: String
    }
  }
</script>

<style scoped>

</style>