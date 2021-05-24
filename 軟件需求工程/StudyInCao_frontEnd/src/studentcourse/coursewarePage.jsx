import React from 'react';
import axios from 'axios';
import {Divider,List,Button,Tooltip,} from 'antd'
import {DownloadOutlined,} from "@ant-design/icons";

class courseWarePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            courseID:this.props.match.params.id,
            sourceID:this.props.match.params.SourceID,
            source:[],
            info:"",
        }
    }

     componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/resource/course/'+this.state.courseID).then(
            res=>{
                var source=res.data.data;
                var list=[];
                source.map(item=>{
                    item.resources.map(item2=>{
                        if(item2.id.toString()===this.state.sourceID){
                            var ele={
                                id:list.length,
                                content:item2.content,
                                file:item2.file,
                            };
                            list.push(ele);
                            this.setState({
                                info:item2,
                            })
                        }
                    })
                });
                this.setState({
                    source:list,
                })
            }
        );

    }


    getname=()=>{
        if(this.state.info==="")
            return "";
        else
            return this.state.info.title;
    };

    gettime=()=>{
        if(this.state.info==="")
            return "";
        else
            return this.state.info.time;
    }

    render() {
        return(
            <div>
                <h1>{this.getname()}</h1>
                <div class="time">
                    <h3>{"开放时间："+this.gettime()}</h3>
                </div>
                <h3>附件</h3>
                <Divider/>
                <div>
                    <List itemLayout="vertical"
                      size="small"
                      dataSource={this.state.source}
                      renderItem={item2 => {
                              return(
                                  <List.Item key={item2.id} extra={
                                      <Tooltip title="下载">
                                            <a href={"http://47.100.55.98:5000/"+item2.file}>
                                                <Button type="text" icon={<DownloadOutlined />} size={30}/>
                                            </a>
                                      </Tooltip>}>
                                          <List.Item.Meta
                                          title={<h4>{item2.content}</h4>}/>
                                      </List.Item>
                              )
                        }
                      }
                />
                </div>

            </div>
        )
    }
}
export default courseWarePage;