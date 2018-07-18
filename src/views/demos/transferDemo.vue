<template>
  <div class="wrap-transfer_demo">
    <button class="btn-select" @click="isShowTransfer = true">选择商品</button>
    <div class="show-selected-items" v-if="selectedList && selectedList.length > 0">
      <p>选中的商品有：</p>
      <div v-for="item in selectedList" :key="item.id">{{ item.goodsName }}</div>
    </div>
    <transfer-demo
      :visible.sync="isShowTransfer"
      :goodsNodeList="goodsList"
      :options="{id: 'goodsId', label: 'goodsName', selected: 'isSelected'}"
      type="商品"
      typeUnit="件"
      :onConfirm="handleConfirm"
      :onCancel="handleCancel">
    </transfer-demo>
  </div>
</template>
<script>
import transferDemo from '@/components/transfer/index.vue'
export default {
  data () {
    return {
      isShowTransfer: false,
      selectedList: [],
      goodsList: []
    }
  },
  components: {
    transferDemo
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      const mockData = {
        'code': 1,
        'data': {
          'list': [
            {
              goodsId: 0,
              goodsName: '商品一',
              selected: false
            },
            {
              goodsId: 1,
              goodsName: '商品二',
              selected: false
            }
          ]
        },
        'msg': '成功'
      }
      this.goodsList = mockData.data.list
    },
    handleConfirm (selectedItems) {
      this.selectedList = selectedItems
      this.isShowTransfer = false
    },
    handleCancel () {
      this.isShowTransfer = false
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap-transfer_demo {
  .btn-select {
    width: 120px;
    height: 36px;
    border: none;
    background-color: #4285F6;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    &:hover, &:focus, &:active {
      outline: none;
    }
  }
}
</style>
