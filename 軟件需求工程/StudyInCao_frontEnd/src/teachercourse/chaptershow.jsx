import React from 'react';
import axios from 'axios';
import {Avatar, Collapse, List, Space ,Modal, Button,Form ,Input} from "antd";
import './Course.css'
import {BulbFilled, EditFilled, SnippetsFilled} from '@ant-design/icons';
import {Link} from "react-router-dom";
const numbers=[1,2,3,4,5,6,7,8,9,10];
const { Panel } = Collapse;

var storage=window.localStorage;

class chaptershow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            token:storage.getItem("token"),
            visible1:false,
            visible2:false,
            chaptername:"",
            sourcemame:"",
            chaptername2:"",
            sourcetype:"",
            chapternum:0,
            source:[],
            header:[],
        };
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/resource/course/'+this.state.courseID).then(
            res=>{
                var result=res.data.data;
                var source=this.state.source;
                var num=result.length;
                this.setState({
                    chapternum:num,
                });
                for(var i=0;i<num;i++){
                    var num2=result[i].resources.length;
                    var ele=[];
                    for(var j=0;j<num2;j++){
                        ele.push({
                            id:result[i].resources[j].id,
                            title:result[i].resources[j].title,
                            content:result[i].resources[j].content,
                            time:result[i].resources[j].time,
                            file:result[i].resources[j].file,
                            type:'0'
                        });
                    }
                    source[i]=ele;
                }
                this.setState({
                    source:source,
                });
                axios.get('/homework/course/'+this.state.courseID).then(
                    res=>{
                        var result=res.data.data;
                        var source=this.state.source;
                        var num=result.length;
                        for(var i=0;i<num;i++){
                            var num2=result[i].resources.length;
                            var ele=source[i];
                            for(var j=0;j<num2;j++){
                                ele.push({
                                    id:result[i].resources[j].id,
                                    title:result[i].resources[j].title,
                                    content:result[i].resources[j].content,
                                    time:result[i].resources[j].time,
                                    deadline:result[i].resources[j].deadline,
                                    type:'1'
                                });
                            }
                            source[i]=ele;
                        }
                        this.setState({
                            source:source,
                        });
                    }
                );
                axios.defaults.baseURL = 'http://47.100.55.98:5000';
                axios.get('/chapter/'+this.state.courseID).then(
                    res=>{
                        var list=this.state.header;
                        for(var i=0;i<this.state.chapternum;i++){
                            list.push(res.data.data[i].title);
                        }
                        this.setState({
                            header:list
                        })
                        console.log(this.state.header);
                    }
                )
            }
        );
    }

    showModal1 = () => {
        this.setState({
            visible1: true,
        });
    };

    handleOk1 = () => {
        if(this.state.chaptername===""){
            alert("请输入章节名称！");
        }
        else{
            var params = {
			title: this.state.chaptername,
		    };
            axios({
                baseURL: 'http://47.100.55.98:5000',
                method: 'post',
                url: '/chapter/'+this.state.courseID+'/'+(this.state.chapternum+1).toString(),
                headers: {
				"Token": this.state.token.toString(),
			    },
                params
                }).then(()=>{
                     this.setState({ visible1: false });
                     var num=this.state.chapternum+1;
                     var header=this.state.header;
                     header.push(this.state.chaptername);
                     this.setState({
                         header:header,
                         chapternum:num,
                     })
                }).catch(function (error) {
                        console.log(error);
                      });
        }
    };

    handleCancel1 = () => {
        this.setState({ visible1: false });
    };


    getheader=(num)=>{
        return this.state.header[num-1];
    };

    getcolor=(item)=>{
        if(item.type==="0")
            return "#BDB76B";
        else if(item.type==="1")
            return "#008000";
        else if(item.type==="2")
            return "#4682B4"
    };

    geticon=(item)=>{
      if(item.type==="0")
            return <BulbFilled />;
        else if(item.type==="1")
            return <EditFilled/>;
        else if(item.type==="2")
            return <SnippetsFilled />;
    };

    GetChaptername=(e)=>{
        this.setState({
            chaptername:e.target.value,
        })
    };


    render() {
        return(
                <div>
                    <div class="topbutton">
                        <Space size="middle"  direction="horizontal">
                            <Button size="large" type="primary" onClick={this.showModal1}>
                                新增章节
                            </Button>
                        </Space>
                    </div>
                    <Modal
                        visible={this.state.visible1}
                        title="新增章节"
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
                            <Form.Item name="chapter" label="章节名称" rules={[{ required: true}]}>
                                <Input placeholder="请输入章节名称" onChange = {(e)=>this.GetChaptername(e)}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Space size="middle" direction="vertical" class="collapsediv" >
                        {numbers.map(item=>{
                            if(item<=this.state.chapternum){
                                return(
                                    <Collapse expandIconPosition="right">
                                        <Panel header={this.getheader(item)} >
                                            <List
                                                itemLayout="vertical"
                                                size="small"
                                                dataSource={this.state.source[item-1]}
                                                renderItem={item2 => {
                                                        return(
                                                            <List.Item key={item2.id}>
                                                                <Link  to={{pathname:"/myCourse/"+this.state.courseID+'/CourseSource/'+item2.type+'/'+item2.id.toString()}}>
                                                                    <List.Item.Meta
                                                                        avatar={<Avatar style={{backgroundColor:this.getcolor(item2)}} size={30} icon={this.geticon(item2)}/>}
                                                                        title={item2.title}/>
                                                                </Link>
                                                            </List.Item>
                                                        )
                                                    }
                                                }
                                            />
                                        </Panel>
                                    </Collapse>
                                )
                            }
                        })}
                    </Space>
                 </div>
        )
    }
}

export default chaptershow;