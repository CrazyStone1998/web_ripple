<template>
    <el-container class="footer-container">
        <el-main>
            <div class="icon-box">
                <div v-for="(icon,index) in icon_list" :key="index"
                     class="icon-span"
                     @mouseover="mouseover($event,'icon-footer-active')"
                     @mouseout="mouseout($event,'icon-footer-active')">
                    <svg
                            aria-hidden="true"
                            class="icon-footer"
                    >
                        <use :xlink:href="icon"></use>
                    </svg>
                </div>

            </div>
            <div class="link-box">
                <el-link v-for="(item,index) in link_list" :key="index"
                         :href="item.link"
                         class="link-share"
                >
                    {{item.tag}}
                    <svg class="icon-share" aria-hidden="true">
                        <use xlink:href="#icon-share-simple"></use>
                    </svg>
                </el-link>

            </div>
            <div class="info-box">
                <el-link v-for="(item,index) in info_list" :key="index"
                         :href="item.link"
                         class="link-share"
                >
                    {{item.tag}}
                    <svg class="icon-share" aria-hidden="true">
                        <use xlink:href="#icon-share-simple"></use>
                    </svg>
                </el-link>
            </div>
            <div class="company-info">
                A growing international public welfare organization. Apache® Apache Tomcat®
            </div>
            <div class="copyright">
                © 2020 Rio Technologies. All Rights Reserved. Inc.
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                icon_list: [
                    "#icon-apple-white",
                    "#icon-google-simple",
                    "#icon-facebook-simple",
                    "#icon-twitter-simple",
                    "#icon-gmail-simple",
                    "#icon-youtube-simple"
                ],
                link_list: [
                    {tag: 'Get the RIO App', link: '/login'},
                    {tag: 'Help', link: ''},
                    {tag: 'Site Index', link: ''},
                    {tag: 'RioPro', link: ''},
                    {tag: 'Sign In', link: ''},
                    {tag: 'Send A Message', link: ''},
                    {tag: 'Press Room', link: ''},
                    {tag: 'Advertising', link: ''}
                ],
                info_list: [
                    {tag: 'Jobs', link: "/login"},
                    {tag: 'Conditions of Use', link: ''},
                    {tag: 'Privacy Policy', link: ''},
                    {tag: 'Interest-Based Ads', link: ''},
                    {tag: 'Company', link: ''},
                ],

            }
        },
        methods: {
            // 监听方法
            mouseover($event, activeClassName) {
                $event.currentTarget.className += " " + activeClassName;
            },
            mouseout($event, activeClassName) {
                $event.currentTarget.className =
                    $event.currentTarget.className.slice(
                        0,
                        $event.currentTarget.className.indexOf(" " + activeClassName)
                    )
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .footer-container {
        margin-top: 2%;
        width: 100%;
        height: 400px;
        color: #eeeeee;
        background-color: $bg_black_global;

        .el-main {
            .icon-box {
                .icon-span {
                    width: 45px;
                    height: 45px;
                    margin-right: 15px;
                    margin-left: 15px;
                    cursor: pointer;
                    display: inline-block;
                }

                .icon-footer {
                    width: 40px;
                    height: 40px;
                }

                .icon-footer-active {
                    border-radius: 40%;
                    background-color: $bg_red_black_global;
                    box-shadow: 0 0 5px 8px rgba(255, 255, 255, 0.5);
                }

            }
            .link-box {
                margin-top: 60px;
            }
            .info-box {
                margin-top: 40px;
            }
            .link-share {
                font-size: x-large;
                color: #FFFFFF;
                margin-left: 25px;
                margin-right: 25px;
            }

            .icon-share {
                width: 10px;
                height: 10px;
            }
            .company-info {
                margin-top: 40px;
                font-size: x-large;
                color: #FFFFFF;
            }
            .copyright {
                margin-top: 40px;
                font-size: large;
                color: $bg_gray_global;
            }
        }
    }
</style>