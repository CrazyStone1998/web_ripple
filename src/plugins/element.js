import Vue from "vue";
import {
    // 表单 & 按钮 & Tips & 头像
    Button, Form, FormItem, Input, Image, Avatar, Link, Badge, PageHeader,
    // 导入弹框提示组件 对话框 消息盒子
    Message, Dialog, MessageBox,
    // 容器 & 布局
    Container, Header, Aside, Main, Footer, Row, Col,
    // 菜单
    Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownItem, DropdownMenu,
    // 结构: 面包屑 & 轮播 & 卡片 & 开关 & 提示
    Breadcrumb, BreadcrumbItem, CarouselItem, Carousel, Card, Switch, Tooltip, Slider,
    // 表格 分页
    Table, TableColumn, Pagination, Collapse, CollapseItem, CheckboxGroup, CheckboxButton, Checkbox,
    Tag, Tree, Select, Option, Rate, Cascader, Divider, Drawer,Progress,

    InfiniteScroll,
    Upload, Backtop, Loading,Transfer


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
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Image);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(InfiniteScroll);
Vue.use(Rate);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Avatar);
Vue.use(Link);
Vue.use(Upload);
Vue.use(Backtop);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Slider);
Vue.use(Badge);
Vue.use(PageHeader);
Vue.use(Progress);
Vue.use(Transfer);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
