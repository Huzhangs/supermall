<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="titles"></tab-control>
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

  import { getHomeMultidata } from 'network/home.js'
  
  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    }, 
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选']
      }
    }, 
    created() {
      //1、请求多个数据
      getHomeMultidata().then(res => {
         this.banners = res.data.banner.list;
         this.recommends = res.data.recommend.list;
      })
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
  }

</style>
