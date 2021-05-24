import React from 'react';
import {Avatar, Row, Col} from 'antd';
import axios from 'axios';
import Logo from '../../assets/logo.jpg';
import '../../assets/css/Course.css';

class CourseContent extends  React.Component{
    state = {
        posts: {},
    };

    componentDidMount() {
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get("/course/"+this.props.pageID
        ).then(res=>{
            this.setState({
                posts: res.data.data
            })
        });
    }

    render(){
        const posts = this.state.posts;

        return(
            <div>
               <div  class="courseContent">
               <Row>
                   <Col>
                    <div class='courseImg'>
                        <Avatar size={150} src={'http://47.100.55.98:5000/' + posts['avatar']}/>
                    </div>
                   </Col>
                   <Col>
                        <div>
                            <h1 class='courseTitle'>{posts['name']}</h1>
                        </div>
                        <div class='courseDescription'>
                            {posts['description']}
                        </div>
                   </Col>
               </Row>
               </div>
                    
                <div class='message'>
                    <div class='courseMessage'>
                            <span class='subTitle'>
                                <p>
                                    课程介绍
                                </p>
                            </span>
                            <span>
                                {posts['introduce']}
                            </span>
                            <br/>
                            <span class='subTitle'>
                                <p>
                                    预修要求
                                </p>
                            </span>
                            <span>
                                {posts['request']}
                            </span>
                            <br/>
                            <span class='subTitle'>
                                <p>
                                    课时安排
                                </p>
                            </span>
                            <span>
                                {posts['schedule']}
                            </span>
                            <br/>
                            <span class='subTitle'>
                                <p>
                                    所用教材
                                </p>
                            </span>
                            <span>
                                {posts['material']}
                            </span>
                            <br/>
                            <span class='subTitle'>
                                <p>
                                    教学安排
                                </p>
                            </span>
                            <span>
                                {posts['plan']}
                            </span>
                            <br/>
                            <span class='subTitle'>
                                <p>
                                    考核方式
                                </p>
                            </span>
                            <span>
                                {posts['exam']}
                            </span>
                            
                    </div>
                    <div class='teacherMessage'>
                        <Row>
                            <Col>
                                <div class='courseImg'>
                                    <Avatar size={80} src={Logo}/> 
                                </div>
                            </Col>
                            <Col>
                                <h2 class='teacherName'>
                                {posts['teacher_name']}
                                </h2>
                            </Col>
                        </Row>
                        <div class='teacherDescription'>
                            <span>教师介绍blablablablabla</span>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CourseContent