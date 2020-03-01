<template>
    <el-container class="preference-container" style="height: 650px">
        <el-header>
            <el-tag type="success">猜你喜欢</el-tag>
        </el-header>
        <el-container>
            <el-main>
                <el-row v-for="(row,index) in coolList" :key="index">
                    <el-col :span="6" v-for="(item,index) in row" :key="index">
                        <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                            <el-image :src="item.cover_url" fit="fill"></el-image>
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
                    <div v-for="(row,index) in coolList" :key="index">
                        <el-row v-for="(item,index) in row" :key="index" class="prefer-row">
                            <el-col :span="4">
                                >
                            </el-col>
                            <el-col :span="20">
                                {{item.name}}
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
        name: "CoolRecommend",
        data() {
            return {
                coolList: [
                    [
                        {
                            name: '闪光少女',
                            cover_url: 'http://img4.imgtn.bdimg.com/it/u=2937730371,3066347201&fm=26&gp=0.jpg'
                        },
                        {
                            name: '克隆人',
                            cover_url: 'http://img2.imgtn.bdimg.com/it/u=2021115687,1180101425&fm=26&gp=0.jpg'
                        },
                        {
                            name: '终结者',
                            cover_url: 'http://img4.imgtn.bdimg.com/it/u=1762736586,1454463982&fm=26&gp=0.jpg'
                        },
                        {
                            name: '天气之子',
                            cover_url: 'http://img3.imgtn.bdimg.com/it/u=1292697011,3663126806&fm=26&gp=0.jpg'
                        },

                    ],
                    [
                        {
                            name: '一代宗师',
                            cover_url: 'http://img4.imgtn.bdimg.com/it/u=2064679879,3619300735&fm=26&gp=0.jpg'
                        },
                        {
                            name: '爱',
                            cover_url: 'http://img2.imgtn.bdimg.com/it/u=4014499474,1772505248&fm=26&gp=0.jpg'
                        },
                        {
                            name: '唐人街探案',
                            cover_url: 'http://img5.imgtn.bdimg.com/it/u=2499636776,3741085657&fm=26&gp=0.jpg'
                        },
                        {
                            name: '爱猫之城',
                            cover_url: 'http://img2.imgtn.bdimg.com/it/u=2470489405,626330881&fm=26&gp=0.jpg'
                        },
                    ]
                ]
            };
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
                .el-image {
                    height: 260px;
                    width: 220px;
                }
                .movie-detail{
                    color: #eeeeee;
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