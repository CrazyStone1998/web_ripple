<template>
    <div class="login_container">
        <div class="login_box">
            <!--头像 可扩展区域-->
            <div class="avatar_box">
                <img src="src/assets/img/logo.png" alt=""/>
            </div>
            <!--登录表单区域-->

            <el-form ref="loginFormRef" :model="registerForm" :rules="loginFormRules" class="login_form">
                <el-form-item class="account" prop="username">
                    <el-input
                            placeholder="用户名"
                            v-model="registerForm.username"
                            prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <el-form-item class="password" prop="password">
                    <el-input
                            type="password"
                            placeholder="密码"
                            v-model="registerForm.password"
                            prefix-icon="el-icon-s-goods">
                    </el-input>
                </el-form-item>
                <el-form-item class="checkPassword" prop="doublePassword">
                    <el-input
                            type="password"
                            placeholder="确认密码"
                            v-model="registerForm.doublePassword"
                            prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <el-form-item class="phone" prop="phone">
                    <el-input
                            placeholder="电话号码"
                            v-model="registerForm.phone"
                            prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <el-form-item class="mail" prop="mail">
                    <el-input
                            placeholder="邮箱"
                            v-model="registerForm.mail"
                            prefix-icon="el-icon-user-solid">
                    </el-input>
                </el-form-item>
                <el-form-item class="form_btn">
                    <el-button @click="login" icon="el-icon-s-promotion" type="primary" class="login_btn">Login</el-button>
                    <el-button icon="el-icon-info" type="success" class="register_btn" @click="register">Register</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Login from "./Login";

    export default {
        name: "Register",
        data() {
            // 验证邮箱的规则
            const checkMail = (rule, value, callback) => {
                // 验证邮箱的正则表达式
                const regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

                if (regMail.test(value)) {
                    // 合法的邮箱
                    return callback()
                }
                callback(new Error('请输入合法的邮箱'))
            };
            // 验证手机号的规则
            const checkPhone = (rule, value, callback) => {
                // 验证手机号的正则表达式
                const regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if (regPhone.test(value)) {
                    return callback()
                }
                callback(new Error('请输入合法的手机号'))
            };
            // 验证确认密码
            const checkThePassword = (rule, value, callback) => {
                console.log('********************');
                if (this.registerForm.password === this.registerForm.doublePassword) {
                    return callback();
                }
                return callback(new Error("请确认密码"))
            };
            return {
                registerForm: {
                    doublePassword: "",
                    username: "",
                    password: "",
                    mail: "",
                    phone: "",
                },
                loginFormRules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"},
                        {min: 6, max: 20, message: "用户名长度为6到20个字符", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 6, max: 20, message: "密码长度为6到20个字符", trigger: "blur"}
                    ],
                    doublePassword: [
                        {required: true, message: "请输入确认密码", trigger: "blur"},
                        {min: 6, max: 20, message: "密码长度为6到20个字符", trigger: "blur"},
                        {validator: checkThePassword, trigger: "blur"}
                    ],
                    mail: [
                        {required: true, message: "请输入邮箱", trigger: "blur"},
                        {validator: checkMail, trigger: "blur"}
                    ],
                    phone: [
                        {required: true, message: "请输入电话", trigger: "blur"},
                        {validator: checkPhone, trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            register() {
                console.log(this.$refs);
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) { // 校验不通过
                        console.log("注册信息校验失败，请正确填写表格");
                        this.$message.error("注册信息校验失败，请正确填写表格")
                    } else { // 校验通过
                        const {data: result} = await this.$http.post("register", this.registerForm);
                        if (result.status === 200) { // 登录成功
                            console.log("注册成功");
                            this.$message.success(result.message);
                            await this.$router.push(Login)
                        } else { // 登录失败
                            console.log("注册失败\n" + result.message + "\n************");
                            this.$message.error(result.message);
                            // console.log(result.message)
                        }
                    }
                });
            },
            login() {
                this.$router.push(Login)
            }
        }
    }
</script>

<style lang="scss" scoped>
    $lc_bg_color: rgba(83, 97, 107, 0.96);
    .login_container {
        height: 100%;
        background-color: $lc_bg_color;
    }

    $lb_bg_color: #F2F6FC;
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
            padding: 30px;

            .register_btn {
                margin-left: 150px;
                margin-top: 30px;
            }
        }
    }
</style>