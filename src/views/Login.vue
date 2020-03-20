<template>
    <el-container>
        <el-main>
            <div class="login_box">
                <el-avatar :size="130" :src="icon"></el-avatar>
                <!--登录表单区域-->
                <el-form ref="login_form_ref" :model="login_form" :rules="login_form_rules" class="login_form">

                    <el-form-item prop="username">
                        <el-input
                                class="account"
                                v-model="login_form.username"
                                prefix-icon="el-icon-user-solid">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                class="password"
                                type="password"
                                v-model="login_form.password"
                                prefix-icon="el-icon-s-goods">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="checked">Remember Me</el-checkbox>
                        <el-link type="primary" class="forget-password">忘记密码?</el-link>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="login"
                                   @keydown.enter.native="login"
                                   icon="el-icon-s-promotion"
                                   type="primary"
                                   class="login_btn">
                            Login
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <svg class="third" aria-hidden="true">
                            <use xlink:href="#icon-google"></use>
                        </svg>
                        <svg class="third" aria-hidden="true">
                            <use xlink:href="#icon-wechat"></use>
                        </svg>
                        <svg class="third" aria-hidden="true">
                            <use xlink:href="#icon-qq"></use>
                        </svg>
                    </el-form-item>
                    <el-form-item>
                        Don't have an account ?
                        <el-link type="primary" @click="redirect_register">Create One !</el-link>
                    </el-form-item>
                    <el-form-item class="customer-login">
                        <el-link type="info" icon="el-icon-user-solid" @click="customer_login">Visitor Login</el-link>
                    </el-form-item>
                </el-form>
            </div>
        </el-main>
        <el-footer>
            <FooterSimple></FooterSimple>
        </el-footer>
    </el-container>
</template>

<script>
    import Register from "./Register";
    import FooterSimple from "../components/home/FooterSimple";
    import Home from "./Home";

    export default {
        name: "Login",
        components: {FooterSimple},
        data() {
            return {
                checked: false,
                icon: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                login_form: {
                    username: "",
                    password: ""
                },
                login_form_rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 6, max: 20, message: "用户名长度为6到20个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 20, message: "密码长度为6到20个字符", trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            login() {
                this.$refs.login_form_ref.validate(async valid => {
                    console.log("********");
                    console.log("user:" + this.login_form.username + " ======> login");
                    if (!valid) { // 校验不通过
                        console.log("登录信息校验失败，请正确填写表格");
                        this.$message.error("登录信息校验失败，请正确填写表格")
                    } else { // 校验通过
                        const {data: result} = await this.$http.post("login", this.login_form);
                        if (result.status === 200) { // 登录成功
                            console.log("登录成功\n Authorization: " + result.data.Authorization);
                            console.log("********");
                            window.sessionStorage.setItem("Authorization", result.data.Authorization);
                            this.$message.success(result.message);

                            // 登录跳转
                            // this.redirect_home(this.login_form.username, result.data.icon);
                            this.redirect_home(this.login_form.username, 'http://tupian.qqw21.com/article/UploadPic/2020-2/2020231257963915.jpg');

                        } else { // 登录失败
                            console.log("登录失败 : " + result.message);
                            console.log("********");
                            this.$message.error(result.message);
                        }
                    }
                });
            },
            redirect_register() {
                this.$router.push(Register);
            },
            redirect_home(username, icon) {
                this.$store.commit('setUser', {
                    username: username,
                    userIcon: icon
                });
                this.$router.push(Home);
            },
            customer_login() {
                this.$router.push(Home);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .el-container {
        height: 100%;
        background-color: $bg_black_global;
        background-image: linear-gradient(to right, $bg_red_black_global, $bg_black_global);

        .el-main {
            display: flex;
            justify-content: space-around;

            .login_box {
                background-color: $bg_white_global;
                width: 23%;
                height: 90%;
                margin-top: 1%;
                border-radius: 20px;
                box-shadow: -18px 18px 15px rgba(255, 255, 255, 0.6);

                .el-avatar {
                    margin-top: 5%;
                    box-shadow: 0 0 1px 2px rgba(0, 0, 255, 0.1);
                }

                .login_form {
                    padding-left: 3%;
                    padding-right: 3%;
                    margin-top: 10%;

                    .account {
                        margin-bottom: 2%;
                    }

                    .password {

                    }

                    .login_btn {
                        width: 100%;
                    }

                    .forget-password {
                        margin-left: 40%;
                    }

                    .third {
                        width: 40px;
                        height: 40px;
                        margin-left: 4%;
                        margin-right: 4%;
                        cursor: pointer;
                    }
                }

                .customer-login {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20%;
                    margin-right: 5%;
                }
            }
        }
    }
</style>