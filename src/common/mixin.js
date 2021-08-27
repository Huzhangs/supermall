  import { debounce } from "./utils";

  import BackTop from 'components/content/backTop/BackTop.vue'

  export const itemImgListenerMixin = {
      data () {
        return {
          itemImgListener: null
        }
      },
      mounted () {
        //图片完成加载之后的监听
        const refresh = debounce(this.$refs.scroll.refresh(),500);
        this.itemImgListener = () => {
          refresh();
        }
        //图片加载完成之后刷新scroll的高度
        this.$bus.$on('itemImageLoad',this.itemImgListener);
      }
  }

  export const backTopListenerMixin = {
    components: {
      BackTop
    },
    data () {
      return {
        isShowBackTop: false, //是否显示回到顶部按钮
      }
    },
    methods: {
      /**
       * 回到顶部
       */
       backClick() {
        this.$refs.scroll.scrollTo(0, 0,500);
      },
      isBackTop(position) {
         // 判断是否显示回到顶部
         this.isShowBackTop = (-position.y)> 1000;
      }
    }
  }