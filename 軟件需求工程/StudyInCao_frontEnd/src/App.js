import React, {Component} from 'react';

//路由
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//布局组件
import MainPage from "./components/MainPage/index.jsx"
import StudentTest from "./student/StudentTest"
import TeacherPage from "./teacher/TeacherPage";
import Login from "./pages/Login/Login"
import CourseContent from "./studentcourse/CourseContent";
import courseRecContents from "./studentcourse/courseRecContents"
import TeacherCourseContent from "./teachercourse/CourseContent"
import AdminContent from "./admin/AdminContent"
import CourseSource from "./teachercourse/CourseSourcePage"

var storage = window.localStorage;

class App extends Component {
 
	render() {
		storage.setItem("TopbarKey","首页");
		return (
			<div className="App" >
				<BrowserRouter>
				<Switch>
					<Route exact path = "/" component = {MainPage}/>
					<Route path = "/study" component = {MainPage}/>
					<Route path = "/student" component = {StudentTest}/>
					<Route path = "/teacher" component={TeacherPage}/>
					<Route path = "/admin" component={AdminContent}/>
					<Route exact path = "/login" component = {Login} />
					<Route exact path = "/course/:id/:function" component={CourseContent}/>
					<Route exact path = "/course/:id/CourseRes/:type/:SourceID" component={courseRecContents}/>
					<Route exact path = "/myCourse/:id/:function" component={TeacherCourseContent}/>
					<Route exact path = "/myCourse/:id/CourseSource/:type/:SourceID" component={CourseSource}/>
				</Switch>
				</BrowserRouter>
			</div>
		);
	}
}
export default App;