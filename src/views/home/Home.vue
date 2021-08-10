<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/TabBar.vue'
  import { Swiper,SwiperItem } from 'components/common/swiper';
  import { getHomeMultidata } from 'network/home.js'
  
  export default {
    name: "Home",
    components: {
      NavBar,
      Swiper,
      SwiperItem
    }, 
    data() {
      return {
        banners: [],
        recommends: []
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
  .home-nav {
    background-color: var(--color-tint);
    color: #fff
  }
</style>
