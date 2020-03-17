<template>
    <el-container class="query-container">
        <el-main class="query-container-main">
            <el-row class="query-category" v-for="(item,index) in categoryList" :key="index">

                <el-col :span="6" class="query-topic-col">
                    <svg aria-hidden="true" class="icon-topic">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                    <el-tag class="query-topic">{{item.topic}}>>></el-tag>
                </el-col>
                <el-col :span="2" class="allPick-col">
                    <el-checkbox-button v-model="allPick[index]">
                        <span>全部</span>
                    </el-checkbox-button>
                </el-col>
                <el-col :span="18" class="category-list-col">
                    <el-checkbox-group v-model="item.picks" class="category-checkbox">
                        <el-checkbox-button class="btn-category-tag" v-for="(sub_item,index) in item.tags"
                                            :label="sub_item" :key="index">
                            <span class="span-category-tag">{{sub_item}}</span>
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-col>
            </el-row>

            <el-row class="query-rate">
                <el-col :span="6" class="query-rate-col">
                    <svg aria-hidden="true" class="icon-topic">
                        <use xlink:href="#icon-good"></use>
                    </svg>
                    <el-tag class="query-topic">评分>>></el-tag>
                </el-col>
                <el-col :span="10" class="rate-slide-col">
                    <div class="block">
                        <el-slider
                                v-model="ratePick"
                                range
                                :marks="marks"
                                :max="10"
                        >
                        </el-slider>
                    </div>
                </el-col>
            </el-row>

            <el-divider class="category-divider"></el-divider>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Category",
        data() {
            return {
                categoryList: [
                    {
                        icon: '#icon-fenlei-copy',
                        topic: '类型',
                        tags: [
                            '剧情', '爱情', '犯罪', '奇幻', '动作', '冒险', '家庭', '音乐', '西部', '记录',
                            '短片', '色情', '戏剧', '惊悚', '恐怖', '历史', '运动', '黑色', '神秘', '战争'
                        ],
                        picks: []
                    },
                    {
                        icon: '#icon-date',
                        topic: '地区',
                        tags: ['中国', '美国', '韩国', '日本', '印度', '法国', '德国', '泰国', '英国', '俄罗斯'],
                        picks: []
                    },
                    {
                        icon: '#icon-area_fill',
                        topic: '日期',
                        tags: ['2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '>'],
                        picks: []
                    }
                ],
                allPick: [false, true, false],

                ratePick: [5, 10],
                marks: {
                    0: '0',
                    1: '1',
                    2: '2',
                    3: '3',
                    4: '4',
                    5: '5',
                    6: '6',
                    7: '7',
                    8: '8',
                    9: '9',
                    10: '10',
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .query-container {
        background-color: rgba(179,179,179,0.3);
        border-radius: 30px;
        height: 40%;
        .icon-topic {
            width: 20px;
            height: 20px;
        }

        .query-topic {
            margin-top: 5px;
            border-color: transparent;
            background-color: transparent;
            font-size: x-large;
            color: $bg_black_global;
        }

        .query-category {
            display: flex;
            margin-bottom: 15px;

            .query-topic-col {
                margin-right: -5%;
            }

            .allPick-col {
                margin-top: 3px;
                display: flex;
                justify-content: flex-start;

            }

            .category-list-col {
                display: flex;
                justify-content: flex-start;
                margin-left: 1%;

                .category-checkbox {
                    margin-right: 40px;

                    .btn-category-tag {
                        margin: 3px;
                    }

                    .span-category-tag {
                        margin-left: 2px;
                        margin-right: 2px;
                    }
                }
            }
        }

        .query-rate {
            margin-left: -5px;

            .rate-slide-col {
                margin-left: -5%;
            }
        }
        .el-divider--horizontal {
            margin-bottom: 0;
        }
    }
</style>