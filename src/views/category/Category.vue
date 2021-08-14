<template>
  <div class="wrapper" ref="aaaaa">
     <ul class="content">
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
      <li>分类列表1</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data () {
      return {
        scroll: null
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.aaaaa,{

      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background: green;
    overflow: hidden;
  }
</style>
