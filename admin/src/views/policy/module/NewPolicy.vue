<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-form :layout="'inline'">
        <a-divider orientation="left">
          政策
        </a-divider>
        <a-form-item label="政策ID">
          <a-input/>
        </a-form-item>
        <a-form-item label="政策代码">
          <a-input/>
        </a-form-item>
        <a-divider orientation="left">
          类型
        </a-divider>
        <a-form-item label="是否禁售">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              销售
            </a-radio>
            <a-radio :value="2">
              禁售
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否有效">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              有效
            </a-radio>
            <a-radio :value="2">
              无效
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否共享">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              全部
            </a-radio>
            <a-radio :value="2">
              非共享
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-divider orientation="left">
          航司/平台
        </a-divider>
        <a-form-item label="航 司">
          <a-input/>
        </a-form-item>
        <a-form-item label="适用平台">
          <a-input/>
        </a-form-item>
        <a-form-item label="比价投放">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              是
            </a-radio>
            <a-radio :value="2">
              否
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-divider orientation="left">
          *销售类型
        </a-divider>
        <a-form-item label="价格类型">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              官网直享
            </a-radio>
            <a-radio :value="2">
              经济舱
            </a-radio>
            <a-radio :value="2">
              高经舱
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="票面价规则">
          <a-radio-group name="radioGroup" :default-value="1">
            <a-radio :value="1">
              固定加价
            </a-radio>
            <a-radio :value="2">
              经济舱价格
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="固定加价(比例(小于1)/值)">
          <a-input/>
        </a-form-item>
        <a-divider orientation="left">
          余位/出票时限
        </a-divider>

        <a-form-item label="最大">
          <a-input/>
        </a-form-item>
        <a-form-item label="扣除">
          <a-input/>
        </a-form-item>
        <a-form-item label="最晚">
          <a-input/>
        </a-form-item>
        <a-form-item label="最早">
          <a-input/>
        </a-form-item>
        <a-divider orientation="left">
          *销售有效期
        </a-divider>
        <a-form-item label="有效期">
          <a-range-picker />
        </a-form-item>
        <a-form-item label="比价最高加价">
          <a-input/>
        </a-form-item>
        <a-form-item label="胜出加价时间">
          <a-input addon-after="(分钟)(-1表示不加价)"/>
        </a-form-item>
        <a-divider orientation="left">
          *航班日期
        </a-divider>
        <a-form-item label="生效">
          <a-range-picker />
        </a-form-item>
        <a-form-item label="排除">
          <a-range-picker />
        </a-form-item>
        <a-divider orientation="left">
          适用时间段
        </a-divider>
        <a-form-item label="政策">
          <a-input placeholder="HHMM-HHMM"/>
        </a-form-item>
        <a-form-item label="起飞">
          <a-input placeholder="HHMM-HHMM"/>
        </a-form-item>
        <a-divider orientation="left">
          *班期限制
        </a-divider>
        <a-select mode="tags" placeholder="Tags Mode">
          <a-select-option v-for="i in 7" :key="(i + 9).toString(36) + i">
            {{ i }}
          </a-select-option>
        </a-select>

        <a-form-item label="禁售时间">
          <a-input addon-after="(分钟)"/>
        </a-form-item>

        <a-divider orientation="left">
          *适用航线
        </a-divider>
        <a-divider orientation="left">
          不适用航线
        </a-divider>
        <a-divider orientation="left">
          *航班号
        </a-divider>
        <a-divider orientation="left">
          *舱位
        </a-divider>
        <a-divider orientation="left">
          CPA返点留钱
        </a-divider>
        <a-divider orientation="left">
          价格限制
        </a-divider>
        <a-divider orientation="left">
          API项
        </a-divider>
        <a-divider orientation="left">
          Y舱折扣
        </a-divider>
      </a-form>
    </a-card>
  </page-header-wrapper>

</template>

<script>
  export default {
    name: 'NewPolicy'
  }
</script>

<style scoped>

</style>