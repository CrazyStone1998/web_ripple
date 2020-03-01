<template>
    <div class="container-query">
        <el-row>
            <el-checkbox-group v-model="genrePick" class="checkbox-group">
                <el-checkbox-button v-for="(genre,index) in genreList" :label="genre" :key="index">
                    <span>{{genre}}</span>
                </el-checkbox-button>
            </el-checkbox-group>
        </el-row>
        <el-divider class="divider"></el-divider>
        <el-row>
            <el-col>
                <el-checkbox-group v-model="areaPick" class="checkbox-area">
                    <el-checkbox-button v-for="(area,index) in areaList" :label="area" :key="index">{{area}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-divider class="divider"></el-divider>
        <el-row>
            <el-col>
                <el-checkbox-group v-model="datePick" class="checkbox-date">
                    <el-checkbox-button v-for="(date,index) in dateList" :label="date" :key="index">{{date}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-col>

        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Query",
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
    .container-query {
        height: 220px;
        margin-left: 400px;
        margin-right: 400px;

        .el-checkbox-button {
            margin-left: 5px;
            margin-right: 5px;
            margin-top: 5px;
        }
        .divider {
            background-color: transparent;
            margin-top: 6px;
            margin-bottom: 6px;

        }
    }

</style>