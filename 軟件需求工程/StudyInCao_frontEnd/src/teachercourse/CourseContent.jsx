import React, {Component} from 'react';
import CourseMenu from "./CourseMenu"
import Topbar from "../components/Navigator/TopBar"
import CourseShow from "./CourseShow";
import studentList from "./studentList"
import chapter from "./chaptershow"
import notice from "./coursenotice.jsx"
import courseWare from "./courseWare"
import homework from "./homework"
import {Route, Switch} from "react-router-dom";


class courseContent extends Component{
    render(){
        return(
            <div>
                <Topbar/>
                <CourseShow courseID= {this.props.match.params.id}/>
                <CourseMenu courseID = {this.props.match.params.id} function={this.props.match.params.function}/>
                <div>
					<Switch>
                        <Route exact path="/myCourse/:id/chapter" component={chapter}/>
                        <Route exact path="/myCourse/:id/notice" component={notice}/>
                        <Route exact path="/myCourse/:id/courseWare" component={courseWare}/>
                        <Route exact path="/myCourse/:id/homework" component={homework}/>
						<Route exact path="/myCourse/:id/studentList" component={studentList}/>
					</Switch>
				</div>
            </div>
        )
    }
}
export default courseContent