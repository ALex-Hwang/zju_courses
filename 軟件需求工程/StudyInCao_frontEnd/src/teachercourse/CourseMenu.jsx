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
                    <Menu.Item class="Item" key= "chapter" >
                        <Link to={{pathname: "/myCourse/"+this.props.courseID+'/chapter'}}>章节</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="notice">
                        <Link to={{pathname:"/myCourse/"+this.props.courseID+'/notice'}}>公告</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="courseWare">
                        <Link to={{pathname:"/myCourse/"+this.props.courseID+'/courseWare'}}>课件</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="homework">
                        <Link to={{pathname:"/myCourse/"+this.props.courseID+'/homework'}}>作业</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="studentList">
                        <Link to={{pathname:"/myCourse/"+this.props.courseID+"/studentList"}}>学生名单</Link>
                    </Menu.Item>
                    <Menu.Item class="Item" key="discuss">
                        <Link to={{pathname:'/study/bbs/'+this.props.courseID}}>讨论区</Link>
                    </Menu.Item>
                </Menu>
            </div>

        )
    }
}
export default CourseMenu