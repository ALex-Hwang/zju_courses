import moment from 'moment';
import { Tooltip, Avatar } from 'antd';
import qiushi from "./avatar/qiushi.png"

const PostContent = {
      id: '1',
      actions: [<p>作者-</p>, <p>1楼</p>, <span key="comment-delete">-[删除帖子]</span>],
      author: <a>呜呜呜</a>,
      avatar: <Avatar src={qiushi} alt="呜呜呜"/>,
      content: (
        <p>
          编译的时候没报错，但重启就只有光标在闪了，这是为啥啊？
        </p>
      ),
      datetime: (
        <Tooltip title={moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment().subtract(3, 'days').fromNow()}</span>
        </Tooltip>
      ),
    };

  export default PostContent;