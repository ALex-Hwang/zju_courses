import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom';
//布局组件
import Showthestudent from "./studentshow";
import ShowthemenuStudent from "./studentmenu";
import Showthecourse from "./studentcourse";
import Courselist from "./courselist.jsx";
import studentnotice from "./StudentNotice"
import studenttodo from "./StudentTodo"
import TopBar from "../components/Navigator/TopBar"

import './studentcss.css'

class StudentTest extends Component {
	render() {
		return (
			<div >
				<TopBar/>
				<Showthestudent/>
				<ShowthemenuStudent/>
				<div>
					<Switch>
						<Route exact path = "/student" component = {Showthecourse}/>
						<Route exact path = "/student/courselist" component = {Courselist}/>
						<Route exact path = "/student/notice" component = {studentnotice}/>
						<Route exact path = "/student/todo" component={studenttodo}/>
					</Switch>
				</div>
			</div>
		);
	}
}
export default StudentTest;