<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="redirectPath">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getMovieList">
                        <el-button slot="append" icon="el-icon-search" @click="getMovieList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加电影</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="movieList" border stripe>
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="电影" prop="name"></el-table-column>
                <el-table-column label="封面" prop="cover_url">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.cover_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="外名" prop="foreign_name"></el-table-column>
                <el-table-column label="长度" prop="length"></el-table-column>
                <el-table-column label="语言" prop="language"></el-table-column>
                <el-table-column label="地区" prop="area"></el-table-column>
                <el-table-column label="发行" prop="release_date"></el-table-column>
                <el-table-column label="票房" prop="box_office"></el-table-column>
                <el-table-column label="评分" prop="rate"></el-table-column>
                <el-table-column label="人数" prop="votes"></el-table-column>

                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini"
                                   @click="deleteMovieById(scope.row.id)"></el-button>

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

        <!-- 添加电影的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addMovieDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" ref="addFormRef" label-width="150px">
                <el-form-item label="电影" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="外名" prop="foreign_name">
                    <el-input v-model="addForm.foreign_name"></el-input>
                </el-form-item>
                <el-form-item label="海报" prop="cover_url">
                    <el-input v-model="addForm.cover_url"></el-input>
                </el-form-item>
                <el-form-item label="长度" prop="length">
                    <el-input v-model="addForm.length"></el-input>
                </el-form-item>
                <el-form-item label="语言" prop="language">
                    <el-input v-model="addForm.language"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="area">
                    <el-input v-model="addForm.area"></el-input>
                </el-form-item>
                <el-form-item label="发行" prop="release_date">
                    <el-input v-model="addForm.release_date"></el-input>
                </el-form-item>
                <el-form-item label="票房" prop="box_office">
                    <el-input v-model="addForm.box_office"></el-input>
                </el-form-item>
                <el-form-item label="评分" prop="rate">
                    <el-input v-model="addForm.rate"></el-input>
                </el-form-item>
                <el-form-item label="权重" prop="rate_weight">
                    <el-input v-model="addForm.rate_weight"></el-input>
                </el-form-item>
                <el-form-item label="投票" prop="votes">
                    <el-input v-model="addForm.votes"></el-input>
                </el-form-item>

            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMovie">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改电影的对话框 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editMovieDialogClosed">
            <el-form :model="editForm" ref="editFormRef" label-width="70px">
                <el-form-item label="id">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="电影">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="外名">
                    <el-input v-model="editForm.foreign_name"></el-input>
                </el-form-item>
                <el-form-item label="海报">
                    <el-input v-model="editForm.cover_url"></el-input>
                </el-form-item>
                <el-form-item label="长度">
                    <el-input v-model="editForm.length"></el-input>
                </el-form-item>
                <el-form-item label="语言">
                    <el-input v-model="editForm.language"></el-input>
                </el-form-item>
                <el-form-item label="地区">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="发行">
                    <el-input v-model="editForm.release_date"></el-input>
                </el-form-item>
                <el-form-item label="票房">
                    <el-input v-model="editForm.box_office"></el-input>
                </el-form-item>
                <el-form-item label="评分">
                    <el-input v-model="editForm.rate"></el-input>
                </el-form-item>
                <el-form-item label="人数">
                    <el-input v-model="editForm.votes"></el-input>
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="editForm.rate_weight"></el-input>
                </el-form-item>
                <el-form-item label="豆瓣">
                    <el-input v-model="editForm.douban_link"></el-input>
                </el-form-item>
                <el-form-item label="imdb">
                    <el-input v-model="editForm.imdb_link"></el-input>
                </el-form-item>
                <el-form-item label="烂番茄">
                    <el-input v-model="editForm.rottenTomatoes_link"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取 消</el-button>
                 <el-button type="primary" @click="editMovie">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import AdminIndex from "./AdminIndex";

    export default {
        name: "AdminMovie",
        data() {

            return {
                // 面包屑首页重定向
                redirectPath: AdminIndex,
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
                movieList: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {
                    id: '',
                    name: '',
                    foreign_name: '',
                    length: '',
                    language: '',
                    area: '',
                    release_date: '',
                    box_office: '',
                    cover_url: '',
                    rate: '',
                    votes: '',
                    rate_weight: '',
                    douban_link: '',
                    imdb_link: '',
                    rottenTomatoes_link: ''
                },
                // 控制修改对象对话框的显示与隐藏
                editDialogVisible: false,
                // 查询到的用户信息对象
                editForm: {},

            };
        },
        methods: {
            // 获取后台电影列表
            async getMovieList() {
                const {data: result} = await this.$http.get(
                    'movie/_all',
                    {
                        params: {
                            pageNum: this.queryParams.pageNum,
                            pageSize: this.queryParams.pageSize
                        }
                    });
                if (result.status === 200) {
                    this.$message.success(result.message);
                    this.movieList = result.data.content;
                    this.total = result.data.totalElements;
                } else {
                    this.$message.error(result.message)
                }
            },
            // 点击按钮，添加新电影
            addMovie() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return;
                    // 可以发起添加电影的网络请求
                    console.log("admin 添加电影 ======>");
                    console.log(this.addForm);
                    const {data: result} = await this.$http.post('movie', this.addForm);

                    if (result.status !== 200) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加电影 成功");
                    // 隐藏添加电影的对话框
                    this.addDialogVisible = false;
                    // 重新获取电影列表数据
                    this.getMovieList();
                })
            },
            // 修改电影信息并提交
            editMovie() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return;
                    // 发起修改电影信息的数据请求
                    const {data: result} = await this.$http.put(
                        'movie/' + this.editForm.id,
                        this.editForm
                    );

                    if (result.status !== 200) {
                        return this.$message.error(result.message)
                    }

                    // 关闭对话框
                    this.editDialogVisible = false;
                    // 刷新数据列表
                    this.getMovieList();
                    // 提示修改成功
                    this.$message.success(result.message)
                });
            },
            // 展示编辑用户的对话框, 获取电影信息
            async showEditDialog(id) {
                // console.log(id)
                const {data: result} = await this.$http.get('movie/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }

                this.editForm = result.data;
                this.editDialogVisible = true
            },
            // 根据Id删除对应的电影信息
            async deleteMovieById(id) {
                // 弹框询问用户是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该电影, 是否继续?',
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
                const {data: result} = await this.$http.delete('movie/' + id);

                if (result.status !== 200) {
                    return this.$message.error(result.message);
                }
                this.$message.success(result.message);
                this.getMovieList()
            },

            // 监听添电影对话框的关闭事件
            addMovieDialogClosed() {
                this.$refs.addFormRef.resetFields();
            },
            // 监听修改电影对话框的关闭事件
            editMovieDialogClosed() {
                this.$refs.editFormRef.resetFields();
            },
            // 监听 pageSize 改变的事件
            handleSizeChange(newSize) {
                console.log("pageSize: ", newSize);
                this.queryParams.pageSize = newSize;
                this.getMovieList();
            },
            // 监听 pageNum 改变的事件
            handleCurrentChange(newPage) {
                console.log("pageNum: ", newPage);
                this.queryParams.pageNum = newPage;
                this.getMovieList();
            }
        },
        created() {
            this.getMovieList();
        }

    }
</script>

<style lang="scss" scoped>


</style>