<template>
    <div class="demo">
        <div>
            <h1>vue项目模版</h1>
            <p>脚手架整合：babel+gulp+webpack+browserSync</p>
            <p>前端整合：vue+vue-router+vuex+vuex-router-sync+axios+jquery+boostrap</p>
            <p class="author">--月下独奏</p>
        </div>
        <router-link :to="{ name: 'home', params: { id: 1 }}">demo</router-link>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        created(){

        },
        computed:{

        },
        methods:{

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
        h1
            font-size 30px
        p.author
            text-align right
            font-size 26px
</style>