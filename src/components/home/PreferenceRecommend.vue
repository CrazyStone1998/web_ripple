<template>
    <el-container class="preference-container" style="height: 650px">
        <el-header>
            <el-tag type="success">猜你喜欢</el-tag>
        </el-header>
        <el-container>
            <el-main>
                <el-row v-for="(row,index) in preferenceList" :key="index">
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
                    <div v-for="(row,index) in preferenceList" :key="index">
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
        name: "PreferenceRecommend",
        data() {
            return {
                preferenceList: [
                    [
                        {
                            name: '黑寡妇',
                            cover_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1373827667,48927463&fm=26&gp=0.jpg'
                        },
                        {
                            name: '蝙蝠侠',
                            cover_url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2138247768,2720298265&fm=26&gp=0.jpg'
                        },
                        {
                            name: '率巨人',
                            cover_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1066926804,1548075868&fm=26&gp=0.jpg'
                        },
                        {
                            name: 'V字仇杀队',
                            cover_url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2629247203,1604036191&fm=26&gp=0.jpg'
                        },
                    ],
                    [
                        {
                            name: '奇异博士',
                            cover_url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2332818030,2116484028&fm=26&gp=0.jpg'
                        },
                        {
                            name: '钢铁侠',
                            cover_url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2477403324,1600680804&fm=26&gp=0.jpg'
                        },
                        {
                            name: '战争之网',
                            cover_url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1012433093,525783264&fm=26&gp=0.jpg'
                        },
                        {
                            name: '权利的游戏',
                            cover_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1005423353,680353328&fm=26&gp=0.jpg'
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
                cursor: pointer;
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