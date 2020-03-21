<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row class="search-header" :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getStarringList">
                        <el-button slot="append" icon="el-icon-search" @click="getStarringList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加演员</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="starringList" border stripe>
                <el-table-column label="id" prop="id" sortable></el-table-column>
                <el-table-column label="演员" prop="name"></el-table-column>
                <el-table-column label="外名" prop="foreign_name"></el-table-column>
                <el-table-column label="海报" prop="cover_url"></el-table-column>
                <el-table-column label="豆瓣" prop="douban_link"></el-table-column>
                <el-table-column label="imdb" prop="imdb_link"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeStarringById(scope.row.id)"></el-button>
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
        <el-dialog title="添加演员" :visible.sync="addDialogVisible" width="30%" @close="addObjDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="80px">
                <el-form-item label="演员" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="外名" prop="foreign_name">
                    <el-input v-model="addForm.foreign_name"></el-input>
                </el-form-item>
                <el-form-item label="海报" prop="cover_url">
                    <el-input v-model="addForm.cover_url"></el-input>
                </el-form-item>
                <el-form-item label="豆瓣" prop="douban_link">
                    <el-input v-model="addForm.douban_link"></el-input>
                </el-form-item>
                <el-form-item label="imdb" prop="imdb_link">
                    <el-input v-model="addForm.imdb_link"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStarring">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改用户的对话框 -->
        <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%" @close="editStarringDialogClosed">
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="演员">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="外名">
                    <el-input v-model="editForm.foreign_name"></el-input>
                </el-form-item>
                <el-form-item label="海报">
                    <el-input v-model="editForm.cover_url"></el-input>
                </el-form-item>
                <el-form-item label="豆瓣">
                    <el-input v-model="editForm.douban_link"></el-input>
                </el-form-item>
                <el-form-item label="imdb">
                    <el-input v-model="editForm.imdb_link"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="editStarring">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>

    export default {
        name: "AdminStarring",
        data() {

            return {

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
                starringList: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {
                    name: '',
                    foreign_name: '',
                    cover_url: '',
                    douban_link: '',
                    imdb_link: ''
                },
                // 控制修改对象对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},

            };
        },
        methods:{

            // 获取后台用户列表
            async getStarringList() {
                const {data: result} = await this.$http.get(
                    'starring/_all',
                    {
                        params: {
                            pageNum: this.queryParams.pageNum,
                            pageSize: this.queryParams.pageSize
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                this.starringList = result.data.content;
                this.total = result.data.totalElements;
            },
            // 点击按钮，添加新用户
            addStarring() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    // 可以发起添加用户的网络请求
                    console.log("admin 添加演员 ======>");
                    console.log(this.addForm);
                    const {data: result} = await this.$http.post('starring', this.addForm);

                    if (result.status !== 200) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加演员 成功");
                    // 隐藏添加用户的对话框
                    this.addDialogVisible = false;
                    // 重新获取用户列表数据
                    this.getStarringList();
                })
            },
            // 修改用户信息并提交
            editStarring() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改演员信息的数据请求
                    const {data: result} = await this.$http.put(
                        'starring/' + this.editForm.id,
                        this.editForm
                    );

                    if (result.status !== 200) {
                        return this.$message.error(result.message)
                    }

                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 刷新数据列表
                    this.getStarringList();
                    // 提示修改成功
                    this.$message.success(result.message)
                })
            },
            // 展示编辑演员的对话框, 获取演员信息
            async showEditDialog(id) {
                // console.log(id)
                const {data: result} = await this.$http.get('starring/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }

                this.editForm = result.data;
                this.editDialogVisible = true
            },
            // 根据Id删除对应的演员信息
            async removeStarringById(id) {
                // 弹框询问演员是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该演员, 是否继续?',
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
                const {data: result} = await this.$http.delete('starring/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.$message.success(result.message);
                this.getStarringList();
            },

            // 监听添加用户对话框的关闭事件
            addObjDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 监听修改用户对话框的关闭事件
            editStarringDialogClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                console.log("pageSize: ", newSize);
                this.queryParams.pageSize = newSize;
                this.getStarringList();
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log("pageNum: ", newPage);
                this.queryParams.pageNum = newPage;
                this.getStarringList();
            }

        },
        created() {
            this.getStarringList();
        }

    }
</script>

<style lang="scss" scoped>
    @import "src/assets/sass/global";
    .el-card {
        .search-header {
            margin-bottom: 20px;
            ::v-deep .el-button--default:hover{
                background-color: $bg_blue_white_global;
            }
        }
        .el-pagination {
            margin-top: 20px;
        }
    }

</style>