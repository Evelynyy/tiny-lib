<template>
  <transition name="fade">
    <div class="tl-wrap" v-show="visible">
      <div class="mask" @click="handleCancel"></div>
      <div class="tl-transfer">
        <div class="transfer-main">
          <div class="transfer-wrap_left">
            <div class="transfer-goods-list">
              <div class="list-label">选择{{type}}</div>
              <div v-for="goods in gdList" :key="goods.value" class="transfer-item" @click="handleClick" v-show='!goods.unShow'>
                <label class="transfer-item_label">{{ goods[options.label] }}</label>
                <input v-model="goods[options.selected]" type="checkbox" class="checkbox transfer-item_checkBox">
              </div>
            </div>
          </div>
          <div class="transfer-wrap_right">
            <div class="transfer-selected-list">
              <div class="list-label">已选择 {{ rightData.length || 0 }} {{typeUnit}}{{type}}</div>
              <div v-for="(item, index) in rightData" :key="item[options.id]" class="transfer-item transfer-item_selected">
                <label class="transfer-label-selected">{{ item[options.label] }}</label>
                <div class="transfer-remove-btn" @click="handleRemove(item[options.id], index)">
                  <span aria-hidden="true">&times;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <slot name="footer">
          <div class="transfer-footer">
            <button class="btn-transfer btn-confirm" @click="handleConfirm">确定</button>
            <button class="btn-transfer btn-cancel" @click="handleCancel">取消</button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      default () {
        return {
          id: 'ecshopGoodsId',
          label: 'goodsName',
          selected: 'isBelongType'
        }
      }
    },
    // 选择的物品名称
    type: {
      type: String,
      default: ''
    },
    // 选择的物品单位
    typeUnit: {
      type: String,
      default: ''
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 物品列表
    goodsNodeList: {
      type: Array,
      default () {
        return []
      }
    },
    // 确定
    onConfirm: {
      type: Function,
      default () {
        console.warn('need a init confirmHandle Prop!')
      }
    },
    // 取消
    onCancel: {
      type: Function,
      default () {
        console.warn('need a init cancelHandle Prop!')
      }
    }
  },
  data () {
    return {
      gdList: this.goodsNodeList // 商品列表,
    }
  },
  watch: {
    goodsNodeList () {
      // 深拷贝
      this.gdList = JSON.parse(JSON.stringify(this.goodsNodeList))
    }
  },
  computed: {
    // 右侧显示数据
    rightData () {
      const result = []
      this.gdList.forEach(el => {
        if (el[this.options.selected]) {
          result.push(el)
        }
      })
      return result
    }
  },
  methods: {
    /**
     * 确定提交事件
     */
    handleConfirm () {
      this.onConfirm(this.rightData)
    },
    /**
     * 处理选中操作
     */
    handleClick () {
      const list = []
      this.gdList.map(i => {
        if (i[this.options.selected]) {
          list.push({ ...i })
        }
      })
    },
    /**
     * 处理删除商品操作
     * @param { Number } id 商品 id
     * @param { Number } index 当前商品索引值
     */
    handleRemove (id, index) {
      this.gdList.map(i => {
        if (i[this.options.id] === id) {
          i[this.options.selected] = false
        }
      })
    },
    /**
     * 处理关闭穿梭框操作
     */
    handleCancel () {
      this.onCancel(this.tempList)
      this.beforeClose && this.beforeClose()
      this.$emit('update:visible', false)
    },
    /**
     * 更新视图操作
     * @param { Array } list 商品列表
     */
    updateList (list) {
      this.gdList.map(i => {
        const node = list.find(
          item => item[this.options.id] === i[this.options.id]
        )
        i[this.options.selected] = !!node
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tl-wrap {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.4)
  }
  .tl-transfer {
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 540px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.15);
    color: #666666;
    .transfer-main {
      display: flex;
      height: 448px;
      border-bottom: 1px solid #ebebeb;
      .transfer-item {
        padding-top: 10px;
        display: flex;
        height: 40px;
        align-items: center;
        .transfer-item_label {
          margin-right: 8px;
        }
      }
      .list-label {
        font-size: 12px;
      }
      .transfer-wrap_left {
        width: 50%;
        padding: 16px;
        .transfer-item_checkBox {
          cursor: pointer;
        }
      }
      .transfer-wrap_right {
        width: 50%;
        border-left: 1px solid #ebebeb;;
        padding: 16px 18px 0;
        .transfer-item_selected {
          justify-content: space-between;
        }
        .transfer-remove-btn {
          cursor: pointer;
        }
      }
    }
    .transfer-footer {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn-transfer {
        width: 120px;
        height: 36px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover, &:focus, &:active {
          outline: none;
        }
      }
      .btn-cancel {
        border: 1px solid #4285F6;
        color: #666666;
      }
      .btn-confirm {
        background-color: #4285F6;
        color: #ffffff;
      }
    }
  }
}
</style>
