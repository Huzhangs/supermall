<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-control" 
                  :titles="titles"
                  @tabClick="tabClick"
    />
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
      <li>111</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComponents/HomeSwiper.vue'
  import RecommendView from './childComponents/RecommendView.vue'
  import FeatureView from './childComponents/FeatureView.vue'

  import NavBar from 'components/common/navBar/TabBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { getHomeMultidata,getHomeGoods } from 'network/home.js'
  
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
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
        currentType: 'pop'
      }
    }, 
    computed: {
      showGoods() {
        return  this.goods[this.currentType].list;
      }
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
        console.log(index);
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
      },

      /**
       * 请求轮播图的数据
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
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
        })
      }
       
      

    }
  }
</script>

<style scoped>

  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top:44px;
    z-index: 9;
  }

</style>
