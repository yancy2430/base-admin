<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="航程信息/联系人信息" size="small" :column="20" layout="vertical">
      </a-descriptions>
      <a-table :data-source="voyage" size="small" :pagination="false" rowKey="key">
        <a-table-column key="source" title="订单来源" data-index="source"/>
        <a-table-column key="id" title="系统订单号" data-index="sysOrderNo"/>
        <a-table-column key="platformId" title="供应订单号" data-index="supplyOrderNo"/>
        <a-table-column key="a1" title="非9C政策ID" data-index="policyId"/>
        <a-table-column key="a2" title="政策号" data-index="policyNo"/>
        <a-table-column key="a3" title="航班号" data-index="flightNo"/>
        <a-table-column key="a4" title="舱位" data-index="cabin"/>
        <a-table-column key="a5" title="航程" data-index="voyage"/>
        <a-table-column key="a6" title="出发时间" data-index="dptTime"/>
        <a-table-column key="a7" title="到达时间" data-index="arrTime"/>
      </a-table>
      <a-descriptions title="联系人信息" size="small" :column="20" layout="vertical" style="margin-top: 10px;">
      </a-descriptions>
      <a-table :data-source="pass" size="small" :pagination="false" rowKey="key">
        <a-table-column key="name" title="联系人姓名" align="center" data-index="name"/>
        <a-table-column key="account" title="官网账号" align="center" data-index="account"/>
        <a-table-column key="password" title="官网密码" align="center" data-index="password"/>
        <a-table-column key="phone" title="联系人手机号码" align="center" data-index="phone"/>
        <a-table-column key="email" title="联系人邮箱" align="center" data-index="email"/>
        <a-table-column key="itinerary" title="索要行程单" align="center" data-index="itinerary"/>
        <a-table-column key="channel" title="下单渠道" align="center" data-index="channel"/>
        <a-table-column key="remarks" title="舱位备注" align="center" data-index="remarks"/>
      </a-table>
      <a-descriptions title="出票操作与乘机人信息" size="small" style="margin-top: 10px;">
      </a-descriptions>
      <a-alert
        message="This is a message"
        banner
        closable
        style="margin-bottom: 10px"
      />
      <a-table :columns="goodsColumns" :data-source="data" size="small" :pagination="false" rowKey="key"/>

      <div style="margin-top: 10px;margin-bottom: 10px;">
        <a-form layout="inline">
          <a-form-item label="RT获取票号">
            <a-select default-value="lucy" style="width: 100px">
              <a-select-option value="jack">
                CSX107
              </a-select-option>
              <a-select-option value="lucy">
                CSX513
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="小编码">
            <a-input-search style="width: 150px">
              <a-button slot="enterButton">
                PNR
              </a-button>
            </a-input-search>
          </a-form-item>
          <a-form-item label="大编码">
            <a-input-search style="width: 150px">
              <a-button slot="enterButton">
                取大编
              </a-button>
            </a-input-search>
          </a-form-item>
          <a-form-item label="新小编码">
            <a-input-search style="width: 150px">
              <a-button slot="enterButton">
                PNR
              </a-button>
            </a-input-search>
          </a-form-item>
          <a-form-item label="新大编码">
            <a-input-search style="width: 150px">
              <a-button slot="enterButton">
                保存
              </a-button>
            </a-input-search>
          </a-form-item>
          <a-form-item>
            <a-button>换编码</a-button>
            <a-button>换编码文本</a-button>
            <a-button>换共享航班</a-button>
            <a-button>黑屏抢票</a-button>
          </a-form-item>
        </a-form>
        <a-form style="margin-top: 10px" layout="inline">
          <a-form-item label="B2B账户">
            <a-select default-value="lucy" style="width: 100px">
              <a-select-option value="jack">
                CSX107
              </a-select-option>
              <a-select-option value="lucy">
                CSX513
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-button>重获B2B政策(易宝)</a-button>
            <a-button>重获B2B政策(易生)</a-button>
            <a-button>易宝CZ</a-button>
            <a-button>取消入库(易生)</a-button>
          </a-form-item>
          <a-form-item label="BSP出票账户">
            <a-select default-value="lucy" style="width: 120px;margin-right: 10px;">
              <a-select-option value="jack">
                CSX107
              </a-select-option>
              <a-select-option value="lucy">
                CSX513
              </a-select-option>
            </a-select>
            <a-button>BSP价格查询</a-button>
          </a-form-item>

          <a-form-item label="BOP出票账户">
            <a-select default-value="lucy" style="width: 120px;margin-right: 10px;">
              <a-select-option value="jack">
                CSX107
              </a-select-option>
              <a-select-option value="lucy">
                CSX513
              </a-select-option>
            </a-select>
            <a-button>BOP出票</a-button>
          </a-form-item>


        </a-form>
      </div>
      <a-table :rowSelection="{type:'radio'}" :columns="[
  {
    title: '选择',
    dataIndex: 'name',
  },
  {
    title: '票面价',
    dataIndex: 'age',
  },
  {
    title: '税费',
    dataIndex: 'taxes',
  },
  {
    title: '返点',
    dataIndex: 'rebate',
  },
  {
    title: '代理费',
    dataIndex: 'agency',
  },
  {
    title: '采购金额',
    dataIndex: 'amount',
  },
  {
    title: '收款金额',
    dataIndex: 'received',
  },
  {
    title: '利润',
    dataIndex: 'profit',
  },
]" :data-source="[
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: '21',
    taxes:'1.0',
    rebate:'1.0',
    agency:'10.0',
    amount:'492.0',
    received:'494.0',
    profit:'20.0'
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: '11',
    taxes:'1.0',
    rebate:'1.0',
    agency:'10.0',
    amount:'492.0',
    received:'494.0',
    profit:'20.0'
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: '33',
    taxes:'1.0',
    rebate:'1.0',
    agency:'10.0',
    amount:'492.0',
    received:'494.0',
    profit:'20.0'
  },
]" size="small" :pagination="false" rowKey="key"/>
      <div style="text-align: left;">
        <a-button class="op-btn">汇付</a-button>
        <a-button class="op-btn">易商旅</a-button>
        <a-button class="op-btn">厦航虚拟</a-button>
        <a-button class="op-btn">支付宝</a-button>
        <a-button class="op-btn">山航虚拟</a-button>
        <a-button class="op-btn">易宝</a-button>
        <a-button class="op-btn">易生</a-button>
        <a-button class="op-btn">深航预存</a-button>
        <a-button class="op-btn">储蓄卡</a-button>
        <a-button class="op-btn">奥游卡107</a-button>
        <a-button class="op-btn">票速通</a-button>
        <a-button class="op-btn">奥游513</a-button>
        <a-button class="op-btn">东海预存</a-button>
        <a-button class="op-btn">川航预存</a-button>
      </div>
      <a-divider/>
      <a-form layout="inline">
        <a-form-item label="出票类型">
          <a-cascader style="width: 300px" :options="[
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]" :show-search="{ filter }" placeholder="Please select"/>
        </a-form-item>
        <a-form-item label="点数/采购金额">
          <a-input style="width: 120px" placeholder="" v-model="amount"/>
        </a-form-item>
        <a-form-item label="支付流水号">
          <a-input style="width: 120px" placeholder=""/>
        </a-form-item>
        <a-form-item label="订单备注">
          <a-input style="width: 500px" placeholder=""/>
        </a-form-item>
      </a-form>
      <a-divider/>
      <div style="text-align: right;">
        <a-button class="op-btn" @click="isShowLogs = true">查看日志</a-button>
        <a-button class="op-btn">拒绝出票</a-button>
        <a-button class="op-btn">审核订单</a-button>
        <a-button class="op-btn">改航班号/仓位</a-button>
        <a-button class="op-btn">订单转锁</a-button>
        <a-button class="op-btn">解锁并返回</a-button>
        <a-button class="op-btn">强制回填</a-button>
        <a-button class="op-btn">异常</a-button>
        <a-button class="op-btn">保存支付时间</a-button>
        <a-button class="op-btn">返回</a-button>
        <a-button class="op-btn" type="primary">保存并返回</a-button>
      </div>
    </a-card>
    <a-drawer
      title="订单日志"
      placement="right"
      :closable="false"
      :visible="isShowLogs"
      :width="500"
      @close="isShowLogs = false"
    >
      <a-timeline>
        <a-timeline-item>创建服务现场 2015-09-01</a-timeline-item>
        <a-timeline-item>初步排除网络异常 2015-09-01</a-timeline-item>
        <a-timeline-item>技术测试异常 2015-09-01</a-timeline-item>
        <a-timeline-item>网络异常正在修复 2015-09-01</a-timeline-item>
      </a-timeline>
    </a-drawer>
  </page-header-wrapper>
