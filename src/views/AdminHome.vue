<template>
    <el-container>
        <!--头部区域 -->
        <el-header>
            <div>
                <el-image class="logo-img" :src="require('../assets/img/logo.png')"></el-image>
                <el-image class="rio-img" :src="require('../assets/img/rio.png')"></el-image>
                <span>后台管理系统</span>
            </div>
            <div>
                <svg class="admin-icon" aria-hidden="true">
                    <use xlink:href="#icon-apple-white"></use>
                </svg>
                <el-button type="success" @click="logout">Logout</el-button>
            </div>
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
                                      @click="saveActivePath(subItem.path,item.menu_name,subItem.sub_name)">
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
                    <!-- 面包屑导航区域 -->
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="redirectPath" @click.native="redirect_admin_index">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{menuName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{subMenu}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <FooterSimple></FooterSimple>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import FooterSimple from "../components/home/FooterSimple";
    import {mapState} from "vuex";
    import Login from "./Login";
    import AdminIndex from "../components/admin/AdminIndex";

    export default {
        name: "AdminHome",
        components: {FooterSimple},
        data() {
            return {
                activePath: "index",
                isCollapse: false,
                // 面包屑首页重定向
                redirectPath: AdminIndex,
                menuName: '',
                subMenu: '',

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
                this.$router.push(Login);
                console.log("logout && redirect")
            },
            redirect_admin_index() {
                this.activePath = '';
                this.menuName = '';
                this.subMenu = '';
            },
            toggleCollapse() {
                this.isCollapse = !this.isCollapse;
            },
            saveActivePath(activePath,menu_name,sub_menu) {
                this.menuName = menu_name;
                this.subMenu = sub_menu;
                this.activePath = activePath;
                window.sessionStorage.setItem("activePath", activePath);
                window.sessionStorage.setItem("menuName", menu_name);
                window.sessionStorage.setItem("subMenu", sub_menu);
            }
        },
        computed: mapState({
            username: "userIcon",
            userIcon: "userIcon"
        }),
        created() {
            this.activePath = window.sessionStorage.getItem("activePath")
            this.menuName = window.sessionStorage.getItem("menuName");
            this.subMenu = window.sessionStorage.getItem("subMenu");

        }

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .el-container {
        height: 100%;
        background-color: $bg_gray_light_global;

        .el-header {
            display: flex;
            justify-content: space-between;
            background-color: $bg_black_global;

            /*padding-left: 0;*/
            align-items: center;
            color: #7491e2;
            font-size: 35px;

            div {
                display: flex;
                align-items: center;

                .logo-img {
                    height: 60px;
                    width: 60px;
                    cursor: pointer;
                }

                .rio-img {
                    height: 50px;
                    width: 120px;
                    cursor: pointer;
                }

                span {
                    margin-left: 20px;
                }

                .admin-icon {
                    height: 50px;
                    width: 120px;
                    cursor: pointer;
                }
            }
        }

        .el-aside {
            background-color: #304156;

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

        .el-breadcrumb {
            cursor: pointer;
            font-size: large;
            margin-bottom: 20px;
        }

    }

</style>