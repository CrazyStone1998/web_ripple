<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row class="search-header" :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getRoleList">
                        <el-button slot="append" icon="el-icon-search" @click="getRoleList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="roleList" border stripe>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-tag class="permission-tag" closable @close="permissionClosed(permission.id,props.row.id)"
                                v-for="(permission,index) in props.row.permissionSet" :key="index">
                            {{permission.name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="id" prop="id" sortable></el-table-column>
                <el-table-column label="name" prop="name"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="状态">
                    <template>
                        <el-switch
                                active-color="#36c6d3">
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
                                   @click="removeRoleById(scope.row.id)"></el-button>
                        <!-- 分配权限按钮 -->
                        <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"
                                       @click="setPermission(scope.row)"></el-button>
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

        <!-- 添加Role的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addRoleDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="80px">
                <el-form-item label="角色" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRole">确 定</el-button>
            </span>
        </el-dialog>

        <!--修改角色的对话框-->
        <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="30%" @close="editObjDialogClosed">
            <el-form :model="editForm" ref="editFormRef" label-width="80">
                <el-form-item label="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="name">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="editRole">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 分配权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync="setRoleDialogVisible" width="40%" @close="setRoleDialogVisible=false">
            <div>
                <el-transfer
                        style="text-align: left; display: inline-block;"
                        v-model="value"
                        :props="{key: 'id',label: 'name'}"
                        :titles="['待分配', '已拥有']"
                        :data="permissionList">
                </el-transfer>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setRoleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePermissionInfo">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "AdminRole",
        data() {
            return {
                value: [],
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
                roleList: [],
                roleId: undefined,
                permissionList: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {
                    name: '',
                    description: '',
                    permissionSet: []
                },
                // 控制修改对象对话框的显示与隐藏
                editDialogVisible: false,
                // 控制修改权限对话框的显示与隐藏
                setRoleDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},

            };
        },
        methods: {
            async getPermissionList() {
                const {data: result} = await this.$http.get(
                    'permission/_all',
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 100
                        }
                    }
                );

                if (result.status === 200) {
                    this.permissionList = result.data.content;
                } else {
                    this.$message.error("获取权限列表失败");
                }
            },
            // 更新角色权限列表
            async savePermissionInfo() {
                const {data: result} = await this.$http.put(
                    'role/' + this.roleId + '/permission',
                    {
                        permissionList: this.value
                    }
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.getRoleList();
                } else {
                    this.$message.error(result.message);
                }
            },
            // 权限标签关闭
            async permissionClosed(permissionId, roleId) {
                console.log(permissionId, roleId);
                const {data: result} = await this.$http.delete(
                    'role/' + roleId + '/permission/' + permissionId
                );
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.getRoleList();
                } else {
                    this.$message.error(result.message);
                }
            },

            // 分配权限
            setPermission(row) {
                for (let i = 0; i < row.permissionSet.length; i++) {
                    this.value.push(row.permissionSet[i].id);
                }
                this.roleId = row.id;
                this.setRoleDialogVisible = true;
            },

            // 获取后台用户列表
            async getRoleList() {
                const {data: result} = await this.$http.get(
                    'role/_all',
                    {
                        params: {
                            pageNum: this.queryParams.pageNum,
                            pageSize: this.queryParams.pageSize
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                this.roleList = result.data.content;
                this.total = result.data.totalElements;
            },

            // 搜索角色
            async getPermissionByName() {
                if (this.queryParams.query === '') {
                    return this.permissionList.length > 0 ? this.$message.warning('搜索内容为空') : this.getPermissionList();
                }
                const {data: result} = await this.$http.get(
                    'permission/_name/' + this.queryParams.query,
                );
                if (result.status === 200) {
                    this.permissionList = [];
                    this.permissionList.push(result.data);
                    this.total = 1;
                } else {
                    this.permissionList = [];
                    this.total = 0;
                    return this.$message.error(result.message)
                }
            },

            // 点击按钮，添加新角色
            addRole() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    // 可以发起添加角色的网络请求
                    console.log("admin 添加角色 ======>");
                    const {data: result} = await this.$http.post('role', this.addForm);

                    if (result.status !== 201) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加角色 成功");
                    // 隐藏添加用户的对话框
                    this.addDialogVisible = false;
                    // 重新获取角色列表数据
                    this.getRoleList();
                })
            },

            // 修改角色信息并提交
            editRole() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改角色信息的数据请求
                    const {data: result} = await this.$http.put(
                        'role/' + this.editForm.id,
                        this.editForm
                    );

                    if (result.status !== 200) {
                        return this.$message.error(result.message)
                    }

                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 刷新数据列表
                    this.getRoleList();
                    // 提示修改成功
                    this.$message.success(result.message)
                })
            },

            // 展示编辑角色的对话框, 获取角色信息
            async showEditDialog(id) {
                console.log(id);
                const {data: result} = await this.$http.get('role/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }

                this.editForm = result.data;
                this.editDialogVisible = true
            },
            // 根据Id删除对应的用户信息
            async removeRoleById(id) {
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
                const {data: result} = await this.$http.delete(`role/${id}`);

                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.$message.success(result.message);
                this.getRoleList();
            },

            // 监听添加角色对话框的关闭事件
            addRoleDialogClosed() {
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
                this.getRoleList();
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log("pageNum: ", newPage);
                this.queryParams.pageNum = newPage;
                this.getRoleList();
            }


        },
        created() {
            this.getRoleList();
            this.getPermissionList();
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

        .permission-tag {
            margin: 10px;
        }
    }
    ::v-deep .el-checkbox-group {
        width: 200px;
    }

</style>