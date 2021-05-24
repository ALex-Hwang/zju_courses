import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { ReadOutlined, IdcardOutlined, TeamOutlined, HomeOutlined} from '@ant-design/icons';
import Admin from '../assets/css/Admin.css'
import BackLogo from '../assets/back.png'
import ManageCourse from './ManageCourse'
import ManageUser from './ManageUser'
import ManageBBS from './ManageBBS'
import AddCourse from './AddCourse'
import AdminNotice from './AdminNotice'
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

{/*
    AdminContent.jsx
    Created by xxd
    作用：管理员后台的导航和路由部分
*/}

class AdminContent extends Component {
	render() {
		return(
            <Layout >
                <Sider>
                <img class = "back-logo" src = {BackLogo} alt="管理员后台" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key = "1" icon={<HomeOutlined />}><Link to = "/admin"> 主页 </Link></Menu.Item>                    
                    <SubMenu key="sub1" icon={<ReadOutlined />} title="课程管理">
                        <Menu.Item key="2"><Link to = "/admin/course"> 课程列表 </Link></Menu.Item>
                        <Menu.Item key="3"><Link to = "/admin/course/add"> 添加课程 </Link></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="4" icon={<IdcardOutlined />}>
                    <Link to = "/admin/user"> 用户管理 </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<TeamOutlined />}>
                    <Link to = "/admin/bbs"> 论坛管理 </Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header className="site-layout-sub-header" style={{ padding: 0}}> 
                    <p class="headline">管理员，欢迎您！</p>  {/*改成具体的姓名 */}
                    <Button class="headline"><Link to = "/study"> 返回首页 </Link></Button>
                    <p class="headline"> </p>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
                        <Switch>
                            <Route exact path = "/admin" component = {AdminNotice}/>
                            <Route exact path = "/admin/course" component = {ManageCourse}/>
                            <Route exact path = "/admin/course/add" component = {AddCourse}/>
                            <Route exact path = "/admin/user" component = {ManageUser}/>
                            <Route exact path = "/admin/bbs" component = {ManageBBS}/>
                        </Switch>
                    </div>
                </Content>
                </Layout>
        </Layout>
		)
	}
}

export default AdminContent