import React from 'react';
import axios from 'axios';
import {Avatar, List} from "antd";
import {BellFilled,} from "@ant-design/icons";
import notice from '../teachercourse/coursenotice'
import './Course.css'

var storage=window.localStorage;

class noticeShow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            visible1:false,
            thetime:new Date(),
            time:"2021.",
            noticetitle:"",
            noticecontent:"",
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
        };
        console.log(this.state.thetime.toString());
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/notification/student/'+this.state.id.toString()).then(
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
        return(
            <div>
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
                        dataSource={notice}
                        renderItem={item =>{
                            if(item.courseID===this.state.courseID){
                                return(
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar={<Avatar style={{backgroundColor:"#FFD700"}} size={50} icon={<BellFilled/>}/>}
                                        title={ <div>
                                                    <h3>{item.title}</h3>
                                                    <h4>{"于"+item.time+"发布"}</h4>
                                                </div>}
                                        />
                                        {item.description}
                                    </List.Item>
                                )
                            }
                        }}
                    />
                </div>
            </div>
        );
    };
}
export default noticeShow