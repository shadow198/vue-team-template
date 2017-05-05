<template>
  <div class="demo content has-text-centered">
    <p>{{countDone}}</p>
    <p><el-button @click='add'>点我Mutations</el-button></p>
    <p><el-button class="brn" @click='addAction'>点我Actions</el-button></p>
    <p><router-link :to="{ name: 'home', params: { id: 123 }}">home to 123</router-link></p>
    <p><router-link :to="{ name: 'index'}">Index</router-link></p>
    <p></p>
    <div class="bg-img"><img style="margin-left:100px;width:100px" src="~assets/images/logo.png"/></div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions } from 'vuex';
export default {
  data () {
    return {}
  },
  created(){

  },
  computed:{
      ...mapState({
        'count':'demo'
      }),
      ...mapGetters({
        'countDone':'demoDone'
      })
  },
  methods:{
      ...mapMutations({
          add:'increment'
      }),
      ...mapActions({
          addAction: 'increment'
      })
    }
}
</script>
<style lang="stylus" scoped>
  .demo
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    font-size 24px
    text-align center
  .is-title
    text-transform capitalize
  .bg-img
    width 100px
    height 100px
    background url("~assets/images/logo.png") no-repeat
    background-size 100%
</style>