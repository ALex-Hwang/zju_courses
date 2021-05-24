import React from 'react';
import {Avatar, List} from 'antd';
import {PushpinFilled  } from '@ant-design/icons';
import noticeList from './noticeList'
{/*
    AdminNotice.jsx
    Created by xxd
	作用：管理员通知
	待办：
		1. 管理员系统通知页面
*/}

class AdminNotice extends React.Component{
    getTitle=(item)=>{
        return(
            <div>
                <h3>{item.title}</h3>
                <h4>{item.time}</h4>
            </div>
        )
    }

    getTodo=(item)=>{
        return(
            <div>
                <h3>{item.content}</h3>
            </div>
        )
    }

    render(){
        return(
            <div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={noticeList}
                renderItem={item => (
                <List.Item
                    key={item.id}
                >
                <List.Item.Meta
                    avatar={<Avatar style={{backgroundColor:"#eb222d"}} size={50} icon={<PushpinFilled />}/>}
                    title={this.getTitle(item)}
                    />
                    {this.getTodo(item)}
                </List.Item>
                )}
            />
            </div>
        )
    }
}

export default AdminNotice