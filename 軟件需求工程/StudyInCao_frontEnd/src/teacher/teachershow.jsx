import React from 'react';
import axios from "axios";
import {PageHeader,Descriptions} from 'antd';
import picurl from "../assets/panda.jpg"
import './teachercss.css'


var storage=window.localStorage;


class Showtheteacher extends React.Component{
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
        axios.get('/teacher/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                this.setState({
                    info: res.data.data
                });
                console.log(this.state.info);
            }
        );
    }

    getname=()=>{
        if(this.state.info==='')
            return '';
        else
            return this.state.info.name;
    };

    gettitle=()=>{
        if(this.state.info==='')
            return '';
        else
            return this.state.info.title;
    }

    getschool=()=>{
        if(this.state.info==='')
            return '';
        else
            return this.state.info.school;
    }

    render(){
        return(
            <div className="pageheader">
                <PageHeader
                style = {{backgroundColor:"rgba(38,152,255,0.15)"}}
                ghost={false}
                title={this.getname()}
                subTitle="教师"
                avatar={{ src: picurl }}
                >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="职位"> {'浙江大学--'+this.gettitle()} </Descriptions.Item>
                    <Descriptions.Item label="学院"> {this.getschool()+'学院'} </Descriptions.Item>
                </Descriptions>
                </PageHeader>
            </div>
        )
    }
}
export default Showtheteacher
