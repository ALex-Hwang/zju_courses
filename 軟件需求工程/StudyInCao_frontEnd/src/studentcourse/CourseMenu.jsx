import React from 'react';
import {Menu} from 'antd';
import '../student/studentcss.css'
import {Link} from 'react-router-dom';

class CourseMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            current:this.props.function,
        };
    }
    handleClick=e=>{
        this.setState({current:e.key});
    };
    render(){
        return(
            <div class="studentmenu">
                <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
                    <Menu.Item class="Item" key= "/student" >
                        <Link to={{pathname: "/course/"+this.props.courseID+'/chapter'}}>章节</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/notice">
                        <Link to={{pathname:"/course/"+this.props.courseID+'/courseWare'}}>课件</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/todo">
                        <Link to={{pathname:"/course/"+this.props.courseID+'/homework'}}>作业</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="/student/3">
                        <Link to={{pathname:'/study/bbs/'+this.props.courseID}}>讨论区</Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}
export default CourseMenu