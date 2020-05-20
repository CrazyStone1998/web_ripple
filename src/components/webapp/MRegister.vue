<template>
    <div class="register-container">
        <!--上传头像-->
        <el-upload
                class="avatar-uploader"
                ref="upload"
                list-type="picture"
                :action="oss_url"
                :data="oss_data"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <el-image v-if="icon_url" :src="icon_url" class="avatar"></el-image>
            <svg v-else class="avatar-icon" aria-hidden="true">
                <use xlink:href="#icon-icon-admin-img"></use>
            </svg>
        </el-upload>
        <!--注册区域-->
        <el-form class="register-form" ref="registerRef" :model="registerForm" :rules="registerFormRules">
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
            <el-form-item>
                <el-checkbox v-model="agree">I agree to the</el-checkbox>
                <el-link type="primary" class="policy">Terms and Conditions</el-link>
            </el-form-item>
            <el-form-item class="form_btn">
                <el-button
                        icon="el-icon-info"
                        type="success"
                        class="register_btn"
                        @click="register">
                    Register
                </el-button>
            </el-form-item>
            <el-form-item>
                Already have an account ?
                <el-link type="primary" @click="redirect_login">Sign in !</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MLogin from "./MLogin";
    import Mobile from "../../views/Mobile";

    export default {
        name: "MRegister",
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
                // Oss上传
                oss_data: {
                    policy: '',
                    signature: '',
                    key: '',
                    ossaccessKeyId: '',
                    dir: '',
                    host: ''
                },
                oss_url: 'http://landyaos.oss-cn-beijing.aliyuncs.com/',
                // 头像地址
                icon_url: "",
                // 同意政策
                agree: false,
                registerForm: {
                    doublePassword: "",
                    username: "",
                    password: "",
                    mail: "",
                    phone: "",
                    icon: "",
                },
                registerFormRules: {
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
                console.log("********");
                console.log(this.registerForm.username, " 注册用户");
                this.$refs.registerRef.validate(async valid => {
                    if (!valid) { // 校验不通过
                        console.log("注册信息校验失败，请正确填写表格");
                        this.$message.error("注册信息校验失败，请正确填写表格")
                    } else { // 校验通过
                        const {data: result} = await this.$http.post("register", this.registerForm);
                        if (result.status === 200) { // 登录成功
                            this.$message.success(result.message);
                            console.log(result.message);
                            console.log("********");

                            // 跳转首页
                            this.redirect_home(this.registerForm.username, this.registerForm.icon);
                        } else { // 登录失败
                            this.$message.error(result.message);
                            console.log(result.message);
                            console.log("********");
                        }

                    }
                });
            },
            redirect_login() {
                this.$router.push(MLogin);
            },
            redirect_home(username, icon) {
                this.$store.commit('setUsername', {
                    username: username,
                    userIcon: icon
                });
                this.$router.push(Mobile);
            },
            handleAvatarSuccess(res, file) {
                this.icon_url = URL.createObjectURL(file.raw);
            },
            // handleAvatarSuccess() {
            //
            // },
            async beforeAvatarUpload(file) {
                // this.icon_url = URL.createObjectURL(file.raw);
                this.registerForm.icon = "https://landyaos.oss-cn-beijing.aliyuncs.com/avatar/" + file.name;
                const {data: result} = await this.$http.get("aliyun/oss/policy");
                if (result.status === 200) { // 登录成功
                    this.$message.success(result.message);
                    this.oss_data.policy = result.data.policy;
                    this.oss_data.signature = result.data.signature;
                    this.oss_data.ossaccessKeyId = result.data.accessKeyId;
                    this.oss_data.key = result.data.dir + '/${filename}';
                    this.oss_data.dir = result.data.dir;
                    this.oss_data.host = result.data.host;
                    console.log(this.oss_data);
                    return true;
                } else { // 登录失败
                    this.$message.error(result.message);
                    console.log(result.message);
                    console.log("********");
                    return false;
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";


    .register-container {
        background-color: $bg_white_global;
        margin-top: 1%;
        border-radius: 20px;
        box-shadow: -2px 2px 25px 2px rgba(255, 255, 255, 0.8);

        .register-form {
            padding-left: 4%;
            padding-right: 4%;
        }

        .avatar-uploader .el-upload {
            border: 10px #d9222f;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar {
            width: 150px;
            height: 150px;
            display: block;
            border-radius: 50%;
            margin-bottom: 5px;

        }

        .policy {
            margin-left: 3%;
        }

        .register_btn {
            width: 100%;
        }

    }
</style>