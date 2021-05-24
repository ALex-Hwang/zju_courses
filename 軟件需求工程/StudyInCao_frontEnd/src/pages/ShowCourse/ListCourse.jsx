import React from 'react';
import { List, Avatar} from 'antd';
import Logo from '../../assets/logo.jpg';
import '../../assets/css/Course.css';

/**
 * 不同类的课程列表展示页面
 */
class ListCourse extends React.Component{

    render(){
        return(
            <div className="showCourse">
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                pageSize: 5,
                }}
                dataSource={this.props.courses}
                renderItem={item => (
                <List.Item  key={item.id}>
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
        )
    }
}

export default ListCourse