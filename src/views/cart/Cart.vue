<template>
  <div id="cart">
    <!--购物车导航-->
    <nav-bar class="cart-nav"><div slot="center">购物车({{getCartListLength}})</div></nav-bar>

    <!--购物车商品列表-->
    <scroll  class="content" ref="scroll" >
      <cart-list :cartList="getCartList"></cart-list>
    </scroll>

    <!--购物车底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/TabBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import CartList from './childComponents/CartList.vue'
  import CartBottomBar from './childComponents/CartBottomBar.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['getCartListLength','getCartList'])
    },
    activated () {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
    #cart {
      height: 100vh;
    }

     .content {
      height: calc(100vh - 44px - 49px - 40px);
      overflow: hidden;
    }
    .cart-nav {
      background-color: var(--color-tint);
      color: #fff;
    }

</style>
