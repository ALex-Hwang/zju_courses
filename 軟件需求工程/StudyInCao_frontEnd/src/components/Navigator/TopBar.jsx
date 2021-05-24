import React from 'react';
import {Button,Input} from 'antd';
import TopMenu from './TopMenu';
import Logo from '../../assets/logo.jpg';
import '../../assets/css/Menu.css';
import { Link, Redirect } from 'react-router-dom';
var storage = window.localStorage;

/**
 * logo + 导航栏
 */
class TopBar extends React.Component{
    // 控制后台菜单的显示
    constructor(props) {
        super(props);
        this.state = {
            isSearch: true,
            isLoggined:storage.hasOwnProperty("name"),
            role:storage.getItem("identity")
        };
    }
    
    componentDidMount() {
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            role:storage.getItem("identity")
        };
    }

    Out=()=>{
        storage.removeItem("name")
        storage.removeItem("token")
        storage.removeItem("identity")
        this.setState = {
            isLoginIn:false,
        }

        // window.location.reload();
        window.location.href = '/study' // 注销则跳转到首页
    }
    
    onChange = (e) => {
        if(e.target.value === "" ){
            this.setState({
                isSearch: true
            })
        }
        else{
            this.setState({
                keyWord: e.target.value,
                isSearch: false
            })
        }
    }

    render(){
        if(!this.state.clickSearch){
            return(
                <div class = "header">
                    <img class = "logo" src = {Logo} alt="校徽" />
                    <div class = "title" style={{fontSize:"20pt"}}> 学在曹楼 </div>
                    <div style = {{alignSelf:'flex-end'}}> <TopMenu /> </div>
                    <Input style={{width:"25%"}} placeholder="搜索感兴趣的课程" allowClear enterButton size="middle"  onChange= {(e)=>this.onChange(e)} />
                    <Button disabled={this.state.isSearch} type="primary"><Link to = {"/study/search/"+this.state.keyWord}> 搜索 </Link></Button>
                    <div style = {{marginLeft: "auto"}}>
                        <div>{
                            this.state.isLoggined?(
                                <div>
                                    <Button type="primary" size="large"><Link to = {"/"+this.state.role}> 个人中心 </Link></Button>
                                    <Button type="primary" size="large" onClick = {this.Out} style={{marginLeft: "5px"}}> 注销 </Button>
                                </div>
                            ):(
                                <Button type="primary" size="large"><Link to ="/login"> 登录 </Link></Button>
                            )
                            }
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <Redirect to = {{pathname:'/search/'+this.state.keyWord}} />
        }
    }
}

export default TopBar