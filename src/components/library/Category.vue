<template>
    <el-container class="query-container">
        <el-main class="query-container-main">
            <el-row class="query-genre">
                <el-col :span="4">
                    <el-tag>类 型</el-tag>
                </el-col>
                <el-col :span="20">
                    <el-checkbox-group v-model="genrePick">
                        <el-checkbox-button v-for="(genre,index) in genreList" :label="genre" :key="index">
                            <span>{{genre}}</span>
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="query-area">
                <el-col :span="4">
                    <el-tag>地区</el-tag>
                </el-col>
                <el-col :span="20">
                    <el-checkbox-group v-model="areaPick">
                        <el-checkbox-button v-for="(area,index) in areaList" :label="area" :key="index">{{area}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
            </el-row>
            <el-row class="query-date">
                <!--<el-col :span="4">-->
                <!--    <el-tag>时间</el-tag>-->
                <!--</el-col>-->
                <!--<el-col :span="20">-->
                <!--    <el-checkbox-group v-model="datePick" class="checkbox-date">-->
                <!--        <el-checkbox-button v-for="(date,index) in dateList" :label="date" :key="index">{{date}}-->
                <!--        </el-checkbox-button>-->
                <!--    </el-checkbox-group>-->
                <!--</el-col>-->
            </el-row>
            <el-row class="query-rate">
                <!--<el-col :span="4">-->
                <!--    <el-tag>评分</el-tag>-->
                <!--</el-col>-->
                <!--<el-col :span="20">-->

                <!--</el-col>-->
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                genreList: ['全部', '剧情', '爱情', '犯罪', '奇幻', '动作', '冒险', '家庭', '音乐', '西部',
                    '短片', '色情', '戏剧', '惊悚', '恐怖', '历史', '运动', '黑色', '神秘', '战争'],
                genrePick: ['剧情'],
                areaList: ['全部', '中国', '美国', '韩国', '日本', '印度', '法国','德国','泰国','英国'],
                areaPick: ['中国'],
                dateList: ['全部', '2020', '2019', '2018', '2017', '2016', '2015','2014','2013','>'],
                datePick: []

            };
        }
    }
</script>

<style lang="scss" scoped>
    .query-container {
        background-color: #d3e8f8;



    }
</style>