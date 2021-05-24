import React from 'react';
import {List,Avatar} from 'antd';
import CourseRec from './CourseRec.js'
import Logo from '../assets/logo.jpg';

class courseRec extends React.Component{
    render() {
        return (
            <div class="carddiv">
                <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                    onchange: page => {
                        console.log(page)
                    },
                    pageSize: 5
                    }}
                    dataSource={CourseRec}
                    renderItem={item => (
                        <List.Item
                        key={item.id}
                        >
                        <List.Item.Meta
                        avatar={<Avatar src={Logo}/>}
                        title={<a href={item.key}>{item.name}</a>}
                        description={item.name}
                        />
                        </List.Item>
                    )
                    }
                />                
            </div>
        );
    }    
}
export default courseRec