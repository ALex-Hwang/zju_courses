import React from 'react';
import axios from 'axios';
import {Avatar, List, Button, Modal, Form, Input} from "antd";
import {BellFilled,} from "@ant-design/icons";
import './Course.css'
const { TextArea } = Input;
var storage=window.localStorage;

class coursenotice extends React.Component{
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
            notice:[],
        };
        console.log(this.state.thetime.toString());
    }

    showModal1 = () => {
        this.setState({
            visible1: true,
        });
    };

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('notification/course/'+this.state.courseID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                var result=res.data.data;
                console.log(result);
                var list=[];
                for(var i=0;i<result.length;i+=2){
                    if(result[i].content_type==='发布')
                        list.push(result[i]);
                }
                this.setState({
                    notice:list,
                });
                console.log(this.state.notice);
            }
        );
    }

    handleOk1 = () => {
        if(this.state.noticecontent===""||this.state.noticetitle===""){
            alert("所有内容都是必填的！");
        }
        else{
            var params = {
			title: this.state.noticetitle,
		    };
            var formdata=new FormData();
            formdata.append('content',this.state.noticecontent);
            console.log(formdata);
            axios({
                baseURL: 'http://47.100.55.98:5000',
                method: 'post',
                url: 'notification/course/'+this.state.courseID.toString(),
                headers: {
				"Token": this.state.token.toString(),
                "Content-Type":'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
			    },
                data: formdata
                ,
                params
                }).then(()=>{
                    axios.defaults.baseURL = 'http://47.100.55.98:5000';
                    axios.get('notification/course/'+this.state.courseID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
                        res=>{
                            var result=res.data.data;
                            var list=[];
                            for(var i=0;i<result.length;i+=2){
                                if(result[i].content_type==='发布')
                                    list.push(result[i]);
                            }
                            this.setState({
                                notice:list,
                            });
                        }
                    );
            });
            this.setState({ visible1: false });
        }
    };

    handleCancel1 = () => {
        this.setState({ visible1: false });
    };

    Gettitle=(e)=>{
        this.setState({
            noticetitle:e.target.value,
        })
    };

    Getcontent=(e)=>{
        this.setState({
            noticecontent:e.target.value,
        })
    };

    render() {
        return(
            <div>
                <div className="topbutton">
                     <Button size="large" type="primary" onClick={this.showModal1}>
                         发布通知
                     </Button>
                     <Modal
                        visible={this.state.visible1}
                        title="发布通知"
                        onOk={this.handleOk1}
                        onCancel={this.handleCancel1}
                        footer={[
                        <Button key="back" onClick={this.handleCancel1}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  htmlType="submit" onClick={this.handleOk1}>
                            提交
                        </Button>,
                        ]}>
                        <Form>
                            <Form.Item name="title" label="通知标题" rules={[{ required: true}]}>
                                <Input placeholder="请输入通知标题" onChange = {(e)=>this.Gettitle(e)}/>
                            </Form.Item>
                            <Form.Item name="description" label="通知内容" rules={[{ required: true}]}>
                                <TextArea rows={4} placeholder="请输入通知内容" onChange = {(e)=>this.Getcontent(e)}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
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
                        dataSource={this.state.notice}
                        renderItem={item =>{
                                return(
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            avatar= {<Avatar style={{backgroundColor:"#FFD700"}} size={50} icon={<BellFilled/>}/>}
                                        title={ <div>
                                                    <h3>{item.content_title}</h3>
                                                    <h4>{"于"+item.time+"发布"}</h4>
                                                </div>}
                                        />
                                        {item.content}
                                    </List.Item>
                                )
                            }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default coursenotice;