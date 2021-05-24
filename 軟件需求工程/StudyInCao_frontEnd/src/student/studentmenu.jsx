import React from 'react';
import {Menu} from 'antd';
import './studentcss.css'
import {Link} from 'react-router-dom';

class ShowthemenuStudent extends React.Component{
    state={
        current:'/student'
    }
    handleClick=e=>{
        this.setState({current:e.key});
    };
    render(){
        return(
            <div class="studentmenu">
                <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
                    <Menu.Item class="Item" key="/student">
                        <Link to={{pathname: "/student"}}>我的课程</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/courselist">
                        <Link to={{pathname:"/student/courselist"}}>我的课表</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/notice">
                        <Link to={{pathname:"/student/notice"}}>通知</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/todo">
                        <Link to={{pathname:"/student/todo"}}>待办事项</Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}
export default ShowthemenuStudent