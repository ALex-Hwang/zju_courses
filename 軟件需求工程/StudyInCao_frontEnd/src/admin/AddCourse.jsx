import React from 'react'
import { Form, Input, Button, Upload, Space} from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Admin from '../assets/css/Admin.css'

{/*
    Addcourse.jsx
    Created by xxd
    作用：添加一门课程
    待办：
        1. 是否考虑课程大纲中的内容，例如考核方式、预修要求等等，也要在这里添加？
        2. 表单的提交功能还未做
*/}

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

class AddCourse extends React.Component {
	render() {
		return (
			<div class = "courseInput">
                <h2 style={{marginBottom:30}}>添加课程</h2>
                <Form
                name="addcourse"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="课程名称"
                        name="name"
                        rules={[{ required: true, message: '课程名称不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="课程类别"
                        name="type"
                        rules={[{ required: true, message: '课程类别不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="上课地点"
                        name="address"
                        rules={[{ required: true, message: '上课地点不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="上课时间"
                        name="time"
                        rules={[{ required: true, message: '上课时间不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <p>任课教师（ID）：</p>
                    <Form.List name="teacher">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                name={[field.name, 'teacher_id']}
                                fieldKey={[field.fieldKey, 'teacher_id']}
                                rules={[{ required: true, message: '教师ID不可为空' }]}
                                >
                                <Input placeholder="教师ID" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                            ))}
                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加教师
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>

                    <p>助教（ID）：</p>
                    <Form.List name="assistant">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                name={[field.name, 'assitant_id']}
                                fieldKey={[field.fieldKey, 'assitant_id']}
                                rules={[{ required: true, message: '助教ID不可为空' }]}
                                >
                                <Input placeholder="助教ID" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                            ))}
                            <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                添加助教
                            </Button>
                            </Form.Item>
                        </>
                        )}
                    </Form.List>

                    <Form.Item
                        name="upload"
                        // label="导入学生名单："
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        // extra="提示：请上传excel表格"
                    >
                        <p>导入学生名单：</p>
                        <Upload name="StudentList" action="/upload.do" listType="text">
                        <Button icon={<UploadOutlined />}>点击上传</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                        提交
                        </Button>
                    </Form.Item>


                </Form>
			</div>
		)
	}
}

export default AddCourse