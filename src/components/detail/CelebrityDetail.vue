
<template>
    <el-container class="celebrity-detail-container">
        <el-header class="celebrity-detail-container-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="homeLink">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="resourceLink">资源库</el-breadcrumb-item>
                <el-breadcrumb-item>{{celebrityInfo.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-divider></el-divider>
        </el-header>

        <el-container class="celebrity-detail-inner-container">
            <el-main class="celebrity-detail-inner-container-main">
                <el-row class="celebrity-detail-description">
                    <el-col :span="4">
                        <el-image :src="celebrityInfo.cover_url" fit="fill" class="celebrity-cover"></el-image>
                        <div class="celebrity-share">
                            <svg aria-hidden="true" class="celebrity-icon-share">
                                <use xlink:href="#icon-CatFootprint"></use>
                            </svg>
                            <span>分享到</span>
                            <svg aria-hidden="true" class="celebrity-icon-share">
                                <use xlink:href="#icon-Facebook"></use>
                            </svg>
                            <svg aria-hidden="true" class="celebrity-icon-share">
                                <use xlink:href="#icon-youtube"></use>
                            </svg>
                            <svg aria-hidden="true" class="celebrity-icon-share">
                                <use xlink:href="#icon-twitter"></use>
                            </svg>
                        </div>

                    </el-col>
                    <el-col :span="18" class="celebrity-info">
                        <div>
                            <span class="celebrity-name">{{celebrityInfo.name}} {{celebrityInfo.foreign_name}}</span>
                        </div>
                        <el-divider></el-divider>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">性别 : </span>
                            <span class="celebrity-info-content"> {{ celebrityInfo.sex }}</span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">星座 : </span>
                            <span class="celebrity-info-content"> {{celebrityInfo.constellation}} </span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">工作 : </span>
                            <span class="celebrity-info-content"> {{celebrityInfo.work}} </span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">出生日期 : </span>
                            <span class="celebrity-info-content"> {{celebrityInfo.birth}}</span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">出生地 : </span>
                            <span class="celebrity-info-content"> {{celebrityInfo.hometown}} </span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">豆瓣 : </span>
                            <span class="celebrity-info-content">{{celebrityInfo.douban_link}}</span>
                        </div>
                        <div class="celebrity-detail-block">
                            <span class="celebrity-info-tag">Imdb : </span>
                            <span class="celebrity-info-content">{{celebrityInfo.imdb_link}}</span>
                        </div>
                    </el-col>
                </el-row>

                <el-divider content-position="left" class="celebrity-detail-divider">简介</el-divider>

                <el-row>
                    <span class="celebrity-info-introduction">{{celebrityInfo.introduction}}</span></el-row>

                <el-divider content-position="left">近况</el-divider>
                <el-row class="celebrity-info-resource">
                    <el-col :span="4" v-for="(img,index) in celebrityInfo.photos" :key="index">
                        <el-image :src="img" class="celebrity-recent-img"></el-image>
                    </el-col>
                </el-row>

                <el-divider content-position="left">获奖</el-divider>
                <el-row class="celebrity-info-resource">
                    <div class="celebrity-info-awards" v-for="(prize,index) in celebrityInfo.awards" :key="index">
                        {{prize.date}}-{{prize.name}}-{{prize.prize}}-{{prize.movie}}
                    </div>
                </el-row>

                <el-divider content-position="left">主要作品</el-divider>
                <el-menu default-active="1" class="works-sort-menu" mode="horizontal">
                    <el-menu-item index="1">热 门</el-menu-item>
                    <el-menu-item index="2">最 新</el-menu-item>
                    <el-menu-item index="3">经 典</el-menu-item>
                </el-menu>

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
        name: "CelebrityDetail",
        components: {Aside},
        props: ['id', 'celebrity','genre'],
        data() {
            return {
                homeLink: Home,
                resourceLink: Resource,
                celebrityGenre: ['用户', '演员', '导演', '编剧'],
                celebrityInfo: {
                    name: '小罗伯特·唐尼',
                    foreign_name: 'Robert Downey Jr.',
                    sex: '男',
                    work: this.genre,
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
                    awards: [
                        {
                            date: '2019',
                            name: '第28届MTV电影奖 ',
                            prize: 'MTV电影奖 最佳英雄形象',
                            movie: '复仇者联盟4：终局之战'
                        },
                        {
                            date: '2015',
                            name: ' 第17届美国青少年选择奖',
                            prize: '最佳科幻/奇幻电影男演员(提名)',
                            movie: ' 复仇者联盟2：奥创纪元'
                        },
                        {
                            date: '2014年',
                            name: ' 第23届MTV电影奖 ',
                            prize: ' MTV电影奖 最佳英雄形象(提名) ',
                            movie: ' 钢铁侠3'
                        }
                    ],
                    douban_link: 'https://movie.douban.com/celebrity/1016681/',
                    imdb_link: 'https://www.imdb.com/name/nm0000375'
                },
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .celebrity-detail-container {
        border-radius: 30px;
        margin-left: 12%;
        margin-right: 12%;
        background-color: $bg_gray_light_global;
        padding-top: 20px;

        .celebrity-detail-container-header {
            font-size: x-large;

            .el-breadcrumb__item {
                font-size: x-large;
            }
        }

        .celebrity-detail-inner-container {

            margin-left: 20px;

            .celebrity-detail-inner-container-main {
                border-radius: 30px;
                background-color: $bg_white_global;

                .celebrity-detail-description {

                    .celebrity-share {
                        display: flex;
                        justify-content: space-evenly;

                        .celebrity-icon-share {
                            height: 25px;
                            width: 25px;
                            cursor: pointer;
                        }
                    }

                    .celebrity-info {
                        margin-left: 20px;
                        text-align: left;

                        .celebrity-name {
                            font-size: xx-large;
                        }

                        .el-divider--horizontal {
                            margin: 10px;
                        }

                        .celebrity-detail-block {
                            margin-bottom: 5px;

                            .celebrity-info-tag {
                                font-weight: bold;
                                font-size: 22px;
                                cursor: default;
                            }

                            .celebrity-info-content {
                                font-size: 20px;
                                color: $bg_blue_global;
                                cursor: pointer;
                            }

                            .el-divider--vertical {
                                margin-left: 100px;
                                border-top: 1px dashed $bg_young_global
                            }
                        }
                    }
                }

                .celebrity-info-introduction {
                    margin-left: 5px;
                    color: $bg_black_global;
                    font-size: 15px;
                }

                .celebrity-info-resource {
                    margin-bottom: 10%;
                }
                .celebrity-info-awards {
                    text-align: left;
                    padding-left: 50px;
                }
                .celebrity-recent-img {
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