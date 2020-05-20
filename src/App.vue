<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    // import Mobile from "./views/Mobile";

    export default {
        name: "app",
        methods: {
            // 添加判断方法
            isMobile() {
                // let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
                // console.log(navigator.userAgent);
                // return flag;
                return true
            }
        },
        mounted() {
            if(this.isMobile) {
                // alert("Mobile")
                this.$router.push('/mobile');
            }else {
                this.$router.push('/pc');
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
