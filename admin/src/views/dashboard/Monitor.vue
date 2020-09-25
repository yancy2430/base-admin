<template>
    <page-header-wrapper>
        <a-row>
            <a-col :span="24">
                <div style="height: 300px;background: #ffffff" ref="water_temperature"></div>
            </a-col>
            <!--<a-col :span="12">-->
                <!--<div style="height: 300px;background: #ffffff" ref="water_level"></div>-->
            <!--</a-col>-->
        </a-row>
    </page-header-wrapper>
</template>

<script>
  import { Line } from '@antv/g2plot';
  import request from '../../utils/request'


  export default {
    name: 'Monitor',
    created (){
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        this.show();
      })
    },

    methods:{
      show(){
        request({
          url: 'http://127.0.0.1/tank/monitor/temp',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }).then(res=>{
            const data = res.data;
            const linePlot = new Line(this.$refs.water_temperature, {
            title: {
              visible: true,
              text: '水温趋势',
            },
            description: {
              visible: true,
              text: '缸内每分钟的温度情况。',
            },
            data:data.airTemp,
            xField: 'localTime',
            color: ['#1979C9'],
            yField: 'value',
            seriesField: 'type',
            smooth: true,
          });
          linePlot.render();


        })

      }
    }
  }
</script>

<style scoped>

</style>
