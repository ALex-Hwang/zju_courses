import React from 'react'
import { Table, Input, Button, Space, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import post from './post'
import axios from 'axios'

{/*
    ManageBBS.jsx
    Created by xxd
	作用：
		1. 管理课程论坛的帖子
	功能：
		1. 点击'管理评论'跳转到帖子详情页，帖子详情页中每个评论都要有删除按钮，只有管理员能点击/看到删除按钮
		2. 点击'删除'删除整个帖子
*/}

var storage = window.localStorage

class ManageBBS extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isLoggined:storage.hasOwnProperty("name"),
          token:storage.getItem("token"),
          role:storage.getItem("identity"),
    id:storage.getItem("name"),
    bbsID:this.props.match.params.id,
    postList:[],
    coursename:"",    
    };
  }
  state = {
    searchText: '',
    searchedColumn: '',
  };

  componentDidMount(){
      axios.defaults.baseURL = 'http://47.100.55.98:5000';

      axios.get('/course', {headers:{'Token': this.state.token.toString()}}).then(     // 总共有几门课
        res=>{
          var cn;
          for(cn=1;cn<=res.data.data.length;cn++){
            axios.get('/posts/'+cn.toString(), {headers:{'Token': this.state.token.toString()}}).then(     // 第cn门
              res=>{
                  var i;
                  for(i=0;i<res.data.data.length;i++){
                    this.setState({
                      postList: [...this.state.postList, res.data.data[i]]
                    }
                    )
                  }
                  // console.log("post",this.state.postList);
              }
            );  
          }

          console.log("total course:",res.data.data.length);
        }
      );
  
  } 

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  delePostSuccess() {
    Modal.success({
      content: '删除帖子成功',
      onOk: ()=>this.postok()
    });
  }

  postok(){
    window.location.href = window.location.href
  }

  delepost = (pID) => {  // 删除帖子
    axios({
			baseURL: 'http://47.100.55.98:5000',
			method: 'delete',
			url: '/post/'+pID,
			headers: {
				"Token": this.state.token.toString(),
			},
		}).then(function (response) {
			console.log(response);
		  }).catch(function (error) {
			console.log(error);
      });
      
      this.delePostSuccess()
  }

  render() {
    const columns = [
      {
        title: '所属课程ID',
        dataIndex: 'course_id',
        key: 'course_id',
        width: '10%',
        ...this.getColumnSearchProps('course_id'),
        // defaultSortOrder: 'descend',
		    sorter: (a, b) => a<b?1:-1,
		    sortDirections: ['ascend','descend'],
      },
      {
        title: '帖子ID',
        dataIndex: 'post_id',
        key: 'post_id',
        width: '10%',
        ...this.getColumnSearchProps('post_id'),
      },
      {
        title: '帖子标题',
        dataIndex: 'title',
        key: 'title',
        width: '25%',
        ...this.getColumnSearchProps('title'),
	  },
	  {
        title: '发帖时间',
        dataIndex: 'time',
        key: 'time',
        width: '15%',
        ...this.getColumnSearchProps('time'),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: '20%',
        render: (text, record) => {
          // console.log(record)
            return (
              <Space size="middle">
              <a href={"/study/post/"+record.post_id}>管理评论</a>
			        {/* <a>修改</a> */}
              <a onClick={()=>this.delepost(record.post_id)}>删除</a>
            </Space>
            )
        }
      },
    ];
    return(
        <div>
            <h2>帖子列表</h2>
            <Table columns={columns} dataSource={this.state.postList} />
        </div>
    )
  }
}

export default ManageBBS

