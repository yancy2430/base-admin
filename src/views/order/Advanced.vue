<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-descriptions title="航程信息" size="small" :column="20" layout="vertical">
        <a-descriptions-item span="2" label="订单来源">去哪儿</a-descriptions-item>
        <a-descriptions-item span="2" label="系统订单号">2574669</a-descriptions-item>
        <a-descriptions-item span="3" label="供应订单号">xss200824171853732001</a-descriptions-item>
        <a-descriptions-item span="2" label="非9C政策ID">U舱短期高价</a-descriptions-item>
        <a-descriptions-item span="1" label="政策号">1123</a-descriptions-item>
        <a-descriptions-item span="1" label="航班号">UQ2545</a-descriptions-item>
        <a-descriptions-item span="1" label="舱位">U</a-descriptions-item>
        <a-descriptions-item span="2" label="航程">KHG(喀什)-CGO(郑州)</a-descriptions-item>
        <a-descriptions-item span="3" label="出发时间">2020-09-14 16:20:00</a-descriptions-item>
        <a-descriptions-item span="3" label="到达时间">2020-09-14 22:45:00</a-descriptions-item>
      </a-descriptions>
      <a-divider style="margin-bottom: 32px"/>
      <a-descriptions title="联系人信息" size="small" :column="20" layout="vertical">
        <a-descriptions-item span="2" label="联系人姓名">付小小</a-descriptions-item>
        <a-descriptions-item span="2" label="官网账号">18100000000</a-descriptions-item>
        <a-descriptions-item span="2" label="官网密码">123456</a-descriptions-item>
        <a-descriptions-item span="3" label="联系人手机号码">18758584009</a-descriptions-item>
        <a-descriptions-item span="3" label="联系人邮箱">599571442@qq.com</a-descriptions-item>
        <a-descriptions-item span="2" label="索要行程单">否</a-descriptions-item>
        <a-descriptions-item span="3" label="下单渠道">mobile.app.android</a-descriptions-item>
        <a-descriptions-item span="8" label="舱位备注">mobile.app.android</a-descriptions-item>
      </a-descriptions>
      <a-alert
        message="Very long warning text warning text text text text text text text"
        banner
        closable
        style="margin-bottom: 10px"
      />
      <a-descriptions title="出票操作与乘机人信息" size="small">
      </a-descriptions>
      <a-table :columns="columns" :data-source="data" size="small" />
      <a-divider style="margin-bottom: 32px"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable } from '@/components'

  export default {
    name:"Advanced",
    components: {
      STable
    },
    data () {
      return {
        goodsColumns: [
          {
            title: '商品编号',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '商品条码',
            dataIndex: 'barcode',
            key: 'barcode'
          },
          {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'right'
          },
          {
            title: '数量（件）',
            dataIndex: 'num',
            key: 'num',
            align: 'right'
          },
          {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right'
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadGoodsData: () => {
          return new Promise(resolve => {
            resolve({
              data: [
                {
                  id: '1234561',
                  name: '矿泉水 550ml',
                  barcode: '12421432143214321',
                  price: '2.00',
                  num: '1',
                  amount: '2.00'
                },
                {
                  id: '1234562',
                  name: '凉茶 300ml',
                  barcode: '12421432143214322',
                  price: '3.00',
                  num: '2',
                  amount: '6.00'
                },
                {
                  id: '1234563',
                  name: '好吃的薯片',
                  barcode: '12421432143214323',
                  price: '7.00',
                  num: '4',
                  amount: '28.00'
                },
                {
                  id: '1234564',
                  name: '特别好吃的蛋卷',
                  barcode: '12421432143214324',
                  price: '8.50',
                  num: '3',
                  amount: '25.50'
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
        },

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
            scopedSlots: { customRender: 'status' }
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
      statusFilter (status) {
        const statusMap = {
          'processing': '进行中',
          'success': '完成',
          'failed': '失败'
        }
        return statusMap[status]
      }
    },
    computed: {
      title () {
        return this.$route.meta.title
      }
    }

  }
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
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
</style>
