<template>
  <transition name="fade">
    <!-- <div class="mask"></div> -->
    <div class="tl-transfer">
      <div class="transfer-main" v-show="visible">
        <div class="transfer-wrap_left">
          <!-- <div class="dt-search">
            <input v-model="keyWords" type="text" class="dd-input input-search" :placeholder="`搜索${type}名称/${type}首字母`">
            <img class="search-icon" src="//static.dingdandao.com/vipSearch.png">
          </div> -->
          <div class="transfer-goods-list">
            <div class="list-label">选择{{type}}</div>
            <div v-for="goods in gdList" :key="goods.value" class="transfer-item" @click="handleClick" v-show='!goods.unShow'>
              <!-- <div> -->
                <!-- <label v-if="goods.subTypeName !== undefined" class="transfer-label category">{{ goods.subTypeName }}</label> -->
              <label class="transfer-item_label">{{ goods[options.label] }}</label>
              <!-- </div> -->
              <input v-model="goods[options.selected]" type="checkbox" class="checkbox transfer-item_checkBox">
            </div>
          </div>
        </div>
        <div class="transfer-wrap_right">
          <div class="transfer-selected-list">
            <div class="list-label">已选择{{ categoryName }} {{ rightData.length || 0 }} {{typeUnit}}{{type}}</div>
            <div v-for="(item, index) in rightData" :key="item[options.id]" class="transfer-item transfer-item_selected">
              <!-- <div> -->
                <!-- <label v-if="item.subTypeName !== undefined" class="transfer_label_selected category">{{ item.subTypeName }}</label> -->
              <label class="transfer-label-selected">{{ item[options.label] }}</label>
              <!-- </div> -->
              <div class="transfer-remove-btn" @click="handleRemove(item[options.id], index)">
                <span aria-hidden="true">&times;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot name="footer">
        <div class="transfer-footer">
          <button class="btn-transfer btn-cancel" @click="handleCancel">取消</button>
          <button class="btn-transfer btn-confirm" @click="handleConfirm">确定</button>
        </div>
      </slot>
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
    type: {
      type: String,
      default: '商品' // 根据type显示类型文字 1：商品 2：房间
    },
    // 是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 商品分类名称
    categoryName: {
      type: String,
      default: ''
    },
    // 商品列表
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
      keyWords: '', // 搜索关键字
      gdList: this.goodsNodeList, // 商品列表,
      tempList: this.goodsNodeList
    }
  },
  // 遮罩
  // mixins: [popup],
  watch: {
    goodsNodeList () {
      // 深拷贝
      this.gdList = JSON.parse(JSON.stringify(this.goodsNodeList))
      this.tempList = JSON.parse(JSON.stringify(this.goodsNodeList))
      this.initList()
    },
    keyWords () {
      this.search()
    },
    visible () {
      this.keyWords = ''
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
    },
    typeUnit () {
      let str
      switch (this.type) {
        case '商品':
          str = '件'
          break
        case '房间':
          str = '间'
      }
      return str
    }
  },
  methods: {
    /**
     * 初始化
     */
    initList () {
      this.gdList.map(goods => {
        // goods.spell = PySearch(goods[this.options.label])
        // if (goods.subTypeName !== undefined) {
        // goods.subSpell = PySearch(goods.subTypeName)
        // }
      })
    },
    /**
     * 搜索
     * 案商品拼音首字母进行搜索
     */
    search () {
      console.log(this.gdList)
      // this.gdList.forEach(goods => {
      //   // const keyCode = PySearch(this.keyWords)[0].toUpperCase()
      //   const nameFlag = goods[this.options.label].indexOf(this.keyWords) >= 0
      //   const subTypeName =
      //     goods.subTypeName !== undefined
      //       ? goods.subTypeName.indexOf(this.keyWords) >= 0
      //       : false
      //   let pyFlag = false
      //   if (goods.spell && goods.spell.length) {
      //     goods.spell.forEach(el => {
      //       if (el.indexOf(keyCode) >= 0) {
      //         pyFlag = true
      //       }
      //     })
      //   }
      //   if (goods.subSpell && goods.subSpell.length) {
      //     goods.subSpell.forEach(el => {
      //       if (el.indexOf(keyCode) >= 0) {
      //         pyFlag = true
      //       }
      //     })
      //   }
      //   if (pyFlag || nameFlag || subTypeName) {
      //     this.$set(goods, 'unShow', false)
      //   } else {
      //     this.$set(goods, 'unShow', true)
      //   }
      // })
    },
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
.tl-transfer {
  width: 600px;
  height: 540px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.15);
  color: #666666;
  .transfer-main {
    display: flex;
    height: 430px;
    border-bottom: 1px solid #fbfbfb;
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
      border-left: 1px solid #fbfbfb;;
      padding: 8px 18px 0;
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
</style>
