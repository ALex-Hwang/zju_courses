import React from 'react';
import axios from 'axios';
import { List, Avatar, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import CourseCards from "../Home/CourseCards"
import '../../assets/css/Course.css';
import menuList from '../ShowCourse/MenuList'
const { Sider, Content } = Layout;

class SearchContent extends React.Component{
    state = {
        results: [],
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get("/course/search/"+this.props.match.params.keyword
        ).then(res=>{
            this.setState({
                results: res.data.data
            })
        });
    }
    
    componentDidUpdate (prevProps) {
        let oldId = prevProps.match.params.keyword
        let newId = this.props.match.params.keyword
        if (newId !== oldId){
            axios.defaults.baseURL = 'http://47.100.55.98:5000';
            axios.get("/course/search/"+ newId
            ).then(res=>{
                this.setState({
                    results: res.data.data
                })
            });
        }
    }


    getMenuNodes = (menuList) =>{
		return menuList.map(item=>{
			return(
			  <Menu.Item key ={item.title}>
                  <Link to="/study/allCourses"> {item.title + "学院"} </Link>
			  </Menu.Item>
			)
		})
	};
    
    render(){
        return(
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

                <Content >
                    <div className="showCourse">
                    <List
                        itemLayout="vertical"
                        bordered
                        pagination={{
                        pageSize: 5,
                        }}
                        dataSource={this.state.results}
                        renderItem={item => (
                        <List.Item key={item.id}>
                        <List.Item.Meta
                        avatar={<Avatar src={Logo} />}
                        title={<a href={'/study/allCourses/'+ item.id}>{item.name}</a>}
                        description={item.teacher_name +"\t" +item.general}
                        />
                        {item.introduce}
                        </List.Item>
                        )}
                    />
                    </div>
                </Content>
            </Layout>
            </div>
        )
    }
}

export default SearchContent