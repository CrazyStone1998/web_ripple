<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row class="search-header" :gutter="10">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.username" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserBySearch"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table max-height="900px" :data="userList" border stripe>
                <el-table-column label="id"
                                 prop="id"
                                 width="80px"
                                 sortable></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="mail"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="角色"
                                 prop="role.name"
                                 :filters="userRoleFilters"
                                 :filter-method="filterRole"
                                 filter-placement="bottom-end"></el-table-column>
                <el-table-column label="创建" prop="createdDate"></el-table-column>
                <!--<el-table-column label="更新" prop="updatedDate"></el-table-column>-->
                <el-table-column label="状态"
                                 :filters="userStateFilters"
                                 :filter-method="filterState"
                                 filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state"
                                active-color="#36c6d3"
                                disabled>
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeUserById(scope.row.id)"></el-button>
                        <!-- 分配角色按钮 -->
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"
                                       @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="queryParams.pageNum"
                           :page-sizes="[1, 2, 3, 5, 10]"
                           :page-size="queryParams.pageSize"
                           :total="total"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>

        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addUserDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="addForm.mail"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editUserDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="editForm.mail"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="phone">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="editUser">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配角色的对话框 -->
        <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="30%" @close="setRoleDialogClosed">
            <div style="text-align: left; display: inline-block;">
                <p>当前的用户：{{userInfo.username}}</p>
                <p>当前的角色：{{userInfo.role ? userInfo.role.name : null}}</p>
                <p>分配新角色：
                    <el-select v-model="selectedRoleId" placeholder="请选择">
                        <el-option v-for="item in rolesList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AdminUser",
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
            return {

                userRoleFilters: [
                    {
                        text: '普通用户',
                        value: '4'
                    },
                    {
                        text: 'VIP用户',
                        value: '3'
                    },
                    {
                        text: '管理员',
                        value: '2'
                    },
                    {
                        text: '超级管理员',
                        value: '1'
                    },
                ],
                userStateFilters: [
                    {
                        text: '运行',
                        value: '2'
                    },
                    {
                        text: '注销',
                        value: '1'
                    },
                ],

                // 搜索参数
                queryParams: {
                    username: '',
                    // 当前的页数
                    pageNum: 1,
                    // 当前每页显示多少条数据
                    pageSize: 5
                },
                // 搜索返回用户数量
                total: 0,
                // 搜索返回用户列表
                userList: [],

                // 控制添加用户对话框的显示与隐藏
                addDialogVisible: false,

                // 添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    mail: '',
                    phone: ''
                },
                // 添加表单的验证规则对象
                addFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {
                            min: 3,
                            max: 20,
                            message: '用户名的长度在3~20个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {
                            min: 6,
                            max: 50,
                            message: '用户名的长度在6~20个字符之间',
                            trigger: 'blur'
                        }
                    ],
                    mail: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {validator: checkMail, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {validator: checkPhone, trigger: 'blur'}
                    ]
                },

                // 控制修改用户对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},
                // 修改表单的验证规则对象
                editFormRules: {
                    mail: [
                        {required: true, message: '请输入用户邮箱', trigger: 'blur'},
                        {validator: checkMail, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入用户手机', trigger: 'blur'},
                        {validator: checkPhone, trigger: 'blur'}
                    ]
                },

                // 控制分配角色对话框的显示与隐藏
                setRoleDialogVisible: false,
                // 需要被分配角色的用户信息
                userInfo: {},
                // 所有角色的数据列表
                rolesList: [],
                // 已选中的角色Id值
                selectedRoleId: ''
            }
        },
        methods: {

            filterState(value, row) {
                return value === row.state;
            },
            filterRole(value, row) {
                return value === row.role;
            },

            // 获取后台用户列表
            async getUserList() {
                const {data: result} = await this.$http.get(
                    'user/_all',
                    {
                        params: {
                            pageNum: this.queryParams.pageNum,
                            pageSize: this.queryParams.pageSize
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                this.userList = result.data.content;
                console.log(result.data.content);
                this.total = result.data.totalElements;
            },

            // 搜索用户
            async getUserBySearch() {
                if (this.queryParams.username === '') {
                    return this.userList.length > 1 ? this.$message.warning('搜索内容为空') : this.getUserList();
                }
                const {data: result} = await this.$http.get(
                    'user/_username/' + this.queryParams.username,
                );
                if (result.status === 200) {
                    this.userList = [];
                    this.userList.push(result.data);
                    this.total = 1;
                } else {
                    this.userList = [];
                    this.total = 0;
                    return this.$message.error(result.message)
                }
            },

            // 点击按钮，添加新用户
            addUser() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    // 可以发起添加用户的网络请求
                    console.log("admin 添加用户 ======>");
                    console.log(this.addForm);
                    const {data: result} = await this.$http.post('register', this.addForm);

                    if (result.status !== 201) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加用户 成功");
                    // 隐藏添加用户的对话框
                    this.addDialogVisible = false;
                    // 重新获取用户列表数据
                    this.getUserList();
                })
            },

            // 修改用户信息并提交
            editUser() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改用户信息的数据请求
                    const {data: result} = await this.$http.put(
                        'user/' + this.editForm.id,
                        this.editForm
                    );

                    if (result.status !== 200) {
                        return this.$message.error(result.message)
                    }

                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 刷新数据列表
                    this.getUserList();
                    // 提示修改成功
                    this.$message.success(result.message)
                })
            },

            // 展示编辑用户的对话框, 获取用户信息
            async showEditDialog(id) {
                // console.log(id)
                const {data: result} = await this.$http.get('user/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }

                this.editForm = result.data;
                this.editDialogVisible = true
            },

            // 根据Id删除对应的用户信息
            async removeUserById(id) {
                // 弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该用户, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err);
                // 如果用户确认删除，则返回值为字符串 confirm
                // 如果用户取消了删除，则返回值为字符串 cancel
                // console.log(confirmResult)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                const {data: result} = await this.$http.delete('user/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.$message.success(result.message);
                this.getUserList()
            },

            // 展示分配角色的对话框
            async setRole(userInfo) {
                this.userInfo = userInfo;
                // 在展示对话框之前，获取所有角色的列表
                const {data: result} = await this.$http.get(
                    'role/_all',
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 100
                        }
                    }
                );
                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.rolesList = result.data.content;
                this.setRoleDialogVisible = true
            },

            // 点击按钮，分配角色
            async saveRoleInfo() {
                if (!this.selectedRoleId) {
                    return this.$message.error('请选择要分配的角色！')
                }

                const {data: result} = await this.$http.put(
                    `user/${this.userInfo.id}/role/${this.selectedRoleId}`
                );

                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.getUserList();
                this.setRoleDialogVisible = false;
                this.$message.success(result.message);
            },

            // 监听 switch 开关状态的改变
            // async userStateChanged(userInfo) {
            //     const {data: res} = await this.$http.put(
            //         `users/${userInfo.id}/state/${userInfo.mg_state}`
            //     );
            //     if (res.meta.status !== 200) {
            //
            //         userInfo.mg_state = !userInfo.mg_state;
            //         return this.$message.error('更新用户状态失败！');
            //     }
            //     this.$message.success('更新用户状态成功！')
            // },

            // 监听添加用户对话框的关闭事件
            addUserDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 监听修改用户对话框的关闭事件
            editUserDialogClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 监听分配角色对话框的关闭事件
            setRoleDialogClosed() {
                this.selectedRoleId = '';
                this.userInfo = {}
            },
            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                console.log(newSize);
                this.queryParams.pageSize = newSize;
                this.getUserList();
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log(newPage);
                this.queryParams.pageNum = newPage;
                this.getUserList();
            }
        },
        created() {
            this.getUserList();
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";

    .el-card {
        .search-header {
            margin-bottom: 20px;

            ::v-deep .el-button--default:hover {
                background-color: $bg_blue_white_global;
            }
        }

        .el-pagination {
            margin-top: 20px;
        }
    }
</style>