import React from 'react';
import {Descriptions,Button, Form, Input,Modal} from "antd";
import '../student/studentcss.css'
import axios from "axios";

const { TextArea } = Input;
var storage=window.localStorage;

class teacherinfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            info:'',
            visible:false,
        };
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleOk = () => {
        var res={};
        if(this.state.address!=='')
            res.address=this.state.address;
        if(this.state.phone!=='')
            res.phone=this.state.phone;
        if(this.state.email!=='')
            res.email=this.state.email;
        var params = res;
            var formdata=new FormData();
            if(this.state.description!=='')
                formdata.append('description',this.state.description);
            axios({
                baseURL: 'http://47.100.55.98:5000',
                method: 'put',
                url: '/teacher/'+this.state.id.toString()+'/detail',
                headers: {
				"Token": this.state.token.toString(),
                "Content-Type":'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
			    },
                data: formdata
                ,
                params
                }).then(()=>{
                    axios.defaults.baseURL = 'http://47.100.55.98:5000';
                    axios.get('/teacher/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
                        res=>{
                            this.setState({
                                info: res.data.data,
                                visible:false,
                            });
                            console.log(this.state.info);
                        }
                    );
                }).catch(function (error) {
                        console.log(error);
                      });
    };

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

    Getphone=(e)=>{
        this.setState({
          phone:e.target.value,
        })
    }

    Getemail=(e)=>{
        this.setState({
          email:e.target.value,
        })
    }

    Getaddress=(e)=>{
        this.setState({
          address:e.target.value,
        })
    }

    Getdescription=(e)=>{
        this.setState({
          description:e.target.value,
        })
    }

    render() {
        return(
            <div class='carddiv'>
                <Descriptions title="个人资料" extra={<Button type='primary' size='large' onClick={this.showModal}>修改信息</Button>} >
                    <Descriptions.Item label="姓名"> {this.state.info.name}</Descriptions.Item>
                    <Descriptions.Item label="所属学院">{this.state.info.school+'学院'}</Descriptions.Item>
                    <Descriptions.Item label="职称">{this.state.info.title}</Descriptions.Item>
                    <Descriptions.Item label="电话">{this.state.info.phone}</Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">{this.state.info.email}</Descriptions.Item>
                    <Descriptions.Item label="个人简介">{this.state.info.description}</Descriptions.Item>
                    <Descriptions.Item label="地址">{this.state.info.address}</Descriptions.Item>
                </Descriptions>
                <Modal
                    visible={this.state.visible}
                    title="修改信息"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary"  htmlType="submit" onClick={this.handleOk}>
                        提交
                    </Button>,
                    ]}>
                    <Form>
                        <Form.Item name="phone" label="电话号码" >
                            <Input placeholder="不修改可不填写" onChange = {(e)=>this.Getphone(e)}/>
                        </Form.Item>
                        <Form.Item name="email" label="电子邮箱" >
                            <Input placeholder="不修改可不填写" onChange = {(e)=>this.Getemail(e)}/>
                        </Form.Item>
                        <Form.Item name="address" label="住址" >
                            <Input placeholder="不修改可不填写" onChange = {(e)=>this.Getaddress(e)}/>
                        </Form.Item>
                        <Form.Item name="description" label="个人简介" >
                            <TextArea rows={4} placeholder="不修改可不填写" onChange = {(e)=>this.Getdescription(e)}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default teacherinfo;