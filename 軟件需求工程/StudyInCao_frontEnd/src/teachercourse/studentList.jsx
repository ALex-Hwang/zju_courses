import React from 'react';
import axios from 'axios';
import {Table} from "antd";
import './Course.css'

const columns=[
    {
        title:'姓名',
        dataIndex:'name',
        key:'name',
        align:'center'
    },
    {
        title:'性别',
        dataIndex:'gender',
        key:'gender',
        align:'center',
        render:text=>{
            var gender;
            if(text===true){
                gender='男';
            }
            else
                gender='女';
            return gender;
        },
    },
    {
        title: '学号',
        dataIndex: 'id',
        key: 'id',
        align:'center'
    },
    {
        title:'专业班级',
        dataIndex:'class_name',
        key:'class_name',
        align:'center'
    }
];

var storage = window.localStorage

class studentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            courseID:this.props.match.params.id,
            studentList:[]
        };
        console.log(this.state.courseID);
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/grade/course/'+this.state.courseID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                this.setState({
                    studentList:res.data.data,
                });
                console.log(res.data.data);
            }
        );
    }

    render() {
        return(
            <div class="table">
                <Table  columns={columns} dataSource={this.state.studentList} bordered/>
            </div>
        )
    }
}

export default studentList;