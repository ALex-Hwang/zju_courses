import React from 'react';
import {Card,List} from 'antd';
import url from '../assets/logo.jpg'
import './studentcss.css'
import {Link} from 'react-router-dom';
import axios from "axios";
const{Meta}=Card;
var storage = window.localStorage;

class ShowthecourseStudent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            Course:[]
        };
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/courseList/student/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                var allcourse = res.data.data;
                var nowcourse = [];
                var j;
                for(j=0;j<allcourse.length;j++){
                    if(j===0){
                        nowcourse.push(allcourse[j]);
                    }
                    else{
                        var m;
                        for(m=0;m<nowcourse.length;m++){
                            if(allcourse[j].id===nowcourse[m].id)
                                break;
                        }
                        if(m===nowcourse.length)
                            nowcourse.push(allcourse[j]);
                    }
                }
                this.setState({
                    Course: nowcourse
                });
            }
        );
    }

    render(){
        return(
            <div class="carddiv">
                <List
                    grid={{gutter: 16, column: 5}}
                    dataSource={this.state.Course}
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 8,
                    }}
                    renderItem={item => (
                    <List.Item>
                        <Link  to={{pathname:'/course/'+item.id.toString() +'/chapter'}}>
                            <Card hoverable style={{ width: 200 }} cover={<img src={url}/>}>
                                <Meta title={item.name} description={"任课教师："+item.teacher} />
                            </Card>
                        </Link>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}
export default ShowthecourseStudent