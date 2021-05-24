import React from 'react'
import { Table, Input, Button, Space } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import data from './data'
import axios from 'axios';

{/*
    ManageCourse.jsx
    Created by xxd
    作用：显示课程列表，可以修改、删除课程
    待办：
        1. 从数据库中获取课程列表内容
        2. 修改课程内容的界面还没做
        3. 实现删除按钮的功能
    选做功能：
        1. 点击课程名，跳转到课程详情页
        2. 点击教师/助教，跳转到个人介绍页
*/}


var storage = window.localStorage

class ManageCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggined:storage.hasOwnProperty("name"),
        token:storage.getItem("token"),
        role:storage.getItem("identity"),
        id:storage.getItem("name"),
        courseList:[],
        searchText: '',
        searchedColumn: '',
    };
  }

  componentDidMount(){
    axios.defaults.baseURL = 'http://47.100.55.98:5000';
    axios.get('/course', {headers:{'Token': this.state.token.toString()}}).then(
      res=>{
          this.setState({
            courseList:res.data.data,
          });
          console.log(res.data.data);
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

  render() {
    const columns = [
      {
        title: '课程ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: '课程名',
        dataIndex: 'name',
        key: 'name',
        // width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '教师',
        dataIndex: 'teacher_name',
        key: 'teacher_name',
        width: '20%',
        ...this.getColumnSearchProps('teacher_name'),
      },
      {
        title: '助教',
        dataIndex: 'assistant_id',
        key: 'assistant_id',
        width: '20%',
        ...this.getColumnSearchProps('assistant_id'),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: '15%',
        render: () => (
            <Space size="middle">
              <a>修改</a>
              <a>删除</a>
            </Space>
        )
      },
    ];
    return(
        <div>
            <h2>课程列表</h2>
            <Table columns={columns} dataSource={this.state.courseList} />
        </div>
    )
  }
}

// ReactDOM.render(<ManageCourse />, mountNode);

export default ManageCourse

