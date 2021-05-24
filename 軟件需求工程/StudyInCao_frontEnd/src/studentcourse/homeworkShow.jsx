import React from 'react';
import axios from 'axios';
import {Table} from "antd";
import {Link} from "react-router-dom";
import './Course.css'

class homeworkShow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            visible2:false,
            chapternum2:"",
            sourcename:"",
            hwtype:"",
            endtime:"",
            source:[]
        };

    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/homework/course/'+this.state.courseID).then(
            res=>{
                var source=res.data.data;
                var list=[];
                source.map(item=>{
                    item.resources.map(item2=>{
                        list.push(item2);
                    })
                });
                this.setState({
                    source:list,
                })
                console.log(this.state.source);
            }
        );
    }

    render(){
        const columns=[
            {
                title:'作业名称',
                dataIndex:'title',
                key:'title',
                align:'center',
            },
            {
                title: '开放时间',
                dataIndex: 'time',
                key: 'time',
                align:'center'
            },
            {
                title:'截至时间',
                dataIndex:'deadline',
                key:'deadline',
                align:'center'
            },
            {
                title:'查看详情',
                dataIndex:'id',
                key:'id',
                align:'center',
                render:text=>{
                    return(
                        <Link to={{pathname:"/course/"+this.state.courseID+'/CourseRes/1/'+text.toString()}}>
                            进入查看详情
                        </Link>
                    )
                }
            }
        ];

        return (
            <div>
                <div class="table">
                    <Table columns={columns} dataSource={this.state.source}/>
                </div>
            </div>
        );
    };
}
export default homeworkShow;
