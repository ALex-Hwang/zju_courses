import React from 'react';
import picurl from "../assets/panda.jpg"
import { PageHeader,Descriptions } from 'antd';
import './studentcss.css'
import axios from "axios";

var storage=window.localStorage;

class Showthestudent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            info:'',
        };
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/student/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                this.setState({
                    info: res.data.data
                });
                console.log(this.state.info);
            }
        );
    }

    getname=()=>{
        if(this.state.info==="")
            return"";
        else
            return this.state.info.name
    }

    getclass=()=>{
        if(this.state.info==="")
            return"";
        else
            return this.state.info.class_name
    }

    render(){
        return(
            <div className="pageheader">
                <PageHeader
                style = {{backgroundColor:"rgba(38,152,255,0.15)"}}
                ghost={false}
                title={this.getname()}
                subTitle="学生"
                avatar={{ src: picurl }}
                >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="班级"> {this.getclass()} </Descriptions.Item>
                </Descriptions>
                </PageHeader>
            </div>
        )
    }
}
export default Showthestudent
