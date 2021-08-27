<template>
    <div class="bottom-bar">
      <div class="bottom-content">
        <check-button :checking="isSelectAll" @click.native="selectAllClick"  class="check-button"></check-button>
        <span>全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate">
        去结算：{{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'

  import { mapGetters } from 'vuex'

    export default {
      name:  "CartBottomBar",
      components: {
        CheckButton
      },
      computed: {
        ...mapGetters(['getCartListLength','getCartList']),
        /**
         * 计算购物车中被选中的全部商品的总价格
         */
        totalPrice() {
          return '￥'+this.getCartList.filter(item => {
            return item.checked
          }).reduce((preValue,item) => {
            return preValue += item.price * item.count;
          },0).toFixed(2);
        },
        /**
         * 获取购物车中被选中的商品个数（一共有多少种，按照id算）
         */
        checkLength() {
          return this.getCartList.filter(item => item.checked).length;
        },
        /**
         * 判断购物车当前是否被全部选择
         */
        isSelectAll() {
          if(this.getCartList.length === 0) return false; 
          return !(this.getCartList.find(item => !item.checked))
        }
      },
      methods: {
        /**
         * 点击全选按钮触发事件
         */
        selectAllClick() {
          if(this.isSelectAll)//全选时点击，变成全不选
          {
            this.getCartList.forEach(item => item.checked = false);
          }else {
            this.getCartList.forEach(item => item.checked = true);
          }
        }
      }
    }
</script>

<style scoped>
    .bottom-bar {
      position: relative;
      display: flex;
      height: 40px;
      line-height: 40px;
      background-color: #eee;
    }

    .bottom-content {
      width: 90px;
      display: flex;
      align-items: center;
    }

    .check-button {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-left: 10px;
      margin-right: 10px;
    }

    .price {
      margin-left: 30px;
      flex: 1;
    }

    .calculate {
      width: 100px;
      margin-right: 10px;
      text-align: center;
      color: #FFF;
      background-color: var(--color-tint);
    }

</style>