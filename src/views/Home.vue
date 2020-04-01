<template>
    <el-container class="home-container">
        <el-header style="height: 85px">
            <Header></Header>
        </el-header>

        <el-main class="home-container-main">
            <el-backtop target=".home-container-main" :bottom="100" :right="100"
                        style="background-color: transparent;width: 50px;height: 50px">
                <svg aria-hidden="true">
                    <use xlink:href="#icon-top"></use>
                </svg>
            </el-backtop>
            <PopularRecommend></PopularRecommend>
            <PreferenceRecommend></PreferenceRecommend>
            <CoolRecommend></CoolRecommend>
            <Footer></Footer>
        </el-main>

    </el-container>
</template>

<script>
    import PopularRecommend from "../components/home/PopularRecommend";
    import PreferenceRecommend from "../components/home/PreferenceRecommend";
    import CoolRecommend from "../components/home/ColdRecommend";
    import Footer from "../components/home/Footer";
    import {mapState} from "vuex";
    import Header from "../components/home/Header";

    export default {

        name: "Home",
        components: {Header, Footer, CoolRecommend, PreferenceRecommend, PopularRecommend},
        data() {
            return {};
        },
        computed: mapState({
            loginState: 'loginState',
            username: 'username',
            userIcon: 'userIcon',
            loadingCalculation: "loadingCalculation"
        }),
        watch: {
            loadingCalculation(curVal, oldVal) {
                if (curVal === 0 && oldVal === 1) {
                    const loading = this.$loading();
                    loading.close();
                }
            }
        },

        methods: {},
        beforeCreate() {
            if (this.$store.state.loadingCalculation) {
                const loading = this.$loading({
                    lock: true,
                    text: '加 载 中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(26, 34, 40, 0.9)'
                });
                setTimeout(() => {
                    loading.close();
                }, 3000);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .home-container {
        height: 100%;
        background-color: $bg_black_global;
        background-image: linear-gradient(to left bottom, $bg_black_global, $bg_red_black_global, $bg_black_global, $bg_red_black_global, $bg_black_global);

        .el-header {
            padding: 0;
        }

        .home-container-main {
            padding: 3% 0 0 0;
        }
    }
</style>