<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="redirectPath">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>类型列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getObjList">
                        <el-button slot="append" icon="el-icon-search" @click="getObjList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="邮箱" prop="mail"></el-table-column>
                <el-table-column label="电话" prop="phone"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.state"
                                active-color="#36c6d3"
                                @change="userStateChanged($event,scope.row)">
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
                                       @click="setRole(scope.role)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="queryParams.pageNum" :page-sizes="[1, 2, 5, 10]"
                           :page-size="queryParams.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addObjDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="150px">
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
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editObjDialogClosed">
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


    </div>
</template>

<script>
    export default {
        name: "Template",
        data() {

            return {
                // 面包屑首页重定向
                redirectPath: "",
                // 搜索参数
                queryParams: {
                    query: '',
                    // 当前的页数
                    pageNum: 1,
                    // 当前每页显示多少条数据
                    pageSize: 2
                },
                // 搜索返回用户数量
                total: 0,
                // 搜索返回用户列表
                ObjList: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {

                },
                // 控制修改对象对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},

            };
        },
        methods:{

            // 获取后台用户列表
            async getObjList() {
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
                this.total = result.data.totalElements;
            },
            // 点击按钮，添加新用户
            addObj() {
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
            editObj() {
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
            async removeObjById(id) {
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

            // 监听添加用户对话框的关闭事件
            addObjDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 监听修改用户对话框的关闭事件
            editObjDialogClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                console.log("pageSize: ", newSize);
                this.queryParams.pageSize = newSize;
                this.getUserList();
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log("pageNum: ", newPage);
                this.queryParams.pageNum = newPage;
                this.getUserList();
            }

        },
        created() {
            this.getObjList();
        }

    }
</script>

<style lang="scss" scoped>


</style>