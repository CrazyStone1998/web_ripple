<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像 可扩展区域-->
            <div class="avatar_box">
                <img src="src/assets/img/logo.png" alt=""/>
            </div>
            <!--登录表单区域-->
            <el-form ref="login_form_ref" :model="login_form" :rules="login_form_rules" class="login_form">

                <el-form-item class="account" prop="username">
                    <el-input v-model="login_form.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>

                <el-form-item class="password" prop="password">
                    <el-input type="password" v-model="login_form.password" prefix-icon="el-icon-s-goods"></el-input>
                </el-form-item>

                <el-form-item class="form_btn">

                    <el-button icon="el-icon-question" type="info" class="forget_password_btn">Forget</el-button>

                    <el-button @click="login" @keydown.enter.native="login" icon="el-icon-s-promotion" type="primary"
                               class="login_btn">Login
                    </el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Home from "./Home";

    export default {
        name: "Register",
        data() {
            return {
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
                    console.log("************\nuser:" + this.login_form.username + " =====>  login");
                    if (!valid) { // 校验不通过
                        console.log("登录信息校验失败，请正确填写表格");
                        this.$message.error("登录信息校验失败，请正确填写表格")
                    } else { // 校验通过
                        const {data: result} = await this.$http.post("login", this.login_form);
                        if (result.status === 200) { // 登录成功
                            console.log("登录成功\n Authorization: " + result.data.Authorization + "\n************");
                            window.sessionStorage.setItem("Authorization", result.data.Authorization)
                            this.$message.success(result.message);
                            await this.$router.push(Home)
                        } else { // 登录失败
                            console.log("登录失败\n" + result.message + "\n************");
                            this.$message.error(result.message);
                            // console.log(result.message)
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    $lc_bg_color: #409EFF;
    $lb_bg_color: #F2F6FC;

    .login_container {
        height: 100%;
        background-color: $lc_bg_color;
    }

    .login_box {
        width: 450px;
        height: 450px;
        background-color: $lb_bg_color;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 20px $lb_bg_color;

        .avatar_box {
            position: absolute;
            height: 150px;
            width: 150px;
            left: 50%;
            right: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid $lb_bg_color;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px $lb_bg_color;
            background: $lb_bg_color;

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .login_form {
            position: absolute;
            top: 30%;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;

            .account {
                margin-bottom: 50px;
            }
        }

        .form_btn {
            margin-top: 100px;
            display: flex;
            justify-content: flex-end;

            .forget_password_btn {
                margin-right: 160px;

            }
        }
    }
</style>