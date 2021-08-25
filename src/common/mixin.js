  import { debounce } from "./utils";

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