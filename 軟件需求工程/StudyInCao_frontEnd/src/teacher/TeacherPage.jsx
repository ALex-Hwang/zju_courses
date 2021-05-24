import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom';
//布局组件

import Showteachercourse from './teachercourse'
import teacherinfo from "./teacherinfo";
import Showteachermenu from './teachermenu'
import Showteachershow from './teachershow'
import Topbar from '../components/Navigator/TopBar'

import './teachercss.css'

class TeacherPage extends Component {
	render() {
		return (
			<div >
				<Topbar/>
				<Showteachershow/>
				<Showteachermenu/>
				<div>
					<Switch>
						<Route exact path = "/teacher" component = {Showteachercourse}/>
						<Route exact path = "/teacher/teacherinfo" component = {teacherinfo}/>
					</Switch>
				</div>
			</div>
		);
	}
}
export default TeacherPage;