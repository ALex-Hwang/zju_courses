import React from 'react';
import axios from 'axios';
import {Avatar,  List,} from "antd";
import {BulbFilled} from '@ant-design/icons';
import {Link} from "react-router-dom";
import './Course.css'

const numbers=[1,2,3,4,5,6,7,8,9,10];

class coursewareShow extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            visible2:false,
            chapternum2:"",
            sourcename:"",
            source:[],
        };
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/resource/course/'+this.state.courseID).then(
            res=>{
                this.setState({
                    source:res.data.data,
                });
            }
        );
    }

    render(){
        return (
            <div>
                <div class="collapsediv">
                    <List
                        itemLayout="vertical"
                        size="small"
                        dataSource={this.state.source}
                        renderItem={item2 => {
                                console.log(item2);
                                return item2.resources.map(item=>{
                                    return(
                                        <List.Item key={item.id}>
                                            {console.log(item.id)}
                                            <Link  to={{pathname:"/course/"+this.state.courseID+'/CourseRes/0/'+item.id.toString()}}>
                                                <List.Item.Meta
                                                    avatar={<Avatar style={{backgroundColor:"#BDB76B"}} size={30} icon={<BulbFilled />}/>}
                                                    title={item.title}/>
                                            </Link>
                                        </List.Item>
                                    )
                                })
                            }
                        }
                    />
                </div>
            </div>
        );
    };


}
export default coursewareShow;






