<template>
    <el-container>
        <!--头部区域 -->
        <el-header>
            <div>
                <img class="admin-rio" src="src/assets/img/logo.png" alt=""/>
                <span>Rio后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">Logout</el-button>
        </el-header>

        <!--页面主题区域-->
        <el-container>

            <!--侧边栏-->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">{{(isCollapse) ? "》》":"《《"}}</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#304156" text-color="#fff" active-text-color="#409EFF" unique-opened
                         :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menu_template" :key="item.id">
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="item.icon"></i>
                            <!-- 文本 -->
                            <span class="menu-name">{{item.menu_name}}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="subItem.path" v-for="subItem in item.sub_menu" :key="subItem.sub_id"
                                      @click="saveActivePath(subItem.path)">
                            <template slot="title">
                                <!-- 图标 -->
                                <i :class="subItem.icon"></i>
                                <!-- 文本 -->
                                <span class="menu-name">{{subItem.sub_name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!--右侧内容主题-->
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <div>
                        <p>
                            © 2020              Rio Technologies. All Rights Reserved.
                        </p>
                    </div>
                </el-footer>
            </el-container>

        </el-container>
    </el-container>
</template>

<script>
    import Home from "./Home";

    export default {
        name: "AdminHome",
        data() {
            return {
                activePath: "",
                isCollapse: false,
                menu_template: [
                    {
                        "id": 1,
                        "menu_name": "用 户 管 理",
                        "icon": "el-icon-user-solid",
                        "sub_menu": [
                            {
                                "sub_id": 11,
                                "icon": "el-icon-user",
                                "sub_name": "用户列表",
                                "path": "user",
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "menu_name": "权 限 管 理",
                        "icon": "el-icon-s-tools",
                        "sub_menu": [
                            {
                                "sub_id": 21,
                                "sub_name": "角色列表",
                                "icon": "el-icon-s-check",
                                "path": "role",
                            },
                            {
                                "sub_id": 22,
                                "sub_name": "权限列表",
                                "icon": "el-icon-key",
                                "path": "permission",
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "menu_name": "电 影 管 理",
                        "icon": "el-icon-video-camera-solid",
                        "sub_menu": [
                            {
                                "sub_id": 31,
                                "sub_name": "电影列表",
                                "icon": "el-icon-camera-solid",
                                "path": "movie",
                            },
                            {
                                "sub_id": 32,
                                "sub_name": "类型列表",
                                "icon": "el-icon-s-opportunity",
                                "path": "genre",
                            },
                            {
                                "sub_id": 33,
                                "sub_name": "演员列表",
                                "icon": "el-icon-eleme",
                                "path": "starring",
                            },
                            {
                                "sub_id": 34,
                                "sub_name": "导演编剧",
                                "icon": "el-icon-magic-stick",
                                "path": "directorAndScreenwriter",
                            },

                        ]
                    },
                    {
                        "id": 4,
                        "menu_name": "数 据 统 计",
                        "icon": "el-icon-pie-chart",
                        "sub_menu": [
                            {
                                "sub_id": 41,
                                "sub_name": "统计分析",
                                "icon": "el-icon-stopwatch",
                                "path": "dataStatistic",
                            }
                        ]
                    }
                ]
            };
        },
        methods: {
            logout() {
                console.log("admin ======> logout");
                window.sessionStorage.clear();
                this.$router.push(Home);
                console.log("logout && redirect")
            },
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            saveActivePath(activePath) {
                console.log(activePath);
                this.activePath = activePath;
                window.sessionStorage.setItem("activePath", activePath);

            }
        },
        created() {
            this.activePath = window.sessionStorage.getItem("activePath")
        }

    }
</script>

<style lang="scss" scoped>
    $black_bg_color: rgb(48, 65, 86);
    $white_bg_color: #ffffff;

    .el-container {
        height: 100%;
    }

    .admin-rio {
        height: 40px;
        width: 40px;
    }

    .el-header {
        background-color: $black_bg_color;
        display: flex;
        justify-content: space-between;
        /*padding-left: 0;*/
        align-items: center;
        color: #7491e2;
        font-size: 35px;

        div {
            display: flex;
            align-items: center;

            span {
                margin-left: 20px;
            }
        }
    }

    .el-aside {
        background-color: $black_bg_color;

        .toggle-button {
            color: aquamarine;
            background-color: #4d6183;
            line-height: 24px;
            font-size: 10px;
            text-align: center;
            cursor: pointer;
        }

        .el-menu {
            border-right: 0;
        }

        .el-icon-location {
            margin-right: 10px;
        }

        .menu-name {
            margin-right: 20px;
        }
    }

    .el-main {
        background-color: $white_bg_color;
    }

</style>