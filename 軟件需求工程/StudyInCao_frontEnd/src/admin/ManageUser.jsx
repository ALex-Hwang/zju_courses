import React from 'react'
import { Form, Table, Input, Button, Space, Row, Col, Checkbox, Divider, Upload } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import alluser from './user'
import axios from 'axios';

{/*
    ManageUser.jsx
    Created by xxd
    作用：显示用户列表+新增用户
    待办：【后端对接未完成！】
        1. 从数据库中获取用户列表，用户的身份根据数据库中的is_admin/is_teacher等动态显示
        2. 修改和删除功能还没做
        3. 实现新增用户的提交按钮的功能
*/}

var storage = window.localStorage

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggined:storage.hasOwnProperty("name"),
        token:storage.getItem("token"),
        role:storage.getItem("identity"),
        id:storage.getItem("name"),
        userList:[],
        searchText: '',
        searchedColumn: '',
    };
  }

  componentDidMount(){
    axios.defaults.baseURL = 'http://47.100.55.98:5000';
    axios.get('/user', {headers:{'Token': this.state.token.toString()}}).then(
      res=>{
          this.setState({
            userList:res.data.data,
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
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '20%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: '学生',
        dataIndex: 'is_student',
        key: 'is_student',
        width: '15%',
        render: (text) => {
          console.log(text)
          if (text==1) return <p>√</p>
          else return <p></p>
        }
        // ...this.getColumnSearchProps('is_student'),
      },
      {
        title: '老师',
        dataIndex: 'is_teacher',
        key: 'is_teacher',
        width: '15%',
        render: (text) => {
          console.log(text)
          if (text==1) return <p>√</p>
          else return <p></p>
        }
        // ...this.getColumnSearchProps('is_teacher'),
      },
      {
        title: '助教',
        dataIndex: 'is_assistant',
        key: 'is_assistant',
        width: '15%',
        render: (text) => {
          console.log(text)
          if (text==1) return <p>√</p>
          else return <p></p>
        }
      },
      {
        title: '管理员',
        dataIndex: 'is_admin',
        key: 'is_admin',
        width: '15%',
        render: (text) => {
          console.log(text)
          if (text==1) return <p>√</p>
          else return <p></p>
        }
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        // width: '15%',
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
            <h2>新增用户</h2>
            <Divider />
            <h1 style = {{ marginBottom:20}} >添加单个</h1>
            <Row>
                <Col span={6}>
                    <Form.Item
                        label="ID"
                        name="ID"
                        // rules={[{ required: true, message: 'ID不能为空' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6} style = {{ marginLeft:20}}>
                    <Form.Item
                        label="密码"
                        name="password"
                        // rules={[{ required: true, message: '姓名不能为空' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6} style = {{ marginLeft:20}}>
                    <Form.Item
                        label="姓名"
                        name="name"
                        // rules={[{ required: true, message: '姓名不能为空' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            
            <Row>
                {/* <p style = {{ marginRight:20}}>角色：</p> */}
                <Col span={4}>
                <Checkbox value="admin" style={{ lineHeight: '32px' }}>
                    管理员
                </Checkbox>
                </Col>
                <Col span={4}>
                <Checkbox value="teacher" style={{ lineHeight: '32px' }}>
                    教师
                </Checkbox>
                </Col>
                <Col span={4}>
                <Checkbox value="assistant" style={{ lineHeight: '32px' }}>
                    助教
                </Checkbox>
                </Col>
                <Col span={4}>
                <Checkbox value="student" style={{ lineHeight: '32px' }}>
                    学生
                </Checkbox>
                </Col>
                <Button style = {{ width: 90, height: 32, fontSize:14 }} type="primary">提交</Button>
            </Row>

            <h1 style = {{ marginTop:20, marginBottom:20}}>批量导入</h1>
            <Row>
                <Upload name="UserList" action="/upload.do" listType="text">
                    <Button icon={<UploadOutlined />}>点击上传</Button>
                </Upload>
                <Button span={8} style = {{ width: 90, height: 32, fontSize:14, marginLeft:20 }} type="primary">提交</Button>
            </Row>
            
            <h2 style = {{ marginTop:50 }}>用户列表</h2>
            <Divider />
            <Table columns={columns} dataSource={this.state.userList} />
        </div>
    )
  }
}

export default ManageUser