</template>

<script>
import {STable} from '@/components'

export default {
  name: "Advanced",
  components: {
    STable
  },

  data() {
    return {
      isShowLogs: false,
      amount: '494.0',
      ticketingType: [
        "官网"
      ],
      goodsColumns: [
        {
          title: '姓名',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '乘客类型',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '证件号',
          dataIndex: 'barcode',
          key: 'barcode'
        },
        {
          title: '出生日期',
          dataIndex: 'birthday',
          key: 'price',
          align: 'right'
        },
        {
          title: '票号',
          dataIndex: 'num',
          key: 'num',
          align: 'right'
        },
        {
          title: '票面价',
          dataIndex: 'amount',
          key: 'amount',
          align: 'right'
        },
        {
          title: '机建/燃油',
          dataIndex: 'amount2',
          key: 'amount2',
          align: 'right'
        },
        {
          title: '收款金额',
          dataIndex: 'amount3',
          key: 'amount3',
          align: 'right'
        }
      ],
      data: [
        {
          id: '郑振',
          name: '成人 13716012732',
          barcode: '412724198601120934',
          birthday: '1986-01-12',
          price: '442',
          num: '847-2496371962',
          amount: '492.00'
        }
      ],
      pass: [
        {
          name: '杨大为',
          account: '18224026259',
          password: 'wsk123456',
          phone: '13629594103',
          email: '839975467@qq.com',
          itinerary: "否",
          channel: 'mobile.app.android',
          remarks: '',
        }
      ],
      voyage: [
        {
          source: "去哪儿",
          sysOrderNo: "2584117",
          supplyOrderNo: "xss200826111941677001",
          policyId: "10 \r\n U舱延误高价",
          policyNo: "",
          flightNo: "PN6326",
          cabin: "U",
          voyage: "SWA(揭阳(潮汕))-CGO(郑州)",
          dptTime: "2020-08-27 14:20:00",
          arrTime: "2020-08-27 17:20:00"
        }
      ],
      scheduleColumns: [
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time'
        },
        {
          title: '当前进度',
          dataIndex: 'rate',
          key: 'rate'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: {customRender: 'status'}
        },
        {
          title: '操作员ID',
          dataIndex: 'operator',
          key: 'operator'
        },
        {
          title: '耗时',
          dataIndex: 'cost',
          key: 'cost'
        }
      ],
      loadScheduleData: () => {
        return new Promise(resolve => {
          resolve({
            data: [
              {
                key: '1',
                time: '2017-10-01 14:10',
                rate: '联系客户',
                status: 'processing',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '2',
                time: '2017-10-01 14:05',
                rate: '取货员出发',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '1h'
              },
              {
                key: '3',
                time: '2017-10-01 13:05',
                rate: '取货员接单',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '4',
                time: '2017-10-01 13:00',
                rate: '申请审批通过',
                status: 'success',
                operator: '系统',
                cost: '1h'
              },
              {
                key: '5',
                time: '2017-10-01 12:00',
                rate: '发起退货申请',
                status: 'success',
                operator: '用户',
                cost: '5mins'
              }
            ],
            pageSize: 10,
            pageNo: 1,
            totalPage: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        'processing': '进行中',
        'success': '完成',
        'failed': '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title() {
      return this.$route.meta.title
    }
  }

}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, .85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}

.ant-descriptions-item-label {
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
  font-size: 13px;
  line-height: 1.5;
}

.ant-descriptions-item-content {
  display: table-cell;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  line-height: 1.5;
}

.ant-descriptions-title {
  margin-bottom: 0px;
  font-size: 14px;
}

.ant-btn {
  margin-right: 8px;
}

.op-btn {
  margin-top: 8px;
}
</style>
