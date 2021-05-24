import React, {Component} from 'react';
import { Breadcrumb, Divider, Button, Input, Layout,Table, Tag, Upload, message, Form, Modal} from 'antd';
// import TopBar from '../components/Navigator/TopBar';  //顶部导航栏
// import PostList from './PostList';
import { BorderBottomOutlined, UploadOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import Post from '../assets/css/Post.css'
import axios from 'axios';

const { Search } = Input;
const { TextArea } = Input;
const { Content } = Layout;
const onSearch = value => console.log(value);
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

// 定义了首行列标题
const columns = [
	{
	  title: '主题',
	  dataIndex: 'title',
	  key: 'title',
	  width: '40%',
	//   render: text => <Link to={{pathname:"/study/post/"}}>{text}</Link>,
	  render: (text, record) => {
		//   console.log(text);
		//   console.log(record.post_id);
		  return (
			<Link to={{pathname:"/study/post/"+record.post_id}}>{text}</Link>
		  );
	  }
	},
	{
		title: '作者',
		dataIndex: 'user_id',
		key: 'user_id',
		width: '30%',
		// render: text => <Link to={{pathname:"/study/post"}}>{text}</Link>,	// 路径改成个人信息页
		render : text => text,
	},
	{
		title: '时间',
		dataIndex: 'time',
		key: 'time',
		width: '30%',
		render: text => text,
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a<b? 1:-1,
		sortDirections: ['ascend'],
	},
  ];

/**
 * 论坛首页
 */

var storage = window.localStorage

class BBS extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
			id:storage.getItem("name"),
			bbsID:this.props.match.params.id,
			postList:[],
			coursename:"",
        };
    }

	// handleInfo=(e)=>{
    //     this.setState({
    //         newpost:e.target.value
	// 	})
	// 	// console.log(this.state.newpost)
    // }

	// submitPost() {
	// 	console.log(this.state.newpost);
	// }

	jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
	};
	
	getBreadcrumb() {				// 面包屑：左上角路径
		return (
			<Breadcrumb>
			<Breadcrumb.Item>课程论坛</Breadcrumb.Item>
			<Breadcrumb.Item><a link to={'/study/bbs/'+this.state.bbsID}>{this.state.coursename}</a></Breadcrumb.Item>
			</Breadcrumb>)
	}

	componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/posts/'+this.state.bbsID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                this.setState({
                    postList:res.data.data,
                });
                console.log(res.data.data);
            }
		);
		
		axios.get('/course/'+this.state.bbsID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
			res=>{
				this.setState({
					coursename:res.data.data.name,
				});
				console.log(res.data.data.name);
			}
		)
	}
	
	// 发表帖子	
	onFinish = (values) => {
		console.log('Success:', values);
		console.log('/posts/'+this.state.bbsID)
		var params = {
			title: values.newtitle,
			user_id: this.state.id, 
			content: values.newpost
		}

		axios({
			baseURL: 'http://47.100.55.98:5000',
			method: 'post',
			url: '/posts/'+this.state.bbsID,
			headers: {
				"Token": this.state.token.toString(),
			},
			params
		}).then(function (response) {
			console.log(response);
		  }).catch(function (error) {
			console.log(error);
		  });
		
		this.subPostSuccess()
	};
	
	subPostSuccess() {
		if(this.state.role=='admin'){
			Modal.error({
				content: '管理员不能发帖！',
				onOk: ()=>window.location.href = window.location.href
			});
		}
		else{
			Modal.success({
		  		content: '发表帖子成功！',
		  		onOk: ()=>window.location.href = window.location.href
			});
		}
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	
	render() {
		return(
			<div className = "post-back-ground">
				{/* <TopBar/> */}
				<div style = {{marginLeft: 200, marginTop: 10, marginRight:200}}>
					<h1>课程论坛</h1>
					{this.getBreadcrumb()}
					
					<Divider />
					
					<Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发帖</Button>
					{/* <Search placeholder="搜索帖子内容" style={{marginLeft: 10, width:"30%"}} onSearch={this.onSearch} enterButton /> */}
					
					{/* 帖子列表 */}
					<Content style = {{marginTop: 20, backgroundColor: '#ffffff'}}> 
						<Table columns={columns} dataSource={this.state.postList} />
					</Content>

					<br/>

					{/* 发帖 */}
					<div style={{backgroundColor:'#ffffff'}}>
						<div style={{marginLeft:20, marginRight:20}}>
							<br/>
							<p>发表新帖</p>
							{/* <Upload {...props}>
								<Button style={{marginBottom: 20}} icon={<UploadOutlined />}>上传附件</Button>
							</Upload> */}
							
							<Form
								onFinish={this.onFinish}
								onFinishFailed={this.onFinishFailed}
							>
								<Form.Item 
									label="帖子标题"
									name="newtitle"
									rules={[{ required: true, message: '请输入帖子标题!' }]}
								>
									<Input />
								</Form.Item>
								
								<Form.Item
									label="帖子内容"
									name="newpost"
									rules={[{ required: true, message: '请输入帖子内容!' }]}
								>
									<TextArea style={{marginTop: 10}} showCount maxLength={500} />
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit" >
									发表
									</Button>
								</Form.Item>			
							</Form>
							
							
						</div>
						<br/>
					</div>
					
					<br/>

				</div>
			</div>
		)
	}
}

export default BBS;

