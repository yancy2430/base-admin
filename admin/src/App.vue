<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>

  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import {onConnect} from '@/utils/webSocket'
export default {
  data () {
    return {
    }
  },
  created(){
    // websocket.ope
    onConnect()
    let that = this
    window.onMessageReceived = function (msg) {
      that.$notification.success({
        message: msg.title,
        description: msg.content
      })
    }
  },
  computed: {
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))
      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
