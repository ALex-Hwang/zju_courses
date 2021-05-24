import React, {Component} from 'react';
// import TopBar from '../components/Navigator/TopBar';  //顶部导航栏
import {  Breadcrumb, PageHeader, Button, Descriptions, Comment, Input, Upload, message, Pagination, Form, Row, Modal} from 'antd';
import Post from '../assets/css/Post.css'
// import Comments from './Comments'
import { List, Divider } from 'antd';
// import PostContent from "./PostContent"
import { UploadOutlined } from '@ant-design/icons';
import qiushi from "./avatar/qiushi.png"
import axios from 'axios';

const { TextArea } = Input;
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



var storage = window.localStorage

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggined:storage.hasOwnProperty("name"),
        token:storage.getItem("token"),
        role:storage.getItem("identity"),
        id:storage.getItem("name"),
        postID:this.props.match.params.id,
        postInfo:[],
        commentList:[],
        coursename:"",
    };
  }
  
  componentDidMount(){
    axios.defaults.baseURL = 'http://47.100.55.98:5000';
    
    axios.get('/post/'+this.state.postID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
        res=>{
            this.setState({
                postInfo:res.data.data,
            });
            console.log(res.data.data);
            axios.get('/course/'+this.state.postInfo.course_id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
              res=>{
                this.setState({
                  coursename:res.data.data.name,
                });
                console.log(res.data.data.name);
              }
            )
        }
    );

    axios.get('/replies/'+this.state.postID.toString(), {headers:{'Token': this.state.token.toString()}}).then(
      res=>{
          this.setState({
              commentList:res.data.data,
          });
          console.log(res.data.data);
      }
    );

  }

  jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
  }
  
  deletepost = () => {  // 删除帖子
    console.log("delete post:",this.state.postID)

    axios({
			baseURL: 'http://47.100.55.98:5000',
			method: 'delete',
			url: '/post/'+this.state.postID,
			headers: {
				"Token": this.state.token.toString(),
			},
		}).then(function (response) {
			console.log(response);
		  }).catch(function (error) {
			console.log(error);
      });
      
      this.delePostSuccess()
  }
  
  delePostSuccess() {
    Modal.success({
      content: '删除帖子成功',
      onOk: ()=>this.postOK()
    });
  }

  postOK(){
    window.history.back()
  }

  deleComSuccess() {
    Modal.success({
      content: '删除回复成功',
      onOk: ()=>window.location.href = window.location.href
    });
  }

  delecomment = (item) =>{    // 删除回复
    console.log("delete reply:",item.reply_id)

    axios({
			baseURL: 'http://47.100.55.98:5000',
			method: 'delete',
			url: '/reply/'+item.reply_id,
			headers: {
				"Token": this.state.token.toString(),
			},
		}).then(function (response) {
			console.log(response);
		  }).catch(function (error) {
			console.log(error);
      });

      this.deleComSuccess()
  }


	getBreadcrumb() {				// 面包屑：左上角路径
		return (
			<Breadcrumb>
			<Breadcrumb.Item>课程论坛</Breadcrumb.Item>
      <Breadcrumb.Item><a href={'/study/bbs/'+this.state.postInfo.course_id}>{this.state.coursename}</a></Breadcrumb.Item>
			<Breadcrumb.Item>{this.state.postInfo.title}</Breadcrumb.Item>
			</Breadcrumb>)
	}

  // 发表回复
  onFinish = (values) => {
    console.log('Success:', values);
		console.log('/replies/'+this.state.postID)
		var params = {
			user_id: this.state.id, 
			content: values.newcomment
		}

		axios({
			baseURL: 'http://47.100.55.98:5000',
			method: 'post',
			url: '/replies/'+this.state.postID,
			headers: {
				"Token": this.state.token.toString(),
			},
			params
		}).then(function (response) {
			console.log(response);
		  }).catch(function (error) {
			console.log(error);
      });
      
      this.subComSuccess()
  };
  
  subComSuccess() {
		if(this.state.role=='admin'){
			Modal.error({
				content: '管理员不能回复帖子！',
				onOk: ()=>window.location.href = window.location.href
			});
		}
		else{
			Modal.success({
		  		content: '回复成功！',
		  		onOk: ()=>window.location.href = window.location.href
			});
		}
  }

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	

	render() {
		return(
			<div className = "comment-back-ground">
				{/* <TopBar/> */}
        <div className="site-page-header-ghost-wrapper">
        {this.getBreadcrumb()}
        <br/>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={this.state.postInfo.title}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="作者"><a>{this.state.postInfo.user_id}</a></Descriptions.Item>
              <Descriptions.Item label="发帖时间">{this.state.postInfo.time}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
        
        {/* 作者帖子内容 */}
        <div class="comment-list">
          <Comment
              actions={[<p>作者</p>]}
              author={this.state.postInfo.user_id}
              avatar={qiushi}
              content={this.state.postInfo.content}
              datetime={this.state.postInfo.time}
            /> 
        {
          this.state.role=="student"? (
            <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发表回复</Button>
            
          ):(
            <Row>
              <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发表回复</Button>
              <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.deletepost }>删除帖子</Button>
            </Row>
          )
        }
        
        </div>

        <div><br/></div>

        {/* 回复列表 */}
        <div className="comment-list">
          {/* <Comments /> */}          
          <List
              className="comment-list"
              // header={`${this.state.ComList.length}个回复`}
              itemLayout="horizontal"
              dataSource={this.state.commentList}
              renderItem={item => (              
              <li>
                <Comment
                      // actions={ [<p>{item.index}楼</p>]}
                      author={item.user_id}
                      avatar={qiushi}
                      content={item.content}
                      datetime={item.time}
                />
                <div>{
                  this.state.role=="student"? ('')
                    :(<Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.delecomment(item)}>删除回复</Button>)
                }
                  
                </div>
                  
                  
                  <Divider />
              </li>
              )}
            />
        </div>

        <div class="Pagination"><br/><Pagination defaultCurrent={1} total={1} /></div>
        

        {/* 回复框 */}
        <div class="comment-box">
          <p>发表回复</p>

          <Upload {...props}>
            <Button style={{marginBottom: 20}} icon={<UploadOutlined />}>上传附件</Button>
          </Upload>

          <Form
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            
            <Form.Item
              // label="回复内容"
              name="newcomment"
              rules={[{ required: true, message: '请输入回复内容!' }]}
            >
              <TextArea  showCount maxLength={500} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
              发表
              </Button>
            </Form.Item>			
          </Form>

          {/* <div style={{textAlign: "center", marginTop: 10}}><Button type="primary">回复</Button></div> */}
        </div>

        <div><br/></div>
			</div>

     
		)
	}
}

export default PostDetail;