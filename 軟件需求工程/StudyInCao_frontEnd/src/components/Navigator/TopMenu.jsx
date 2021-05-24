import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
// 导入icon
import { VideoCameraOutlined,QuestionCircleOutlined, HomeOutlined,BookOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

var storage = window.localStorage;
/**
* 导航栏,点击切换页面
*/

class TopMenu extends React.Component {
  state = {
    current: storage.getItem("TopbarKey"),
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    storage.setItem("TopbarKey",e.key);
  };

  render() {
    return (
      <div className="TopBar">
             <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <MenuItem key = "首页" icon={<HomeOutlined/>}>
                  <Link to = "/study"> 首页 </Link>
                </MenuItem>
                <MenuItem key = "全部课程" icon={<BookOutlined/>}>
                  <Link to = "/study/allCourses"> 课程 </Link>
                </MenuItem>
                <MenuItem key = "智云课堂" icon={<VideoCameraOutlined/>}>
                  <span><a href="http://classroom.zju.edu.cn/" target="_blank" rel="noopener noreferrer">智云课堂</a></span>
                </MenuItem>
                <MenuItem key = "使用帮助" icon={<QuestionCircleOutlined/>}>
                  <Link to = "/study/help"> 使用帮助 </Link>
                </MenuItem>
             </Menu>
      </div>
    );
  }
}

export default TopMenu