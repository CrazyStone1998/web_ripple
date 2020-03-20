<template>
    <el-container class="mine-detail-container">
        <el-header class="mine-detail-container-header">
            <div>
                <svg class="logo-svg" aria-hidden="true">
                    <use xlink:href="#icon-logo-white"></use>
                </svg>
            </div>
            <div>
                <el-page-header class="page-header" @back="goBack" content="我的信息"></el-page-header>

            </div>
        </el-header>

        <el-container class="mine-detail-inner-container">
            <el-main class="mine-detail-inner-container-main">
                <el-row class="mine-detail-description">
                    <el-col :span="4">
                        <el-image class="mine-cover" :src="mineInfo.cover_url" fit="fill" ></el-image>
                        <div class="mine-share">
                            <svg aria-hidden="true" class="mine-icon-share">
                                <use xlink:href="#icon-CatFootprint"></use>
                            </svg>
                            <span>分享到</span>
                            <svg aria-hidden="true" class="mine-icon-share">
                                <use xlink:href="#icon-Facebook"></use>
                            </svg>
                            <svg aria-hidden="true" class="mine-icon-share">
                                <use xlink:href="#icon-youtube"></use>
                            </svg>
                            <svg aria-hidden="true" class="mine-icon-share">
                                <use xlink:href="#icon-twitter"></use>
                            </svg>
                        </div>

                    </el-col>
                    <el-col :span="18" class="mine-info">
                        <div>
                            <span class="mine-name">{{mineInfo.username}}</span>
                        </div>
                        <el-divider></el-divider>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">性别 : </span>
                            <span class="mine-info-content"> {{ mineInfo.sex }}</span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">电话 : </span>
                            <span class="mine-info-content"> {{ mineInfo.phone }}</span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">邮箱 : </span>
                            <span class="mine-info-content"> {{ mineInfo.mail }}</span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">星座 : </span>
                            <span class="mine-info-content"> {{mineInfo.constellation}} </span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">工作 : </span>
                            <span class="mine-info-content"> {{mineInfo.work}} </span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">出生日期 : </span>
                            <span class="mine-info-content"> {{mineInfo.birth}}</span>
                        </div>
                        <div class="mine-detail-block">
                            <span class="mine-info-tag">出生地 : </span>
                            <span class="mine-info-content"> {{mineInfo.hometown}} </span>
                        </div>
                    </el-col>
                </el-row>

                <el-divider content-position="left" class="mine-detail-divider">简介</el-divider>

                <el-row>
                    <span class="mine-info-introduction">{{mineInfo.introduction}}</span></el-row>

                <el-divider content-position="left">近况</el-divider>
                <el-row class="mine-info-resource">
                    <el-col :span="4" v-for="(img,index) in mineInfo.photos" :key="index">
                        <el-image :src="img" class="mine-recent-img"></el-image>
                    </el-col>
                </el-row>

                <el-divider content-position="left">愿望单</el-divider>
                <el-row class="mine-info-resource">

                </el-row>

                <el-divider content-position="left">我的评论</el-divider>
                <el-row class="mine-info-resource">

                </el-row>
                <el-divider content-position="left">我的留言</el-divider>
                <el-row class="mine-info-resource">

                </el-row>

            </el-main>
            <el-aside width="350px" class="mine-detail-inner-container-aside">
                <Aside></Aside>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Aside from "../components/Utils/Aside";
    import Home from "./Home";
    import Resource from "./Resource";
    export default {
        name: "Mine",
        components: {Aside},
        props: ['id', 'celebrity','genre'],
        data() {
            return {
                homeLink: Home,
                resourceLink: Resource,
                mineInfo: {
                    username: '小罗伯特·唐尼',
                    phone: '13653399918',
                    mail: '1453793807@qq.com',
                    sex: '男',
                    cover_url: 'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p56339.webp',
                    constellation: '白羊座',
                    birth: '1965-04-04',
                    hometown: '美国纽约',
                    introduction: '　小罗伯特·唐尼，美国男演员。7岁时在父亲的电影《Greaser\'s Palace》中饰演角色，8岁时父亲递给了他人生第一支大麻烟，10岁时全家居住在伦敦，他参加了切尔西著名的Perry House School 学习古典芭蕾。从1976年起，他参加了三届Stagedoor Manor 表演夏令营，学习表演、舞蹈、声乐等，在其整个青少年时期，他和其家庭成员都在滥用大麻及可卡因。',
                    photos: [
                        'https://img9.doubanio.com/view/photo/sqxs/public/p960012104.webp',
                        'https://img9.doubanio.com/view/photo/sqxs/public/p737203514.webp',
                        'https://img1.doubanio.com/view/photo/sqxs/public/p1404542459.webp',
                        'https://img3.doubanio.com/view/photo/sqxs/public/p2562580933.webp',
                        'https://img1.doubanio.com/view/photo/sqxs/public/p2562581869.webp'
                    ],
                },
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .mine-detail-container {
        background-color: $bg_gray_light_global;

        .mine-detail-container-header {
            display: flex;
            background-color: $bg_black_global;
            padding-left: 10%;
            .logo-svg {
                margin-top: 5px;
                margin-right: 50px;
                width: 50px;
                height: 50px;
            }
            .el-page-header {
                margin-top: 20px;
                color: $bg_white_global;
            }
            .el-page-header:hover {
                color: #8ce4ec;
            }
            ::v-deep .el-page-header__content {
                color: $bg_white_global;
            }

        }

        .mine-detail-inner-container {
            padding-left: 15%;
            padding-right: 15%;


            .mine-detail-inner-container-main {
                border-radius: 30px;
                background-color: $bg_white_global;

                .mine-detail-description {

                    .mine-share {
                        display: flex;
                        justify-content: space-evenly;

                        .mine-icon-share {
                            height: 25px;
                            width: 25px;
                            cursor: pointer;
                        }
                    }

                    .mine-info {
                        margin-left: 20px;
                        text-align: left;

                        .mine-name {
                            font-size: xx-large;
                        }

                        .el-divider--horizontal {
                            margin: 10px;
                        }

                        .mine-detail-block {
                            margin-bottom: 5px;

                            .mine-info-tag {
                                font-weight: bold;
                                font-size: 22px;
                                cursor: default;
                            }

                            .mine-info-content {
                                font-size: 20px;
                                color: $bg_blue_global;
                                cursor: pointer;
                            }

                            .el-divider--vertical {
                                margin-left: 100px;
                                border-top: 1px dashed $bg_blue_white_global
                            }
                        }
                    }
                }

                .mine-info-introduction {
                    margin-left: 5px;
                    color: $bg_black_global;
                    font-size: 15px;
                }

                .mine-info-resource {
                    margin-bottom: 10%;
                }

                .mine-info-awards {
                    text-align: left;

                }

                .mine-recent-img {
                    margin-left: 10px;
                    margin-right: 10px;
                }


                .el-divider--horizontal {
                    background-color: $bg_gray_light_global;
                }

                .el-divider__text {
                    border-color: transparent;
                    background-color: transparent;
                    font-weight: bold;
                    font-size: 20px;
                    color: skyblue;
                }
            }
        }
    }

</style>
