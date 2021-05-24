import React from 'react';
import axios from 'axios';
import { Divider, Button, Table, Upload, message} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import coursesource from "../teachercourse/CourseSource";
import hwsource from "../teachercourse/hwsource";

var storage=window.localStorage;

const props = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
	  authorization: 'authorization-text',
	},
	onChange(info) {
	  if (info.file.status !== 'uploading') {
		console.log(info.file, info.fileList);
	  }
	  if (info.file.status === 'done') {
		message.success(`${info.file.name} file uploaded successfully`);
	  } else if (info.file.status === 'error') {
		message.error(`${info.file.name} file upload failed.`);
	  }
	},
  };

class homeworkPage extends React.Component{
    formRef = React.createRef()
    constructor(props) {
        super(props);
        this.state={
            visible:false,
            visible2:false,
            courseinfo:coursesource[Number(this.props.match.params.SourceID)-1],
            handleitem:-1,
            grade:"",
            content:"",
            courseID:this.props.match.params.id,
            sourceID:this.props.match.params.SourceID,
            source:"",
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            list:[],
        }
    }

    getdata=(source)=>{
        var ele;
        var data=[];
        var i;
        for(i=0;i<source.length;i++){
            if(source[i].stuid===window.localStorage.getItem("name").toString()){
                ele={
                    state:source[i].state,
                    grade:source[i].grade
                }
                data.push(ele)
            }
        }
        return data;
    }

    
    uploadState=(source)=>{
        var i;
        for(i=0;i<source.length;i++){
            if(source[i].stuid===window.localStorage.getItem("name").toString()){
                source[i].state = 1;
            }
        }
       
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/homework/course/'+this.state.courseID).then(
            res=>{
                var source=res.data.data;
                var result;
                source.map(item=>{
                    item.resources.map(item2=>{
                        if(item2.id.toString()===this.state.sourceID){
                            result=item2;
                        }
                    })
                });
                axios.get('/homework/grade/student/'+this.state.sourceID+'/'+this.state.id.toString(),{headers:{'Token': this.state.token.toString()}}).then(
                    res=> {
                        var grade=res.data.data;
                        console.log(grade.text);
                        var ele={state:'',grade:''};
                        if(grade.text===null&&grade.file===null)
                            ele.state='0';
                        else
                            ele.state='1';
                        if(grade.grade===null)
                            ele.grade='';
                        else
                            ele.grade=grade.grade;
                        var list=[];
                        list.push(ele);
                        this.setState({
                            source:result,
                            list:list
                        })
                    }
                )
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

    render() {
        const columns=[
            {
                title:'作业文件',
                dataIndex:'state',
                key:'hwfile',
                align:'center',
                render:text=>{
                    if(text==='0')
                        return (
                            <Upload {...props}>
								<Button icon={<UploadOutlined />} onClick={this.uploadState(hwsource)}>未交，点击上传</Button>
							</Upload>
                        )
                    else
                        return(
                            <Upload {...props}>
								<Button icon={<UploadOutlined />}>已交，重新上传</Button>
							</Upload>
                        )
                }
            },
            {
                title:'成绩(点击查看评分详情)',
                dataIndex:'grade',
                key:'grade',
                align:'center',
                render:text=>{
                    if(text==="")
                        return(
                            <p>未评分</p>
                        );
                    else
                        return <p>{text}</p>;
                }
            },
            ];
        return(
            <div>
                <h1>{this.gettitle()}</h1>
                <div  class="time">
                    <span class="greybox">{"开放时间："+this.getstart()}</span>
                    <span class="greybox">{"截至时间：" + this.getend()}</span>
                </div>
                <h2>作业要求</h2>
                <Divider/>
                <div class="des">{this.getcontent()}</div>
                <h3>我的作业</h3>
                <Divider/>
                <div>
                    <Table  columns={columns} dataSource={this.state.list} bordered/>
                </div>
                
            </div>
        )
    }
}
export default homeworkPage;