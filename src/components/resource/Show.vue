<template>
    <div v-infinite-scroll="loadShowList" class="container-show">
        <el-row v-for="(row,index) in showList" :key="index">
            <el-col :span="6" v-for="(item,index) in row" :key="index">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <el-image :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id,item)"></el-image>
                    <div>
                        <span class="movie-detail" @click="jumpToDetail(item.id,item)">{{item.name}}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Show",
        data() {
            return {
                pageNum: 3,
                pageSize: 4,
                showList: []
            }
        },
        methods: {
            async getShowList() {
                console.log("初始化 资源库列表");
                const {data: result} = await this.$http.get(
                    "movie/es/_search",
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 8
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.showList.push(result.data["resultList"].slice(0, 4));
                    this.showList.push(result.data["resultList"].slice(4, 8));
                } else {
                    this.$message.error(result.message);
                }
            },
            async loadShowList() {
                this.$message.info("滚动更新");
                console.log(this.pageNum, this.pageSize);
                const {data: result} = await this.$http.get(
                    "movie/es/_search",
                    {
                        params: {
                            pageNum: this.pageNum,
                            pageSize: this.pageSize
                        }
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    console.log(result.data);
                    this.showList.push(result.data["resultList"]);
                    this.pageNum += 1;
                } else {
                    this.$message.error(result.message);
                }
            },
            jumpToDetail(movieId, movieInfo) {
                this.$router.push(
                    {
                        name: "MovieDetail",
                        params: {
                            id: movieId,
                            movie: movieInfo
                        }
                    }
                )
            }
        },
        created() {
            this.getShowList();
        }
    }
</script>

<style lang="scss" scoped>
    .container-show {
        margin-left: 330px;
        padding: 0;

        .el-col {
            width: 300px;
        }

        .el-card {
            background-color: transparent;
            width: 160px;
            height: 250px;
        }

        .el-image {
            width: 150px;
            height: 200px;
        }

        .movie-detail {
            color: #7491e2;
            font-size: x-large;
        }
    }


</style>