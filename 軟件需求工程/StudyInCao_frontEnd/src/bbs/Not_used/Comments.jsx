import React, {Component} from 'react';
import { Comment, List, Divider } from 'antd';
import ComList from "./ComList"


class Comments extends Component {
	render() {
		return(
			<div>
                <List
                    className="comment-list"
                    header={`${ComList.length}个回复`}
                    itemLayout="horizontal"
                    dataSource={ComList}
                    renderItem={item => (
                    <li>
                        <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                        />
                        
                        <Divider />
                    </li>
                    )}
                />
			</div>
		)
	}
}

export default Comments;