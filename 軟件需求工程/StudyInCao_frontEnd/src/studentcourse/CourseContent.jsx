import React, {Component} from 'react';
import CourseMenu from "./CourseMenu"
import Topbar from "../components/Navigator/TopBar"
import CourseShow from "./CourseShow";
import chapterShow from './chapterShow'
import coursewareShow from './coursewareShow'
import homeworkShow from './homeworkShow'
import {Route, Switch} from "react-router-dom";
class courseContent extends Component{
    render(){
        return(
            <div>
                <Topbar/>
                <CourseShow courseID= {this.props.match.params.id}/>
                <CourseMenu courseID = {this.props.match.params.id}/>
                <div>
                    <Switch>
                        <Route exact path="/course/:id/chapter" component={chapterShow}/>
                        <Route exact path="/course/:id/courseWare" component={coursewareShow}/>
                        <Route exact path="/course/:id/homework" component={homeworkShow}/>
						
                    </Switch>
                </div>
            </div>
        )
    }
}
export default courseContent