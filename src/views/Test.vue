<template>
  <div class="row">
    <div class="col-6">
      <h3>Transition</h3>
      <a-menu slot="overlay">
        <draggable
          v-model="list"
          v-bind="dragOptions"
          @change="change"
          @start="drag = true"
          @end="drag = false"
        >
          <a-menu-item  v-for="element in list" :key="element.order">
            <a-checkbox>
              {{element.name}}
            </a-checkbox>
          </a-menu-item>
        </draggable>
      </a-menu>
    </div>
  </div>
</template>

<script>

  const message = [
    "vue.draggable",
    "draggable",
    "component",
    "for",
    "vue.js 2.0",
    "based",
    "on",
    "Sortablejs"
  ];
  export default {
    name: "transition-example-2",
    display: "Transitions",
    order: 7,
    data() {
      return {
        list: message.map((name, index) => {
          return { name, order: index + 1 };
        }),
        drag: false,
        opVisible: false,
        columns:[{"sort":"0","title":"商品ID","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"id"},{"sort":"1","title":"所属店铺","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"storeId"},{"sort":"2","title":"商品分类","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"cateId"},{"sort":"3","title":"店铺分类","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"storeCateId"},{"sort":"4","title":"封面图","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"cover"},{"sort":"5","title":"商品名称","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"goodsName"},{"sort":"6","title":"商品价格","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"goodsPrice"},{"sort":"7","title":"原价","align":"center","width":40,"ellipsis":true,"hidden":true,"dataIndex":"goodsOriginalPrice"},{"sort":"8","title":"商品总数","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"goodsTotal"},{"sort":"9","title":"销售数量","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"salesTotal"},{"sort":"10","title":"销售规则","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"specs"},{"sort":"11","title":"创建时间","align":"center","width":160,"ellipsis":true,"hidden":true,"dataIndex":"createTime"},{"sort":"12","title":"更新时间","align":"center","width":180,"ellipsis":true,"hidden":true,"dataIndex":"updateTime"},{"sort":"13","title":"是否删除","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"deleted"},{"sort":"14","title":"操作人","align":"center","width":60,"ellipsis":true,"hidden":true,"dataIndex":"operator"},{"sort":"15","title":"商品状态","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"status"},{"sort":"16","title":"是否包邮","align":"center","width":80,"ellipsis":true,"hidden":true,"dataIndex":"freeMail"},{"sort":"17","title":"运费","align":"center","width":40,"ellipsis":true,"hidden":true,"dataIndex":"freight"},{"sort":18,"title":"操作","key":"operation","align":"center","fixed":"right","hidden":true,"width":160,"scopedSlots":{"customRender":"action"}}]
      };
    },
    methods: {
      sort() {
        this.list = this.list.sort((a, b) => a.order - b.order);
      },
      change(){
        console.log(this.list)

      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    }
  };
</script>

<style>
  .button {
    margin-top: 35px;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
</style>