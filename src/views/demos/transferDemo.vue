<template>
  <div class="wrap-transfer_demo">
    <transfer-demo :visible="true" :goodsNodeList="goodsList" :options="{id: 'goodsId', label: 'goodsName', selected: 'isSelected'}"></transfer-demo>
  </div>
</template>
<script>
import transferDemo from '@/components/transfer/index.vue'
export default {
  data () {
    return {
      goodsList: [
        {
          goodsId: 0,
          goodsName: '商品一',
          selected: false
        }
      ]
    }
  },
  components: {
    transferDemo
  }
}
</script>
