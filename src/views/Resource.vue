<template>
    <el-container class="resource-container">

        <el-header class="resource-container-header" style="height: 85px">
            <LibraryHeader></LibraryHeader>
        </el-header>

        <el-main class="resource-container-main">
            <el-backtop target=".resource-container-main" :bottom="100" :right="100"
                        style="background-color: transparent;width: 50px;height: 50px">
                <svg aria-hidden="true">
                    <use xlink:href="#icon-top"></use>
                </svg>
            </el-backtop>
            <Query></Query>
            <Footer></Footer>
        </el-main>
    </el-container>
</template>

<script>
    import Footer from "../components/home/Footer";
    import Query from "../components/library/Category";
    import LibraryHeader from "../components/library/LibraryHeader";

    export default {
        name: "Resource",
        components: {LibraryHeader, Query, Footer},
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .resource-container {
        height: 100%;
        background-color: $bg_black_global;

        .resource-container-header {
            padding: 0;
        }

        .resource-container-main {
            padding: 0;
        }
    }
</style>