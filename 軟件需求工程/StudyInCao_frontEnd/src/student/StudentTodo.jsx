import React from 'react';
import {Avatar, List} from 'antd';
import './studentcss.css'
import {PushpinFilled} from '@ant-design/icons';
import axios from 'axios';
var storage = window.localStorage;

class StudentTodo extends React.Component{
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
        axios.get('/todolist/'+this.state.id, {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                var Todolist=res.data.data;
                var list=[];
                for(var i=0;i<Todolist.length;i++){
                    var ele={
                        id:i,
                        coursename:Todolist[i].coursename,
                        ddl:Todolist[i].ddl,
                        mission:Todolist[i].mission,
                        missiontype:Todolist[i].missiontype,
                    };
                    list.push(ele);
                }
                this.setState({
                    Todolist: list
                });
                console.log(this.state.Todolist)
            }
        );
    }

    getTitle=(type,mission,time)=>{
        return(
            <div>
                <h3>{type+" "+mission+" 待提交"}</h3>
                <h4>{time}</h4>
            </div>
        )
    }

    getTodo=(item)=>{
        return(
            <div>
                <h3>{"课程 "+item.coursename+" 的 "+item.missiontype+" "+item.mission+" 将于 "+item.ddl+" 截止"}</h3>
            </div>
        )
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
                    avatar={<Avatar style={{backgroundColor:"#eb222d"}} size={50} icon={<PushpinFilled />}/>}
                    title={this.getTitle(item.missiontype,item.mission,item.ddl)}
                    />
                    {this.getTodo(item)}
                </List.Item>
                )}
            />
            </div>
        )
    }
}

export default StudentTodo