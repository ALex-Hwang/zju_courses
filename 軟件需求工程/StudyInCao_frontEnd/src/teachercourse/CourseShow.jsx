import React from 'react';
import axios from "axios";
import {Row, Col} from 'antd';
import '../student/studentcss.css'

var storage=window.localStorage;


class CourseShow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            Courseid:this.props.courseID,
            coursename:"",
            coursetime:[],
        };
    }

    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/courseList/teacher/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                var allcourse = res.data.data;
                var j;
                var name,ctime=[];
                for(j=0;j<allcourse.length;j++){
                    if(allcourse[j].id===Number(this.state.Courseid)){
                        name=allcourse[j].name;
                        ctime.push({date:allcourse[j].date,no:allcourse[j].no});
                    }
                }

                this.setState({
                    coursename:name,
                    coursetime:ctime,
                });
            }
        );
    }

    gettime=(coursetime)=>{
        if(coursetime===[])
            return "";
        var res="";
        var i;
        for(i=0;i<coursetime.length;i++){
            switch(Number(coursetime[i].date)){
                case 1:
                    res=res+"周一";
                    break;
                case 2:
                    res=res+"周二";
                    break;
                case 3:
                    res=res+"周三";
                    break;
                case 4:
                    res=res+"周四";
                    break;
                case 5:
                    res=res+"周五";
                    break;
                case 6:
                    res=res+"周六";
                    break;
                case 7:
                    res=res+"周日";
                    break;
            }
            for(var j=0;j<coursetime[i].no.length;j++){
                if(j!==coursetime[i].no.length-1){
                    res=res+coursetime[i].no[j].toString()+",";
                }
                else
                    res=res+coursetime[i].no[j].toString()+"节 "
            }
        }
        return res;
    };

    render() {
        return(
            <div class="Teachers">
                <Row>
                    <Col span={6} offset={3}>
                        <div  >
                            <h1 className="Namefont">{this.state.coursename}</h1>
                            <h3 className="Namefont">{"上课时间:"+this.gettime(this.state.coursetime)}</h3>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CourseShow