<template>
    <!--<div v-infinite-scroll="loadShowList" class="container-show">-->
    <div class="container-show">
        <el-menu :default-active="activeIndex" class="show-sort-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">按热度</el-menu-item>
            <el-menu-item index="2">按时间</el-menu-item>
            <el-menu-item index="3">按喜好</el-menu-item>
        </el-menu>

        <div class="show-content-list">
            <el-row v-for="(row,index) in showList" :key="index" class="row-show-movie">
                <el-col :span="6" v-for="(item,index) in row" :key="index" class="col-show-movie">
                    <el-card
                            :body-style="{ padding: '0px' }"
                            shadow="hover"
                            @mouseover.native="mouseover($event,' card-active')"
                            @mouseout.native="mouseout($event,' card-active')"
                    >
                        <el-image :src="item.cover_url" fit="fill" @click="jumpToDetail(item.id, item)"></el-image>
                        <div class="movie-detail">
                            <el-tag class="movie-name" >{{item.name}}</el-tag>
                            <div class="movie-rate">
                                <svg class="rate-star" aria-hidden="true">
                                    <use xlink:href="#icon-star"></use>
                                </svg>
                                <i style="color: #f9f031">{{item.rate}}</i>
                            </div>
                        </div>
                        <div class="movie-genre-box">
                            <el-tag class="movie-genre" v-for="(genre, index) in item.genreSet" :key="index" @click="searchByQuery">
                                {{genre.name}}
                            </el-tag>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>


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
            loadShowList() {
                this.$message.info("滚动更新");
                console.log(this.pageNum, this.pageSize);

                setTimeout(async () => {
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
                }, 5000);


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
            },

            // 监听方法
            mouseover($event,activeClassName) {
                $event.currentTarget.className += activeClassName;
            },
            mouseout($event,activeClassName) {
                $event.currentTarget.className =
                    $event.currentTarget.className.slice(
                        0,
                        $event.currentTarget.className.indexOf(activeClassName)
                    )
            },
        },
        created() {
            this.getShowList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";
    .container-show {

        .show-sort-menu {
            padding-left: 5%;
            margin-bottom: 2%;
            border-radius: 6px;
        }

        .show-content-list {
            margin-left: 5%;
            margin-right: 5%;

            .el-card {
                 background-color: $bg_black_global;
                 border-color: transparent;
                 margin-right: 8px;
                 margin-left: 8px;
                 margin-bottom: 5%;
                 cursor: pointer;

                 .el-image {
                     height: 300px;
                     width: 100%;
                 }

                 .movie-detail {
                     display: flex;
                     justify-content: space-around;
                     border: transparent;
                     background-color: transparent;
                     cursor: pointer;

                     .movie-name {
                         border-color: transparent;
                         background-color: transparent;
                         font-size: x-large;
                     }

                     .movie-rate {
                         margin-top: 3%;
                     }

                     .rate-star {
                         width: 15px;
                         height: 15px;
                         margin-right: 5px;
                     }
                 }

                 .movie-genre-box {
                     display: flex;

                     .movie-genre {
                         margin-left: 5px;
                         color: #eeeeee;
                         border-color: transparent;
                         background-color: $bg_green_global;
                         font-size: small;
                     }
                 }

             }

            .card-active {
                border-color: #eeeeee;
                background-color: #536f85;
                margin-right: 0;
                margin-left: 0;
                margin-bottom: 0;
            }
        }

    }


</style>