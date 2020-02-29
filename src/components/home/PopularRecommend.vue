<template>
    <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "PopularRecommend"
    }
</script>

<style lang="scss" scoped>
    .el-carousel {
        margin-left: 150px;
        margin-right: 150px;
    }

    .el-carousel__item h3 {
        color: #eeeeee;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #b2ebff;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #8ce4ec;
    }

</style>