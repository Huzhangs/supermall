<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-goods-params :goods-params="goodsParam"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './detailComponents/DetailNavBar.vue'
  import DetailSwiper from './detailComponents/DetailSwiper.vue'
  import DetailBaseInfo from './detailComponents/DetailBaseInfo.vue'
  import DetailShopInfo from './detailComponents/DetailShopInfo.vue'
  import DetailGoodsInfo from './detailComponents/DetailGoodsInfo.vue'
  import DetailGoodsParams from './detailComponents/DetailGoodsParams.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'

  import { getDetails,Goods,Shop,GoodsParam } from 'network/detail.js'

  export default {
    name: "Detail",
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {}
      }
    },
    created () {
      // 1、保存传入的商品主键id
      this.iid = this.$route.params.iid;

      // 2、根据获取到的商品主键获取商品详情信息
      getDetails(this.iid).then( res => {
        var data = res.result;
        console.log(res);
        // 1、获取顶部轮播图信息
        this.topImages = data.itemInfo.topImages;

        // 2、获取商品详情信息  
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        // 3、获取店家信息
        this.shop = new Shop(data.shopInfo);

        // 4、获取商品图片信息
        this.detailInfo = data.detailInfo;

        // 5、获取商品参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      } )

    },
    methods: {
      imageLoad() {
        // console.log("-----111------");
          this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
    .detail {
      position: relative;
      z-index: 1;
      background-color: #fff;
      height: 100vh;
    }

    .detail-nav {
      background-color: #fff;
    }

    .content {
      /* position: absolute; */
      /* top: 44px;
      bottom: 60px; */
      height: calc(100vh - 93px);
      overflow: hidden; 
    }

</style>
