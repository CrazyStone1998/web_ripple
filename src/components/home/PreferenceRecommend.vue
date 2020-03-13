<template>
    <el-container class="preference-container" style="height: 650px">
        <el-header>
            <el-tag type="success">猜你喜欢</el-tag>
        </el-header>
        <el-container>
            <el-main>
                <el-row v-for="(row,index) in preferenceRecommendList" :key="index">
                    <el-col :span="6" v-for="(item,index) in row" :key="index">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <el-image :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id, item)"></el-image>
                            <div>
                                <span class="movie-detail">{{item.name}}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-aside width="250px">
                <el-card class="prefer-rank">
                    <div slot="header">
                        <span>强烈推荐</span>
                    </div>
                    <div v-for="(row,index) in preferenceRecommendList" :key="index">
                        <el-row v-for="(item,index) in row" :key="index" class="prefer-row">
                            <el-col :span="4">
                                >
                            </el-col>
                            <el-col :span="20">
                                <span style="cursor: pointer;" @click="jumpToDetail(item.id, item)">{{item.name}}</span>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

            </el-aside>
        </el-container>
    </el-container>

</template>

<script>
    export default {
        name: "PreferenceRecommend",
        data() {
            return {
                preferenceRecommendList: []

            };
        },
        methods: {
            async getPreferenceRecommendList() {
                console.log("初始化 偏好推荐");
                const {data: result} = await this.$http.get("movie/es/prefer");
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.preferenceRecommendList.push(result.data["resultList"].slice(8, 12));
                    this.preferenceRecommendList.push(result.data["resultList"].slice(12, 16));
                } else {
                    this.$message.error(result.message);
                }
            },
            jumpToDetail(movie_id) {
                this.$router.push(
                    {
                        name: "MovieDetail",
                        params: {id: movie_id,}
                    }
                )

            }
        },
        created() {
            this.getPreferenceRecommendList();
        }
    }
</script>

<style lang="scss" scoped>
    .preference-container {
        margin-left: 145px;
        margin-right: 100px;
        height: 680px;

        .el-header {
            .el-tag {
                float: left;
            }
        }

        .el-main {
            padding: 0;
            padding-top: 5px;

            .el-card {
                background-color: transparent;
                margin: 5px;
                margin-top: 0;
                cursor: pointer;

                .el-image {
                    height: 260px;
                    width: 220px;
                }

                .movie-detail {
                    color: #eeeeee;
                    cursor: pointer;
                }
            }
        }

        .el-aside {

            background-color: transparent;

            .prefer-rank {
                background-color: transparent;
                color: #eeeeee;
                height: auto;
            }

            .prefer-row {
                margin-bottom: 40px;
                color: #7491e2;
            }

        }
    }

</style>