import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom'
import './teachercss.css'

class Showthemenu extends React.Component{
    state={
        current:'course'
    }
    handleClick=e=>{
        this.setState({current:e.key});
    };
    render(){
        const {current}=this.state;
        return(
            <div class="teachermenu">
                <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[current]}>
                    <Menu.Item key="course">
                        <Link to={'/teacher'}>主讲课程</Link>
                    </Menu.Item>
                    <Menu.Item key="introduce">
                        <Link to={'/teacher/teacherinfo'}>教师简介</Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}
export default Showthemenu