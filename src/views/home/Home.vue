<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control class="tab-control" 
                    :titles="titles"
                    ref="tabControl1"
                    @tabClick="tabClick"
                    v-show="isTabFixed"
      />
    <scroll class="content" ref="scroll" 
                            :probe-type="3" 
                            @scroll="contentScroll"
                            :pull-up-load="true"
                            @pullingUp="loadMore">
      <home-swiper :banners="banners"  @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control  :titles="titles"
                    ref="tabControl"
                    @tabClick="tabClick"
                    v-show="!isTabFixed"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComponents/HomeSwiper.vue'
  import RecommendView from './childComponents/RecommendView.vue'
  import FeatureView from './childComponents/FeatureView.vue'

  import NavBar from 'components/common/navBar/TabBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'


  import { getHomeMultidata,getHomeGoods } from 'network/home.js'
  import { debounce } from 'common/utils.js'
  import { itemImgListenerMixin,backTopListenerMixin } from 'common/mixin.js'
   
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      Scroll,
      TabControl,
      GoodsList
    }, 
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
          'pop': {page: 0,list: []},
          'new': {page: 0,list: []},
          'sell': {page: 0,list: []},
        },
        currentType: 'pop', //请求商品数据类型
        tabOffsetTop: 0, //tabControl距离顶部的距离
        isTabFixed: false, //是否显示tabControl
        saveY: 0  //离开Home组件时的位置，往下滚动时，Y值为负数
      }
    }, 
    mixins: [itemImgListenerMixin,backTopListenerMixin],
    computed: {
      showGoods() {
        return  this.goods[this.currentType].list;
      }
    },
    activated () {
      //回到首页时，滚动到上次离开时的位置  
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },
    deactivated () {
      //离开首页时，记录当前的滚动位置
      this.saveY = this.$refs.scroll.getScrollY();
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata();

      //2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    methods: {

      /**
       * 事件监听函数
       */
      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
      },
      /**
       * 判断当前滑动位置决定是否隐藏backTop组件
       */
      contentScroll(position) {
        // 1、判断是否显示回到顶部
        this.isBackTop(position);

        // 2、判断tabControl是否吸顶
        this.isTabFixed = (-position.y)  > this.tabOffsetTop;
      },

      /**
       * 加载更多数据
       */
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.refresh();
      },
      swiperImageLoad() {
        // 2获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop - 44;
      },

      // 网络请求
      /**
       * 请求轮播图的数据
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          //刷新Scroll对象，防止出现滚动的高度小于实际的高度
          this.recommends = res.data.recommend.list;
        })
      },

      /**
       * 请求商品数据
       */
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;//获取当前商品页数
        getHomeGoods(type,page).then( res => {
          this.goods[type].list.push(...res.data.list);//将新请求到的商品信息加入到对应的商品信息集合中
          this.goods[type].page += 1;//将该类型商品页数+1
        // 完成上拉加载更多后
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>

  #home {
    height: 100vh;
    /* padding-top: 44px; */
    /* position: relative; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    /* position: sticky; */
    /* top:44px; */
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 93px);
    overflow: hidden; 
    /* position: absolute;
    top: 44px;
    bottom: 49px; */
    left: 0;
    right: 0;
  }
</style>
