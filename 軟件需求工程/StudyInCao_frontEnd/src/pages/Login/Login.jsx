import React from 'react';
import { Form, Input, Button,Checkbox} from 'antd';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';
//路由
import Logo from '../../assets/logo.jpg';
import "../../assets/css/Login.css";

var storage = window.localStorage;
var loginType = ["student","teacher","assistant","admin"]

/**
 * todo: css调整
 */
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            isLogin:false,
            token: {}
        };
    }

    Login(type, e) {
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/login',{
            params:{ 
                id: this.state.username,
                password: this.state.password,
                identity: loginType[type]
            },
            headers:{
                'Token': "",
            },
        }).then(res=>{
            // 登陆成功
            if(res.data.data !== null){
                this.setState({
                    token: res.data.data,
                });

                storage.setItem("name",this.state.username);
                storage.setItem("token",this.state.token);
                storage.setItem("identity", loginType[type]);

                this.setState({
                    isLogin: true
                });

                alert("登陆成功")
            }
            else{
                alert("用户名或密码错误")
            }
        });
    };

    GetUsername=(e)=>{
        this.setState({
            username:e.target.value,
        })
    }

    GetPwd=(e)=>{
        this.setState({
            password:e.target.value,
        })
    }

    render(){
        if(this.state.isLogin === false){
            return (
                <div class="Login" >
                    <Form 
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}>
    
                    <h1 style={{ textAlign: 'center', }}>
                      <img style={{height: '44px', marginRight: 16, }} alt="logo" src={Logo} />
                      学在曹楼
                    </h1>
                    <div
                      style={{marginTop: 12, textAlign: 'center', marginBottom: 40, }}>
                      勤学 修德 明辨 笃实
                    </div>
    
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange = {(e)=>this.GetUsername(e)}/>
                    </Form.Item>
    
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange = {(e)=>this.GetPwd(e)} />
                    </Form.Item>
    
                    <Form.Item  >
                        <Button type="primary" onClick={this.Login.bind(this, 0)} style={{ marginRight:"5px", }}>
                        学生登陆
                        </Button>
                        <Button type="primary" onClick={this.Login.bind(this, 1)} style={{ marginRight:"5px", }}>
                        教师登陆
                        </Button>
                        <Button type="primary" onClick={this.Login.bind(this, 2)} style={{ marginRight:"5px", }}>
                        助教登陆
                        </Button>
                        <Button type="primary" onClick={this.Login.bind(this, 3)} style={{ marginRight:"5px", }}>
                        管理员登陆
                        </Button>
                        <Button type="primary" >
                        <Link to="/study">
                        返回
                        </Link>
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
            );
        }
        else {
            return <Redirect to = {{pathname:'/study'}}/>
        }
    }

}

export default Login