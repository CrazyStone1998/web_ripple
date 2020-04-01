<template>
    <el-container class="user-detail-container">
        <el-header class="user-detail-container-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="homeLink">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="resourceLink">资源库</el-breadcrumb-item>
                <el-breadcrumb-item>{{userInfo.username}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-divider></el-divider>
        </el-header>

        <el-container class="user-detail-inner-container">
            <el-main class="user-detail-inner-container-main">
                <el-row class="user-detail-description">
                    <el-col :span="4">
                        <el-image :src="userInfo.cover_url" fit="fill" class="user-cover"></el-image>
                        <div class="user-share">
                            <svg aria-hidden="true" class="user-icon-share">
                                <use xlink:href="#icon-CatFootprint"></use>
                            </svg>
                            <span>分享到</span>
                            <svg aria-hidden="true" class="user-icon-share">
                                <use xlink:href="#icon-Facebook"></use>
                            </svg>
                            <svg aria-hidden="true" class="user-icon-share">
                                <use xlink:href="#icon-youtube"></use>
                            </svg>
                            <svg aria-hidden="true" class="user-icon-share">
                                <use xlink:href="#icon-twitter"></use>
                            </svg>
                        </div>

                    </el-col>
                    <el-col :span="18" class="user-info">
                        <div>
                            <span class="user-name">{{userInfo.username}}</span>
                        </div>
                        <el-divider></el-divider>
                        <div class="user-detail-block">
                            <span class="user-info-tag">性别 : </span>
                            <span class="user-info-content"> {{ userInfo.sex }}</span>
                        </div>
                        <div class="user-detail-block">
                            <span class="user-info-tag">邮箱 : </span>
                            <span class="user-info-content"> {{ userInfo.mail }}</span>
                        </div>
                        <div class="user-detail-block">
                            <span class="user-info-tag">星座 : </span>
                            <span class="user-info-content"> {{userInfo.constellation}} </span>
                        </div>
                        <div class="user-detail-block">
                            <span class="user-info-tag">出生日期 : </span>
                            <span class="user-info-content"> {{userInfo.birth}}</span>
                        </div>
                        <div class="user-detail-block">
                            <span class="user-info-tag">出生地 : </span>
                            <span class="user-info-content"> {{userInfo.hometown}} </span>
                        </div>
                    </el-col>
                </el-row>

                <el-divider content-position="left" class="user-detail-divider">简介</el-divider>

                <el-row>
                    <span class="user-info-introduction">{{userInfo.introduction}}</span></el-row>

                <el-divider content-position="left">近况</el-divider>
                <el-row class="user-info-resource">
                    <el-col :span="4" v-for="(img,index) in userInfo.photos" :key="index">
                        <el-image :src="img" class="user-recent-img"></el-image>
                    </el-col>
                </el-row>

                <el-divider content-position="left">他的评论</el-divider>
                <el-row class="user-info-resource">

                </el-row>

                <el-divider content-position="left">他的推荐</el-divider>
                <el-menu default-active="1" class="works-sort-menu" mode="horizontal">
                    <el-menu-item index="1">最 近</el-menu-item>
                    <el-menu-item index="2">好 评</el-menu-item>
                    <el-menu-item index="3">逼 格</el-menu-item>
                </el-menu>
                <el-row class="user-info-resource">

                </el-row>

            </el-main>
            <el-aside width="350px" class="celebrity-detail-inner-container-aside">
                <Aside></Aside>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Home from "../../views/Home";
    import Resource from "../../views/Resource";
    import Aside from "../Utils/Aside";

    export default {
        name: "UserDetail",
        components: {Aside},
        props: ['userId', 'user'],
        data() {
            return {
                homeLink: Home,
                resourceLink: Resource,

                userInfo: {
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
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .user-detail-container {
        border-radius: 30px;
        margin-left: 12%;
        margin-right: 12%;
        background-color: $bg_gray_light_global;
        padding-top: 20px;

        .user-detail-container-header {
            font-size: x-large;

            .el-breadcrumb__item {
                font-size: x-large;
            }
        }

        .user-detail-inner-container {

            margin-left: 20px;

            .user-detail-inner-container-main {
                border-radius: 30px;
                background-color: $bg_white_global;

                .user-detail-description {

                    .user-share {
                        display: flex;
                        justify-content: space-evenly;

                        .user-icon-share {
                            height: 25px;
                            width: 25px;
                            cursor: pointer;
                        }
                    }

                    .user-info {
                        margin-left: 20px;
                        text-align: left;

                        .user-name {
                            font-size: xx-large;
                        }

                        .el-divider--horizontal {
                            margin: 10px;
                        }

                        .user-detail-block {
                            margin-bottom: 5px;

                            .user-info-tag {
                                font-weight: bold;
                                font-size: 22px;
                                cursor: default;
                            }

                            .user-info-content {
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

                .user-info-introduction {
                    margin-left: 5px;
                    color: $bg_black_global;
                    font-size: 15px;
                }

                .user-info-resource {
                    margin-bottom: 10%;
                }
                .user-info-awards {
                    text-align: left;

                }
                .user-recent-img {
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
