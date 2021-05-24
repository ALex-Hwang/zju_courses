import React from 'react';
import './studentcss.css'
import axios from 'axios';

var storage = window.localStorage;
class CourseTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoggined:storage.hasOwnProperty("name"),
            token:storage.getItem("token"),
            role:storage.getItem("identity"),
            id:storage.getItem("name"),
            Course:[]
        };
    }


    componentDidMount(){
        axios.defaults.baseURL = 'http://47.100.55.98:5000';
        axios.get('/courseList/student/'+this.state.id.toString(), {headers:{'Token': this.state.token.toString()}}).then(
            res=>{
                this.setState({
                    Course: res.data.data
                });
            }
        );
    }
    getClassbyDate=(courselist,date)=>{
        if(courselist.find(item=>{
            return item.date===date;
        })){
            var result=courselist.find(item=>{
            return item.date===date;
        });
            return (
                <td>{result.name}</td>
            )
        }
        else{
            return(
                <td/>
            )
        }
    };



    getRow=(courselist,num)=>{
        var courselist_screen=courselist.filter(item=>{
            if(item.no.find(a=>{
                return a===num;
            })){
                return item;
            }
        });

        return (
            <table border="1" width="100%" align="center" class="coursetable">
                <tr>
                    <td width>{num}</td>
                    {this.getClassbyDate(courselist_screen,1)}
                    {this.getClassbyDate(courselist_screen,2)}
                    {this.getClassbyDate(courselist_screen,3)}
                    {this.getClassbyDate(courselist_screen,4)}
                    {this.getClassbyDate(courselist_screen,5)}
                    {this.getClassbyDate(courselist_screen,6)}
                    {this.getClassbyDate(courselist_screen,7)}
                </tr>
            </table>
        );
    };

    render(){
        console.log(this.state.Course);
        const Courselist = this.state.Course;
        return(
            <div class="table">
                <div>
                    <table border="1" width="100%" align="center" class="coursetable">
                        <tr>
                            <td/>
                            <td><h2>周一</h2></td>
                            <td><h2>周二</h2></td>
                            <td><h2>周三</h2></td>
                            <td><h2>周四</h2></td>
                            <td><h2>周五</h2></td>
                            <td><h2>周六</h2></td>
                            <td><h2>周日</h2></td>
                        </tr>
                    </table>
                    {this.getRow(Courselist,1)}
                    {this.getRow(Courselist,2)}
                    {this.getRow(Courselist,3)}
                    {this.getRow(Courselist,4)}
                    {this.getRow(Courselist,5)}
                    {this.getRow(Courselist,6)}
                    {this.getRow(Courselist,7)}
                    {this.getRow(Courselist,8)}
                    {this.getRow(Courselist,9)}
                    {this.getRow(Courselist,10)}
                    {this.getRow(Courselist,11)}
                    {this.getRow(Courselist,12)}
                    {this.getRow(Courselist,13)}
                </div>
            </div>
        )
    }
}
export default CourseTable
