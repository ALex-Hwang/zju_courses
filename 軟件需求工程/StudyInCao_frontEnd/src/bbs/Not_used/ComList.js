import moment from 'moment';
import { Tooltip, Avatar, Space } from 'antd';
import avatar1 from "./avatar/feizhai.jpg"
import avatar2 from "./avatar/cake.png"

const ComList = [
    { id: '2',
      actions: [<space><p>2楼</p></space>,<span key="comment-delete">-[删除回复]</span>],
      author: <a>路人甲</a>,
      avatar: <Avatar src={avatar1} alt="路人甲"/>,
      content: (
        <p>
          阿巴阿巴
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
    { id: '3',
      actions: [<p>3楼</p>, <span key="comment-delete">-[删除回复]</span>],
      author: <a>路人乙</a>,
      avatar: <Avatar src={avatar2} alt="路人乙"/>,
      content: (
        <p>
          是不是磁盘空间不够了
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(2, 'days').fromNow()}</span>
        </Tooltip>
      ),
    },
  ];

  export default ComList;