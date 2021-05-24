import React from 'react';
import {Link} from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';
import '../../assets/css/Menu.css';
const { Meta } = Card;


/**
 * 首页的推荐课程组件
 */
class CourseCards extends React.Component{
    state = { 
        recCourse:[]
    }

    getCardNodes = (Courses) => {
        return Courses.map(item=>{
            return(
                <Link to={'/study/allCourses/'+ item.id}>
                    <Card hoverable style={{ width: 200, marginBottom:15}}
                    cover={<img alt={item.id} style={{height:180}} src={'http://47.100.55.98:5000/' + item.avatar}/>}>
                    <Meta title={<a href={'/study/allCourses/'+ item.id}>{item.name}</a>}   description={item.teacher_name} />
                    </Card>
                </Link>
            )
       })
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/course', {
            headers:{
                'Token':''
            }
        }).then(res=>{
            console.log(res.data.data)
            let rec = []
            for(var i=0; i<4 ;i++){
                rec.push(res.data.data[i])
            }
            this.setState({
                recCourse: rec
            });
            }
        );
    }

    render(){
        return(
            <div>
                <div class = "label"> 
                  <div style = {{ fontSize: 'x-large', paddingRight: '15px'}}>推荐课程</div>
                  <div style = {{ paddingLeft: '15px', borderLeftStyle:'solid', borderWidth:'1px'}}> <Link to= "/study/allCourses/classificationid/all"> 更多课程 </Link>  </div>
                </div>
                <div class = "recCourses">            
                    {this.getCardNodes(this.state.recCourse)}
                </div>
            </div>
        )
    }
}

export default CourseCards