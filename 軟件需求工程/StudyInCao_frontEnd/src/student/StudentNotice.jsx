import React from 'react';
import {Avatar, List} from 'antd';
import Noticelist from "./NoticeList.js"
import './studentcss.css'
import {ClockCircleTwoTone} from '@ant-design/icons';
import axios from 'axios';

var storage = window.localStorage;

class StudentNotice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            Todolist:[]
        };
        console.log(this.state.token);
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/notification/student/'+this.state.id.toString(),{headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                var Todolist=res.data.data;
                var list=[];
                for(var i=0;i<Todolist.length;i++){
                    var ele={
                        id:i,
                        coursename:Todolist[i].course_name,
                        time:Todolist[i].time,
                        content:Todolist[i].content_title,
                        contenttype:Todolist[i].content_type,
                        state:Todolist[i].state,
                        realcontent:Todolist[i].content,
                    };
                    list.push(ele);
                }
                this.setState({
                    Todolist: list
                });
                console.log(this.state.Todolist)
            }
        );
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/notification/student/'+this.state.id.toString(),{headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                console.log(res.data.data);
            }
        );
    }

    getTitle=(type,state,time)=>{
        if(type==='发布')
            return(
                <div>
                    <h3>课程通知</h3>
                    <h4>{time}</h4>
                </div>
            )
        if(state===1){
            return(
                <div>
                    <h3>{type+"开放"}</h3>
                    <h4>{time}</h4>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>{type + "即将截止"}</h3>
                    <h4>{time}</h4>
                </div>
            )
        }
    }

    getnotice=(item)=>{
        if(item.contenttype==='发布')
            return(
                <div>
                    <h3>{'课程 '+item.coursename+" 的公告："+item.realcontent}</h3>
                </div>
            )
        if(item.state===1){
            return(
                <div>
                    <h3>{'课程 '+item.coursename+" 的"+item.contenttype+" "+item.content+" 已于"+item.time+"开放"}</h3>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h3>{item.contenttype+" "+item.content+" 将于"+item.time+"截止提交"}</h3>
                </div>
            )
        }
    }

    geticoncolor=(state)=>{
        if(state===1){
            return "#52c41a"
        }
        else
            return "#eb222d"
    }
    render(){
        return(
            <div class="notice">
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={this.state.Todolist}
                renderItem={item => (
                <List.Item
                    key={item.id}
                >
                <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor:this.geticoncolor(item.state)}} size={50} icon={<ClockCircleTwoTone twoToneColor={this.geticoncolor(item.state)} />}/>}
                    title={this.getTitle(item.contenttype,item.state,item.time)}
                    />
                    {this.getnotice(item)}
                </List.Item>
                )}
            />
            </div>
        )
    }
}

export default StudentNotice