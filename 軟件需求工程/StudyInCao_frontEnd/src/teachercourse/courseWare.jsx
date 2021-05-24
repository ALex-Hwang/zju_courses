import React from 'react';
import axios from 'axios';
import { Avatar, Button, Form, Input, List, Modal, Select,Upload } from "antd";
import {BulbFilled,UploadOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import './Course.css'
const numbers=[1,2,3,4,5,6,7,8,9,10];
const { Option } = Select;

var storage=window.localStorage;

class courseWare extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            token:storage.getItem("token"),
            visible2:false,
            chaptername2:"",
            sourcename:"",
            time:"2021.",
            source:[],
            header:[],
            chapternum:0,
            fileList: [],
            uploading: false,
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
        if(this.state.chaptername2===""||this.state.sourcename===""){
            alert("所有信息都是必填的！");
        }
        else{
            var params = {
			title: this.state.sourcename,
		    };
            const { fileList } = this.state;
            var formdata=new FormData();
            formdata.append('content',this.state.sourcename);
            formdata.append('file',fileList[0]);
            console.log(formdata);
            this.setState({
              uploading: true,
            });
            axios({
                baseURL: 'http://47.100.55.98:5000',
                method: 'post',
                url: 'resource/chapter/'+this.state.chaptername2.toString(),
                headers: {
				"Token": this.state.token.toString(),
                "Content-Type":'multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
			    },
                data: formdata
                ,
                params
                }).then(()=>{
                    axios.defaults.baseURL = 'http://47.100.55.98:5000';
                    axios.get('/resource/course/'+this.state.courseID).then(
                        res=>{
                            this.setState({
                                source:res.data.data,
                                uploading: false,
                                visible2: false
                            });
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

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/resource/course/'+this.state.courseID).then(
            res=> {
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
                            source:result,
                            header:list,
                            chapternum: num,
                        });
                    }
                )
            }
            )
    }

    render() {
        const { uploading, fileList } = this.state;
         const props = {
          onRemove: (file) => {
            this.setState((state) => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });
          },
          beforeUpload: (file) => {
            this.setState(state => ({
              fileList: [...state.fileList, file],
            }));
            return false;
          },
          fileList,
        };
        return(
            <div>
                <div className="topbutton">
                    <Button size="large" type="primary" onClick={this.showModal2}>
                        新增课件
                    </Button>
                    <Modal
                        visible={this.state.visible2}
                        title="新增课件"
                        onOk={this.handleOk2}
                        onCancel={this.handleCancel2}
                        footer={[
                        <Button key="back" onClick={this.handleCancel2}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  htmlType="submit" onClick={this.handleOk2} loading={uploading}>
                            {uploading ? '上传中' : '点击发布' }
                        </Button>,
                        ]}>
                        <Form>
                            <Form.Item name="课件名称" label="课件名称"  rules={[{ required: true}]}>
                                <Input placeholder="请输入课件名称" onChange = {(e)=>this.GetSourcename(e)}/>
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
                            <Form.Item name="附件" label="附件上传"  rules={[{ required: false}]}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>选择文件</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
                <div className="collapsediv">
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={this.state.source}
                        renderItem={item2 => {
                            return item2.resources.map(item => {
                                return (
                                    <List.Item key={item.id}>
                                        <Link
                                            to={{pathname: "/myCourse/" + this.state.courseID + '/CourseSource/0/' + item.id.toString()}}>
                                            <List.Item.Meta
                                                avatar={<Avatar style={{backgroundColor: "#BDB76B"}} size={30}
                                                icon={<BulbFilled/>}/>}
                                            title={item.title}/>
                                        </Link>
                                    </List.Item>
                                )
                            })
                        }
                        }
                    />
                </div>
            </div>
        )
    }
}

export default courseWare;