<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"  ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper ref="base" :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-goods-params ref="params" :goods-params="goodsParam"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommendList"/>
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
  import DetailCommentInfo from './detailComponents/DetailCommentInfo.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { getDetails,getRecommendList,Goods,Shop,GoodsParam } from 'network/detail.js'
  import { itemImgListenerMixin } from 'common/mixin.js'

  export default {
    name: "Detail",
    components: { 
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    mixins: [itemImgListenerMixin],
    created () {
      // 保存传入的商品主键id
      this.iid = this.$route.params.iid;

      /**
       * 根据获取到的商品主键获取商品详情信息
       */
      getDetails(this.iid).then( res => {
        var data = res.result;
        // console.log(res);
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

        // 6、获取商品评论信息,判断评论是否有数据
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

      }),
      /**
       * 获取商品推荐信息
       */
      getRecommendList().then( res => {
        this.recommendList = res.data.list;
      })

    },
    methods: {
      /**
       * 
       */
      imageLoad() {
          this.$refs.scroll.refresh();
          this.themeTopYs.push(-this.$refs.base.$el.offsetTop + 44);
          this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 44);
          this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 44);
          this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 44);
          this.themeTopYs.push(-Number.MAX_VALUE);
      },
      /**
       * NavBar中的点击事件
       */
      titleClick(index) {
        // 点击对应的标签滚动到对应的位置
        this.$refs.scroll.scrollTo(0,this.themeTopYs[index],100);
      },
      /**
       * 监听scroll的滚动位置
       */
      contentScroll(position) {
        const positionY = -position.y;
        // 判断滚动的当前位置是否在设置的位置中
        let length = this.themeTopYs.length;
        for(var i =0;i < length;i++){
          let posx = -this.themeTopYs[i];
          let posy = -this.themeTopYs[i+1];
          if(positionY >= posx && positionY < posy)
          {
            if (this.currentIndex !== i) {
               this.currentIndex = i;
               this.$refs.nav.currentIndex = this.currentIndex;
            }
            break;
          }
        }
      }
    },
    destroyed () {
      this.$bus.$off('itemImageLoad',this.itemImgListener);
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
