import React, {Component} from 'react';
import { Menu, Layout } from 'antd';
import menuList from './MenuList'
import ListCourse from './ListCourse.jsx'
import axios from 'axios';
const { Sider, Content } = Layout;

class ShowCourse extends Component {
	state = {
		current: "所有",
		courses:[],
	}

	componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get("/course",
        ).then(res=>{
            this.setState({
                courses: res.data.data
            })
        });
	}

	handleClick=(e)=>{
		this.setState({
			current: e.key,
		});

		let url = "/classification/" + e.key
        if(e.key === "所有"){
            url = ""
        }
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get("/course"+url,
        ).then(res=>{
            this.setState({
                courses: res.data.data
            })
        });
	};
	
	getMenuNodes = (menuList) =>{
		return menuList.map(item=>{
			return(
			  <Menu.Item key ={item.title} onClick={this.handleClick=this.handleClick.bind(this)}>
				<span>{item.title + "学院"}</span> 
			  </Menu.Item>
			)
		})
	};

	render() {
		return (
		<div>
			<Layout>
				<Sider style = {{marginLeft:'10%'}} theme={"light"} >
				<Menu
				 onClick={this.handleClick}
				 selectedKeys={[this.state.current]}
				 mode="inline"
				 theme="bright"
				>
					{this.getMenuNodes(menuList)}
				</Menu>
				</Sider>
				<Content> <ListCourse courses = {this.state.courses} /> </Content>
			</Layout>
		 </div>
		);
	}
}
export default ShowCourse;