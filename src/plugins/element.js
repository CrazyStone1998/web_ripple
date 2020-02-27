import Vue from "vue";
import {
    // 表单
    Button, Form, FormItem, Input,
    // 导入弹框提示组件
    Message,
    // 容器
    Container, Header, Aside, Main, Footer,
    // 菜单
    Menu, Submenu, MenuItemGroup, MenuItem,
    // 面包屑
    Breadcrumb, BreadcrumbItem,
    // 卡片
    Card,
    // 布局
    Row, Col,
    // 表格
    Table, TableColumn,
    // 提示
    Tooltip,
    // 开关
    Switch,
    // 分页
    Pagination,
    // 对话框
    Dialog,
    // 消息盒子
    MessageBox,
    // 标签
    Tag,
    // 树
    Tree,
    // 选择框
    Select, Option,
    //
    Cascader

} from "element-ui";

Vue.use(Button);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(BreadcrumbItem);
Vue.use(Breadcrumb);
Vue.use(Card);
Vue.use(Col);
Vue.use(Row);
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Select);
Vue.use(Option);
Vue.use(Footer);
Vue.use(Cascader);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
