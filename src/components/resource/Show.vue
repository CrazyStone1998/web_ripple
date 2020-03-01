<template>
    <div  v-infinite-scroll="loadShowList" class="container-show">
        <el-row v-for="(row,index) in showList" :key="index">
            <el-col :span="6" v-for="(item,index) in row" :key="index">
                <el-card :body-style="{ padding: '0px' }" shadow="hover" >
                    <el-image :src="item.cover_url" fit="fill"></el-image>
                    <div>
                        <span class="movie-detail">{{item.name}}</span>
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
                showList: [
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
            }
        },
        methods: {
            loadShowList() {
                this.showList.push([
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

                ])
            }
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