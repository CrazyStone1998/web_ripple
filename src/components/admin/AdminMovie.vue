<template>
    <div>
        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row class="search-header" :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryParams.query" clearable @clear="getMovieList">
                        <el-button slot="append" icon="el-icon-search" @click="getMovieByName"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisibleChange">添加电影</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="movieList" border stripe>
                <el-table-column label="详细" type="expand">
                    <template slot-scope="props">
                        <el-row class="movie-detail-description">
                            <el-col :span="4">
                                <el-image class="movie-detail-cover" :src="props.row.cover_url" fit="fill"></el-image>
                                <div class="movie-detail-share">
                                    <svg aria-hidden="true" class="movie-detail-icon-share">
                                        <use xlink:href="#icon-CatFootprint"></use>
                                    </svg>
                                    <span>分享到</span>
                                    <svg aria-hidden="true" class="movie-detail-icon-share">
                                        <use xlink:href="#icon-Facebook"></use>
                                    </svg>
                                    <svg aria-hidden="true" class="movie-detail-icon-share">
                                        <use xlink:href="#icon-youtube"></use>
                                    </svg>
                                    <svg aria-hidden="true" class="movie-detail-icon-share">
                                        <use xlink:href="#icon-twitter"></use>
                                    </svg>
                                </div>

                            </el-col>
                            <el-col :span="18" class="movie-detail-info">
                                <div>
                                    <span class="movie-detail-title">{{props.row.foreign_name}}</span>
                                </div>
                                <el-divider></el-divider>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">导演 : </span>
                                    <span class="movie-detail-tag-content" v-for="(item,index) in props.row.directorSet"
                                          :key="index">
                                {{item.name}}
                            </span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">编剧 : </span>
                                    <span class="movie-detail-tag-content"
                                          v-for="(item,index) in props.row.screenwriterSet"
                                          :key="index">
                                {{item.name}}
                            </span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">演员 : </span>
                                    <span class="movie-detail-tag-content" v-for="(item,index) in props.row.starringSet"
                                          :key="index">
                                {{item.name}}
                            </span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">类型 : </span>
                                    <span class="movie-detail-tag-content" v-for="(item,index) in props.row.genreSet"
                                          :key="index">
                                {{item.name}}
                            </span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">发行 : </span>
                                    <span class="movie-detail-tag-content"> {{props.row.release_date}}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="movie-detail-tag">时长 : </span>
                                    <span class="movie-detail-tag-content"> {{props.row.length}}</span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">语言 : </span>
                                    <span class="movie-detail-tag-content"> {{props.row.language}}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="movie-detail-tag">地区 : </span>
                                    <span class="movie-detail-tag-content"> {{props.row.area}}</span>
                                </div>
                                <div class="movie-detail-block">
                                    <span class="movie-detail-tag">评分人数 : </span>
                                    <span class="movie-detail-tag-content">{{props.row.votes}}</span>
                                </div>
                                <div class="movie-detail-block">
                                    <el-rate
                                            v-model="props.row.rate"
                                            disabled
                                            show-score
                                            :max="10"
                                            text-color="#ff9900"
                                            score-template="{value}">
                                    </el-rate>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="id" prop="id" sortable width="60px"></el-table-column>
                <el-table-column align="center" label="电影" prop="name"></el-table-column>
                <!--<el-table-column align="center" label="封面" prop="cover_url">-->
                <!--    <template slot-scope="scope">-->
                <!--        <el-image :src="scope.row.cover_url"></el-image>-->
                <!--    </template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" label="外名" prop="foreign_name"></el-table-column>-->
                <!--<el-table-column align="center" label="长度" prop="length"></el-table-column>-->
                <!--<el-table-column align="center" label="语言" prop="language"></el-table-column>-->
                <!--<el-table-column align="center" label="地区" prop="area"></el-table-column>-->
                <el-table-column align="center" label="票房" prop="box_office"></el-table-column>
                <el-table-column align="center" label="评分" prop="rate"></el-table-column>
                <el-table-column align="center" label="人数" prop="votes"></el-table-column>
                <el-table-column align="center" label="发行" prop="release_date"></el-table-column>

                <el-table-column align="center" label="操作" width="200px">
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
            <el-steps class="edit-step" :active="addActive" finish-status="success" simple>
                <el-step title="步骤 1" @click.native="addActive=0" style="cursor: pointer"></el-step>
                <el-step title="步骤 2" @click.native="addActive=1" style="cursor: pointer"></el-step>
                <el-step title="步骤 3" @click.native="addActive=2" style="cursor: pointer"></el-step>
            </el-steps>

            <el-row class="edit-content" v-if="addActive === 0">
                <el-col :span="8">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <el-image v-if="addForm.cover_url" :src="addForm.cover_url"></el-image>
                        <svg v-else class="avatar-icon" aria-hidden="true">
                            <use xlink:href="#icon-shangchuantouxiang"></use>
                        </svg>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="16">
                    <!-- 内容主体区域 -->
                    <el-form :model="addForm" ref="addFormRef" label-width="100px">
                        <el-form-item label="电影" prop="name">
                            <el-input v-model="addForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="外名" prop="foreign_name">
                            <el-input v-model="addForm.foreign_name"></el-input>
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
                        <el-form-item label="发行">
                            <el-date-picker v-model="addForm.release_date" type="date" placeholder="选择日期"
                                            style="width: 100%"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="票房" prop="box_office">
                            <el-input v-model="addForm.box_office"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>

            <div v-else-if="addActive === 1">

                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>类型</span>
                        <el-button @click.native="addMovieGenreTransfer=true">添加</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in addForm.genreSet" :key="index"
                                @close="editTagClose(addForm.genreSet,index)">
                            {{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>导演</span>
                        <el-button @click.native="addMovieDirectorTransfer=true">添加</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in addForm.directorSet.slice(0,4)"
                                :key="index" @close="editTagClose(addForm.directorSet,index)">{{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>编剧</span>
                        <el-button @click.native="addMovieScreenwriterTransfer=true">添加</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in addForm.screenwriterSet.slice(0,4)"
                                :key="index" @close="editTagClose(addForm.screenwriterSet,index)">{{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>演员</span>
                        <el-button @click.native="addMovieStarringTransfer=true">添加</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in addForm.starringSet.slice(0,4)"
                                :key="index" @close="editTagClose(addForm.starringSet,item)">{{item.name}}
                        </el-tag>
                    </div>
                </div>

            </div>

            <el-row class="movie-detail-description" v-else>
                <el-col :span="4">
                    <el-image
                            :src="addForm.cover_url?addForm.cover_url:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1212738062,1791075344&fm=26&gp=0.jpg'"
                            class="movie-detail-cover"></el-image>
                    <div class="movie-detail-share">
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-CatFootprint"></use>
                        </svg>
                        <span>分享到</span>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-Facebook"></use>
                        </svg>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-youtube"></use>
                        </svg>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-twitter"></use>
                        </svg>
                    </div>

                </el-col>
                <el-col :span="18" class="movie-detail-info">
                    <div>
                        <span class="movie-detail-title">{{addForm.name}} {{addForm.foreign_name}}</span>
                    </div>
                    <el-divider></el-divider>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">导演 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in addForm.directorSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">编剧 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in addForm.screenwriterSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">演员 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in addForm.starringSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">类型 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in addForm.genreSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">发行 : </span>
                        <span class="movie-detail-tag-content"> {{addForm.release_date}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="movie-detail-tag">时长 : </span>
                        <span class="movie-detail-tag-content"> {{addForm.length}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">语言 : </span>
                        <span class="movie-detail-tag-content"> {{addForm.language}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="movie-detail-tag">地区 : </span>
                        <span class="movie-detail-tag-content"> {{addForm.area}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">评分人数 : </span>
                        <span class="movie-detail-tag-content">{{addForm.votes}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <el-rate
                                v-model="addForm.rate"
                                disabled
                                show-score
                                :max="10"
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-col>
            </el-row>

            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取消</el-button>
                 <el-button v-if="addActive > 0" @click="addActive--">上一步</el-button>
                 <el-button type="primary" @click="addMovie">{{addActive === 2? '确定':'下一步'}}</el-button>
            </span>
        </el-dialog>

        <!-- 修改电影的对话框 -->
        <el-dialog class="edit-dialog" title="修改电影" :visible.sync="editDialogVisible" width="50%"
                   @close="editMovieDialogClosed">
            <el-steps class="edit-step" :active="editActive" finish-status="success" simple>
                <el-step title="步骤 1" @click.native="editChange(0)" style="cursor: pointer"></el-step>
                <el-step title="步骤 2" @click.native="editChange(1)" style="cursor: pointer"></el-step>
                <el-step title="步骤 3" @click.native="editChange(2)" style="cursor: pointer"></el-step>
            </el-steps>
            <el-row class="edit-content" v-if="editActive === 0">
                <el-col :span="8">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <el-image v-if="editForm.cover_url" :src="editForm.cover_url"></el-image>
                        <svg v-else class="avatar-icon" aria-hidden="true">
                            <use xlink:href="#icon-icon-admin-img"></use>
                        </svg>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="16">
                    <el-form :model="editForm" ref="editFormRef" label-width="70px">
                        <el-form-item label="电影">
                            <el-input v-model="editForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="外名">
                            <el-input v-model="editForm.foreign_name"></el-input>
                        </el-form-item>
                        <el-form-item label="长度">
                            <el-input v-model="editForm.length"></el-input>
                        </el-form-item>
                        <el-form-item label="语言">
                            <el-input v-model="editForm.language"></el-input>
                        </el-form-item>
                        <el-form-item label="地区">
                            <el-input v-model="editForm.area"></el-input>
                        </el-form-item>
                        <el-form-item label="发行">
                            <el-date-picker v-model="editForm.release_date" type="date" placeholder="选择日期"
                                            style="width: 100%"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="票房">
                            <el-input v-model="editForm.box_office"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div v-else-if="editActive === 1">

                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>类型</span>
                        <el-button> 更改</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in editForm.genreSet" :key="index"
                                @close="editTagClose(editForm.genreSet,index)">
                            {{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>导演</span>
                        <el-button> 更改</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in editForm.directorSet.slice(0,4)"
                                :key="index" @close="editTagClose(editForm.directorSet,index)">{{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>编剧</span>
                        <el-button> 更改</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in editForm.screenwriterSet.slice(0,4)"
                                :key="index" @close="editTagClose(editForm.screenwriterSet,index)">{{item.name}}
                        </el-tag>
                    </div>
                </div>
                <div class="edit-topic">
                    <div style="display: flex;justify-content: space-between">
                        <span>演员</span>
                        <el-button> 更改</el-button>
                    </div>
                    <div>
                        <el-tag class="edit-tag" closable v-for="(item,index) in editForm.starringSet.slice(0,4)"
                                :key="index" @close="editTagClose(editForm.starringSet,item)">{{item.name}}
                        </el-tag>
                    </div>
                </div>
            </div>
            <el-row class="movie-detail-description" v-else>
                <el-col :span="4">
                    <el-image :src="editForm.cover_url" fit="fill" class="movie-detail-cover"></el-image>
                    <div class="movie-detail-share">
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-CatFootprint"></use>
                        </svg>
                        <span>分享到</span>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-Facebook"></use>
                        </svg>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-youtube"></use>
                        </svg>
                        <svg aria-hidden="true" class="movie-detail-icon-share">
                            <use xlink:href="#icon-twitter"></use>
                        </svg>
                    </div>

                </el-col>
                <el-col :span="18" class="movie-detail-info">
                    <div>
                        <span class="movie-detail-title">{{editForm.name}} {{editForm.foreign_name}}</span>
                    </div>
                    <el-divider></el-divider>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">导演 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in editForm.directorSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">编剧 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in editForm.screenwriterSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">演员 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in editForm.starringSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">类型 : </span>
                        <span class="movie-detail-tag-content" v-for="(item,index) in editForm.genreSet"
                              :key="index">
                                {{item.name}}
                            </span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">发行 : </span>
                        <span class="movie-detail-tag-content"> {{editForm.release_date}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="movie-detail-tag">时长 : </span>
                        <span class="movie-detail-tag-content"> {{editForm.length}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">语言 : </span>
                        <span class="movie-detail-tag-content"> {{editForm.language}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span class="movie-detail-tag">地区 : </span>
                        <span class="movie-detail-tag-content"> {{editForm.area}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <span class="movie-detail-tag">评分人数 : </span>
                        <span class="movie-detail-tag-content">{{editForm.votes}}</span>
                    </div>
                    <div class="movie-detail-block">
                        <el-rate
                                v-model="editForm.rate"
                                disabled
                                show-score
                                :max="10"
                                text-color="#ff9900"
                                score-template="{value}">
                        </el-rate>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="editDialogVisible = false">取消</el-button>
                 <el-button v-if="editActive>0" @click="editActive--">上一步</el-button>
                 <el-button type="primary" @click="editMovie">{{editActive === 2? '确定':'下一步'}}</el-button>
            </span>

        </el-dialog>

        <!-- 添加电影 类型 穿梭框-->
        <el-dialog class="add-movie-transfer" title="添加类型" :visible.sync="addMovieGenreTransfer" style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="movieGenrePicked"
                    filterable
                    :titles="['Source', 'Target']"
                    :data="genreList">
            </el-transfer>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMovieGenreTransfer = false">取 消</el-button>
                <el-button type="primary" @click="addMovieGenreTransfer=false">确 定</el-button>
            </span>

        </el-dialog>

        <!-- 添加电影 导演 穿梭框-->
        <el-dialog class="add-movie-transfer" title="添加导演" :visible.sync="addMovieDirectorTransfer" style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="movieDirectorPicked"
                    filterable
                    :titles="['Source', 'Target']"
                    :data="directorScreenwriterList">
            </el-transfer>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMovieDirectorTransfer = false">取 消</el-button>
                <el-button type="primary" @click="addMovieDirectorTransfer=false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加电影 编剧 穿梭框-->
        <el-dialog class="add-movie-transfer" title="添加编剧" :visible.sync="addMovieScreenwriterTransfer" style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="movieStarringPicked"
                    filterable
                    :titles="['Source', 'Target']"
                    :data="directorScreenwriterList">
            </el-transfer>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMovieScreenwriterTransfer = false">取 消</el-button>
                <el-button type="primary" @click="addMovieScreenwriterTransfer=false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加电影 演员 穿梭框-->
        <el-dialog class="add-movie-transfer" title="添加演员" :visible.sync="addMovieStarringTransfer" style="text-align: center">
            <el-transfer
                    style="text-align: left; display: inline-block"
                    v-model="movieStarringPicked"
                    filterable
                    :titles="['Source', 'Target']"
                    :data="starringList">
            </el-transfer>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addMovieStarringTransfer = false">取 消</el-button>
                <el-button type="primary" @click="addMovieStarringTransfer=false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        name: "AdminMovie",
        data() {

            return {
                // 搜索参数
                queryParams: {
                    query: '',
                    // 当前的页数
                    pageNum: 1,
                    // 当前每页显示多少条数据
                    pageSize: 5
                },
                // 搜索返回用户数量
                total: 0,
                // 搜索返回用户列表
                movieList: [],
                genreList: [],
                starringList: [],
                directorScreenwriterList: [],

                editActive: 0,
                addActive: 0,

                addMovieGenreTransfer: false,
                addMovieDirectorTransfer: false,
                addMovieStarringTransfer: false,
                addMovieScreenwriterTransfer: false,
                movieGenrePicked: [],
                movieDirectorPicked: [],
                movieStarringPicked: [],
                movieScreenwriterPicked: [],

                // 控制添加对象对话框的显示与隐藏
                addDialogVisible: false,
                // 添加对象的表单数据
                addForm: {
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
                    genreSet: [],
                    directorSet: [],
                    screenwriterSet: [],
                    starringSet: [],
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
        watch: {
            addMovieGenreTransfer(curVal, oldVal) {
                console.log(curVal, oldVal);
                if (!curVal && oldVal) {
                    this.addForm.genreSet = [];
                    for (let i = 0; i < this.movieGenrePicked.length; i++) {
                        this.addForm.genreSet.push(this.genreList[i].item)
                    }
                    console.log(this.addForm.genreSet);
                }

            },
            addMovieDirectorTransfer(curVal, oldVal) {
                if (!curVal && oldVal) {
                    this.addForm.directorSet = [];
                    for (let i = 0; i < this.movieDirectorPicked.length; i++) {
                        this.addForm.directorSet.push(this.directorScreenwriterList[i].item)
                    }
                }
            },
            addMovieStarringTransfer(curVal, oldVal) {
                if (!curVal && oldVal) {
                    this.addForm.starringSet = [];
                    for (let i = 0; i < this.movieStarringPicked.length; i++) {
                        this.addForm.starringSet.push( this.starringList[i].item)
                    }
                }


            },
            addMovieScreenwriterTransfer(curVal, oldVal) {
                if (!curVal && oldVal) {
                    this.addForm.screenwriterSet = [];
                    for (let i = 0; i < this.movieScreenwriterPicked.length; i++) {
                        this.addForm.screenwriterSet.push(this.directorScreenwriterList[i].item)
                    }
                }

            }

        },
        methods: {

            handleAvatarSuccess() {

            },
            beforeAvatarUpload() {

            },
            addDialogVisibleChange() {
                this.addDialogVisible = true;
                if (this.genreList.length === 0) {
                    this.getStarringList();
                    this.getGenreList();
                    this.getDirectorScreenwriterList();
                }
            },
            editChange(target) {
                this.editActive = target;
            },

            editTagClose(list, index) {
                list.splice(index, 1);
            },

            // 获取类型列表
            async getGenreList() {
                const {data: result} = await this.$http.get(
                    'genre/_all',
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 10000
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                for (let i = 0; i < result.data.content.length; i++) {
                    this.genreList.push(
                        {
                            key: i,
                            label: result.data.content[i].name,
                            item: result.data.content[i]
                        }
                    )
                }
            },

            // 获取后台演员列表
            async getStarringList() {
                const {data: result} = await this.$http.get(
                    'starring/_all',
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 10000
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                for (let i = 0; i < result.data.content.length; i++) {
                    this.starringList.push(
                        {
                            key: i,
                            label: result.data.content[i].name,
                            item: result.data.content[i]
                        }
                    )
                }
            },

            // 获取后台导演编辑列表
            async getDirectorScreenwriterList() {
                const {data: result} = await this.$http.get(
                    'directorScreenwriter/_all',
                    {
                        params: {
                            pageNum: 1,
                            pageSize: 10000
                        }
                    });
                if (result.status !== 200) {
                    return this.$message.error(result.message)
                }
                for (let i = 0; i < result.data.content.length; i++) {
                    this.directorScreenwriterList.push(
                        {
                            key: i,
                            label: result.data.content[i].name,
                            item: result.data.content[i]
                        }
                    )
                }
            },

            // 搜索电影
            async getMovieByName() {
                if (this.queryParams.query === '') {
                    return this.movieList.length > 1 ? this.$message.warning('搜索内容为空') : this.getMovieList();
                }
                const {data: result} = await this.$http.get(
                    'movie/_name/' + this.queryParams.query,
                );
                if (result.status === 200) {
                    this.movieList = [];
                    this.movieList.push(result.data);
                    this.total = 1;
                } else {
                    this.movieList = [];
                    this.total = 0;
                    return this.$message.error(result.message)
                }
            },

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
            async addMovie() {
                if (this.editActive === 2) {
                    // 可以发起添加电影的网络请求
                    console.log("admin 添加电影 ======>");
                    console.log(this.addForm);
                    const {data: result} = await this.$http.post(
                        'movie',
                        this.addForm,
                    );

                    if (result.status !== 200) {
                        this.$message.error(result.message);
                    }
                    this.$message.success(result.message);
                    console.log("admin 添加电影 成功");
                    // 隐藏添加电影的对话框
                    this.addDialogVisible = false;
                    this.addActive = 0;
                    // 重新获取电影列表数据
                    this.getMovieList();
                } else {
                    this.addActive++;
                }
            },

            // 修改电影信息并提交
            async editMovie() {
                if (this.editActive === 2) {
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
                    this.editActive = 0;
                    // 提示修改成功
                    this.$message.success(result.message)
                } else {
                    this.editActive++;
                }
                this.getStarringList();
                this.getGenreList();
                this.getDirectorScreenwriterList();

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
            },
            // 监听修改电影对话框的关闭事件
            editMovieDialogClosed() {
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
    @import "src/assets/sass/global";

    div {
        .el-card {
            .search-header {
                margin-bottom: 20px;

                ::v-deep .el-button--default:hover {
                    background-color: $bg_blue_white_global;
                }
            }

            .movie-detail-description {
                .movie-detail-share {
                    display: flex;
                    justify-content: space-evenly;

                    .movie-detail-icon-share {
                        height: 25px;
                        width: 25px;
                        cursor: pointer;
                    }
                }

                .movie-detail-info {
                    margin-left: 20px;
                    text-align: left;

                    .movie-detail-title {
                        font-size: xx-large;

                    }

                    .el-divider--horizontal {
                        margin: 10px;
                    }

                    .movie-detail-block {
                        margin-bottom: 5px;

                        .movie-detail-tag {
                            font-weight: bold;
                            font-size: 22px;
                            cursor: default;
                        }

                        .movie-detail-tag-content {
                            font-size: 20px;
                            color: $bg_blue_global;
                            cursor: pointer;
                        }

                        .el-divider--vertical {
                            margin-left: 100px;
                            border-top: 1px dashed $bg_blue_white_global
                        }
                    }


                }

            }

            .el-pagination {
                margin-top: 20px;
            }
        }

        .edit-dialog {
            ::v-deep .el-dialog__body {
                padding-top: 0;
                padding-bottom: 20px;
            }
        }

        .edit-step {
            margin-bottom: 20px;
        }

        .edit-content {
            padding-left: 2%;
            padding-right: 10%;
        }

        .edit-topic {
            padding-left: 8%;
            padding-right: 8%;
        }

        .edit-tag {
            margin-left: 2px;
            margin-right: 2px;
        }

        .movie-detail-description {

            .movie-detail-share {
                display: flex;
                justify-content: space-evenly;

                .movie-detail-icon-share {
                    height: 25px;
                    width: 25px;
                    cursor: pointer;
                }
            }

            .movie-detail-info {
                margin-left: 20px;
                text-align: left;

                .movie-detail-title {
                    font-size: xx-large;

                }

                .el-divider--horizontal {
                    margin: 10px;
                }

                .movie-detail-block {
                    margin-bottom: 5px;

                    .movie-detail-tag {
                        font-weight: bold;
                        font-size: 22px;
                        cursor: default;
                    }

                    .movie-detail-tag-content {
                        font-size: 20px;
                        color: $bg_blue_global;
                        cursor: pointer;
                    }

                    .el-divider--vertical {
                        margin-left: 100px;
                        border-top: 1px dashed $bg_blue_white_global
                    }
                }


            }

        }


        .add-dialog {
            ::v-deep .el-dialog__body {
                padding-top: 0;
            }

            .edit-step {
                margin-bottom: 20px;
            }

            .edit-content {
                padding-left: 2%;
                padding-right: 10%;
            }
        }
    }


</style>