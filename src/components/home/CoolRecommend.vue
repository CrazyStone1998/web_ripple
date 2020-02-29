<template>
    <el-container class="preference-container" style="height: 650px">
        <el-header>
            <el-tag type="success">猜你喜欢</el-tag>
        </el-header>
        <el-container>
            <el-main>
                <el-row v-for="row in 2" :key="row">
                    <el-col :span="6" v-for="index in 4" :key="index">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <img class="img-card" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt="">
                            <div style="padding: 0px;">
                                <span>好吃的汉堡</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ currentDate }}</time>
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside width="200px">Aside</el-aside>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "CoolRecommend"
    }
</script>

<style lang="scss" scoped>
    .preference-container {
        margin-left: 145px;
        margin-right: 100px;
        height: 650px;

        .el-header {
            background-color: #eeeeee;
            .el-tag {
                float: left;
            }
        }
        .el-main {
            padding: 0;
            padding-top: 5px;
            .el-card {

            }
        }
        .el-aside {
            background-color: #7491e2;
        }

    }


</style>