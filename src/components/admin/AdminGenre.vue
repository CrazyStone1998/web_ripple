<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row class="search-header" :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getGenreList">
                        <el-button slot="append" icon="el-icon-search" @click="getGenreList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加类型</el-button>
                </el-col>
            </el-row>
            <!-- 类型列表区域 -->
            <el-table :data="genreList" border stripe>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="类型" prop="name"></el-table-column>
                <el-table-column label="描述" prop="description"></el-table-column>
                <el-table-column label="创建" prop="createdDate"></el-table-column>
                <el-table-column label="更新" prop="updatedDate"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="removeGenreById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="queryParams.pageNum" :page-sizes="[1, 2, 3, 5, 10]"
                           :page-size="queryParams.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 添加用户的对话框 -->
        <el-dialog title="添加类型" :visible.sync="addDialogVisible" width="20%" @close="addGenreDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="80px">
                <el-form-item label="类型" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addGenre">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改类型的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="20%" @close="editGenreDialogClosed">
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="mail">
                    <el-input v-model="editForm.description"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="editGenre">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>

    export default {
        name: "AdminGenre",
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
                // 搜索返回类型数量
                total: 0,
                // 搜索返回类型列表
                genreList: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {
                    name: "",
                    description: ""
                },
                // 控制修改对象对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的类型信息对象
                editForm: {},

            };
        },
        methods:{

            // 获取类型列表
            async getGenreList() {
                const {data: result} = await this.$http.get(
                    'genre/_all',
                    {
                        params: {
                            pageNum: this.queryParams.pageNum,
                            pageSize: this.queryParams.pageSize
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                this.genreList = result.data.content;
                this.total = result.data.totalElements;
            },
            // 点击按钮，添加新类型
            addGenre() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    // 可以发起添加用户的网络请求
                    console.log("admin 添加类型 ======>");
                    console.log(this.addForm);
                    const {data: result} = await this.$http.post('genre', this.addForm);

                    if (result.status !== 200) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加类型 成功");
                    // 隐藏添加用户的对话框
                    this.addDialogVisible = false;
                    // 重新获取用户列表数据
                    this.getGenreList();
                })
            },
            // 修改类型信息并提交
            editGenre() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改用户信息的数据请求
                    const {data: result} = await this.$http.put(
                        'genre/' + this.editForm.id,
                        this.editForm
                    );

                    if (result.status !== 200) {
                        return this.$message.error(result.message)
                    }

                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 刷新数据列表
                    this.getGenreList();
                    // 提示修改成功
                    this.$message.success(result.message)
                })
            },
            // 展示编辑类型的对话框, 获取类型信息
            async showEditDialog(id) {
                // console.log(id)
                const {data: result} = await this.$http.get('genre/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }

                this.editForm = result.data;
                this.editDialogVisible = true
            },
            // 根据Id删除对应的类型信息
            async removeGenreById(id) {
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
                this.getGenreList()
            },

            // 监听添加类型对话框的关闭事件
            addGenreDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 监听修改类型对话框的关闭事件
            editGenreDialogClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                console.log("pageSize: ", newSize);
                this.queryParams.pageSize = newSize;
                this.getGenreList();
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log("pageNum: ", newPage);
                this.queryParams.pageNum = newPage;
                this.getGenreList();
            }

        },
        created() {
            this.getGenreList();
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