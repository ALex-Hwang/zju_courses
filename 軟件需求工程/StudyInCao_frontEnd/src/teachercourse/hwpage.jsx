import React from 'react';
import axios from 'axios';
import coursesource from "./CourseSource";
import hwsource from "./hwsource";
import { Divider, Button, Table, Form, Input, Modal} from 'antd'
const { TextArea } = Input;

var storage=window.localStorage;

class hwpage extends React.Component{
    formRef = React.createRef()
    constructor(props) {
        super(props);

        this.state={
            visible:false,
            visible2:false,
            token:storage.getItem("token"),
            courseinfo:coursesource[Number(this.props.match.params.SourceID)-1],
            handleitem:-1,
            grade:"",
            content:"",
            courseID:this.props.match.params.id,
            sourceID:this.props.match.params.SourceID,
            source:"",
            gradelist:[],
        }

    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/homework/course/'+this.state.courseID).then(
            res=>{
                var source=res.data.data;
                source.map(item=>{
                    item.resources.map(item2=>{
                        if(item2.id.toString()===this.state.sourceID){
                            axios.get('/homework/grade/all/'+item2.id.toString(),{headers:{'Token': this.state.token.toString()}}).then(
                                res=>{
                                    console.log(res.data.data);
                                    this.setState({
                                        source:item2,
                                        gradelist:res.data.data,
                                    })
                                }
                            )
                        }
                    })
                });
                console.log(this.state.source);
            }
        );
    }

    gettitle=()=>{
        if(this.state.source==="")
            return "";
        else
            return this.state.source.title;
    }

    getstart=()=>{
        if(this.state.source==="")
            return "";
        else
            return this.state.source.time;
    }

    getend=()=>{
        if(this.state.source==="")
            return "";
        else
            return this.state.source.deadline;
    }

    getcontent=()=>{
        if(this.state.source==="")
            return "";
        else
            return this.state.source.content;
    }

    showModal1 = (num) => {
        this.setState({
            visible1: true,
            handleitem:num,
        });
    };

    showModal2 = (num) => {
        this.setState({
            visible2: true,
            handleitem:num,
        });
    };

    handleCancel1 = () => {
        this.setState({ visible1: false });
    };


    handleCancel2 = () => {
        this.setState({ visible2: false });
    };



    Getgrade=(e)=>{
        this.setState({
            grade:e.target.value,
        })
    };

    Getcontent=(e)=>{
        this.setState({
            content:e.target.value,
        })
    };

    handleOk2 = (id) =>{
        if(this.state.grade===""&&id!==-1){
            this.formRef.current.resetFields();
            alert("成绩是必填的!");
        }
        else if(id!==-1){
            hwsource[id].grade=this.state.grade;
            hwsource[id].gradecontent=this.state.content;
            this.setState({
                grade:"",
                content:"",
                visible2: false,
                handleitem:-1,
            });
            this.formRef.current.resetFields();
        }
        else{
            this.setState({
                handleitem:-1,
            });
            this.formRef.current.resetFields();
        }
    };

    showgrade=(num)=>{
        if(num===-1)
            return "";
        else
            return hwsource[num].grade;
    };

    showcontent=(num)=>{
        if(num===-1)
            return "";
        else
            return hwsource[num].gradecontent;
    };

    render() {
        const columns=[
        {
            title:'姓名',
            dataIndex:'name',
            key:'name',
            align:'center'
        },
        {
            title: '学号',
            dataIndex: 'id',
            key: 'id',
            align:'center'
        },
        {
            title:'作业文件',
            dataIndex:'file',
            key:'file',
            align:'center',
            render:text=>{
                if(text===""||text===null)
                    return "未交";
                else
                    return(
                        <a href={"http://47.100.55.98:5000/"+text}>
                            点击下载
                        </a>
                    )
            }
        },
        {
            title:'成绩(点击查看评分详情)',
            dataIndex:'grade',
            key:'grade',
            align:'center',
            render:text=>{
                if(text===""||text===null)
                    return(
                        <Button type="text" onClick={()=>this.showModal2(text)}>未评分，点击评分</Button>
                    );
                else
                    return <Button type="text" onClick={()=>this.showModal1(text)}>{text}</Button>;
            }
        },
        {
            title:'修改成绩',
            dataIndex:'grade',
            key:'grade',
            align:'center',
            render:text=> {
                if(text===""||text===null)
                    return(
                        <Button type="text" onClick={()=>this.showModal2(text)}>未评分，点击评分</Button>
                    );
                else
                    return (
                        <Button type="text" onClick={() => this.showModal2(text)}>点击修改</Button>
                    );
            }
        }
        ];

        return(
            <div>
                <Modal
                    visible={this.state.visible1}
                    title="成绩详情"
                    onCancel={this.handleCancel1}
                    footer={[
                        <Button key="back" onClick={this.handleCancel1}>
                            返回
                        </Button>,
                        ]}>
                        <Form>
                            <Form.Item name="成绩" label="成绩" >
                                <h3>{this.showgrade(this.state.handleitem)}</h3>
                            </Form.Item>
                            <Form.Item name="评语" label="评语" >
                                <p>{this.showcontent(this.state.handleitem)}</p>
                            </Form.Item>
                        </Form>
                    </Modal>
                <Modal
                    visible={this.state.visible2}
                    title="作业评分"
                    onOk={()=>this.handleOk2(this.state.handleitem)}
                    onCancel={this.handleCancel2}
                    footer={[
                        <Button key="back" onClick={this.handleCancel2}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary"  htmlType="submit" onClick={()=>this.handleOk2(this.state.handleitem)}>
                            提交
                        </Button>,
                        ]}>
                        <Form ref={this.formRef}>
                            <Form.Item name="成绩" label="成绩" rules={[{ required: true}]}>
                                <Input placeholder="请输入成绩" onChange = {(e)=>this.Getgrade(e)}/>
                            </Form.Item>
                            <Form.Item name="评语" label="评语" rules={[{ required: false}]}>
                                <TextArea rows={4} placeholder="请输入评语" onChange = {(e)=>this.Getcontent(e)}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                <h1>{this.gettitle()}</h1>
                <div className="time">
                    <span className="greybox">{"开放时间：" + this.getstart()}</span>
                    <span className="greybox">{"截至时间：" + this.getend()}</span>
                </div>
                <h2>作业要求</h2>
                <Divider/>
                <div className="des">{this.getcontent()}</div>
                <h3>作业交付情况</h3>
                <Divider/>
                <div>
                    <Table  columns={columns} dataSource={this.state.gradelist} bordered/>
                </div>
            </div>
        )
    }
}
export default hwpage;