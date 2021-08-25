<template>
    <div class="recommend-info">
      <div class="info-header">热门推荐</div>
    </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import GoodsListItem from 'components/content/goods/GoodsListItem.vue'

    export default {
      name: "DetailRecommendList",
      components: {
        GoodsList,
        GoodsListItem
      },
      props: {
        recommendList: {
          type: Array,
          default() {
            return []
          }
        }
      }
    }
</script>

<style scoped>

</style>