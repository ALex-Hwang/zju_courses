import React from 'react';
import axios from 'axios';
import { Button, Form, Input,  Modal, Select, Table,DatePicker} from "antd";
import {Link} from "react-router-dom";
import moment from 'moment';
import './Course.css'

const numbers=[1,2,3,4,5,6,7,8,9,10];
const { Option } = Select;
const {TextArea}=Input;
var storage=window.localStorage;

class homework extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            token:storage.getItem("token"),
            visible2:false,
            chapternum2:"",
            sourcename:"",
            hwtype:"",
            endtime:"",
            time:"2021.",
            content:"",
            source:[],
            header:[],
            chapternum:0,
            chaptername2:"",
        };

    }

    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    };

    GetSourcename=(e)=>{
        this.setState({
            sourcename:e.target.value,
        })
    };

    handleOk2 = () => {
        if(this.state.chaptername2===""||this.state.sourcename===""||this.state.endtime===""){
            alert("除作业要求外所有信息都是必填的！");
        }
        else{
            var params = {
			title: this.state.sourcename,
            deadline:this.state.endtime,
		    };
            var formdata=new FormData();
            formdata.append('content',this.state.content);
            axios({
                baseURL: 'http://47.100.55.98:5000',
                method: 'post',
                url: 'homework/chapter/'+this.state.chaptername2.toString(),
                headers: {
				"Token": this.state.token.toString(),
                "Content-Type":'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
			    },
                data: formdata
                ,
                params
                }).then(()=>{
                    axios.defaults.baseURL = 'http://47.100.55.98:5000';
                    axios.get('/homework/course/'+this.state.courseID).then(
                        res=>{
                            var list2=[];
                            var result=res.data.data;
                            result.map(item=>{
                                item.resources.map(item2=>{
                                    list2.push(item2);
                                })
                            });
                            this.setState({
                                source:list2,
                                visible2:false,
                            });
                            console.log(this.state.source);
                        }
                    );
                }).catch(function (error) {
                        console.log(error);
                      });
        }
    };

    handleCancel2 = () => {
        this.setState({ visible2: false });
    };

   getoption=(num)=>{
        return this.state.header[num-1].title;
    };

    Getcontent=(e)=>{
        this.setState({
            content:e.target.value,
        })
    };

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/homework/course/'+this.state.courseID).then(
            res=>{
                var result = res.data.data;
                var num = result.length;
                axios.defaults.baseURL = 'http://47.100.55.98:5000';
                axios.get('/chapter/'+this.state.courseID).then(
                    res=>{
                        var list=this.state.header;
                        for(var i=0;i<num;i++){
                            list.push({
                                title:res.data.data[i].title,
                                id:res.data.data[i].id
                            });
                        }
                        this.setState({
                            header:list,
                            chapternum: num,
                        });
                    }
                );
                var list2=[];
                result.map(item=>{
                    item.resources.map(item2=>{
                        list2.push(item2);
                    })
                });
                this.setState({
                    source:list2,
                });
                console.log(this.state.source);
            }
        );
    }


    render() {
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
                        <Link to={{pathname:"/myCourse/"+this.state.courseID+'/CourseSource/1/'+text.toString()}}>
                            进入查看详情
                        </Link>
                    )
                }
            }
        ];

        return(
            <div>
                <div className="topbutton">
                    <Button size="large" type="primary" onClick={this.showModal2}>
                        发布新作业
                    </Button>
                    <Modal
                        visible={this.state.visible2}
                        title="发布新作业"
                        onOk={this.handleOk2}
                        onCancel={this.handleCancel2}
                        footer={[
                        <Button key="back" onClick={this.handleCancel2}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  htmlType="submit" onClick={this.handleOk2}>
                            提交
                        </Button>,
                        ]}>
                        <Form>
                            <Form.Item name="作业标题" label="作业标题"  rules={[{ required: true}]}>
                                <Input placeholder="请输入作业标题" onChange = {(e)=>this.GetSourcename(e)}/>
                            </Form.Item>
                            <Form.Item name="所属章节" label="所属章节"  rules={[{ required: true}]}>
                                <Select placeholder="请选择所属章节" onChange = {value=>{
                                    this.setState({
                                        chaptername2:value,
                                    })
                                }}>
                                    {numbers.map(item=>{
                                        if(item<=this.state.chapternum){
                                            return(
                                                <Option value={this.state.header[item-1].id}>{this.getoption(item)}</Option>
                                            )
                                        }
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name="作业要求" label="作业要求" rules={[{ required: false}]}>
                                <TextArea rows={4} placeholder="请输入作业要求" onChange = {(e)=>this.Getcontent(e)}/>
                            </Form.Item>
                            <Form.Item name="截至时间" label="截至时间"  rules={[{ required: true}]}>
                                <DatePicker placeholder="请选择截至时间" showTime onChange={(value)=>{
                                    console.log(moment(new Date()).unix());
                                    console.log(moment(value).unix());
                                    this.setState({
                                        endtime:moment(value).unix(),
                                    });
                                }}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div className="table">
                    {console.log(this.state.source)}
                    <Table columns={columns} dataSource={this.state.source}/>
                </div>
            </div>
        )
    }
}

export default homework;