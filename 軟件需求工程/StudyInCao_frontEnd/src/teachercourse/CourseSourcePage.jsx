import React from 'react';
import {Route, Switch} from "react-router-dom";
import Topbar from "../components/Navigator/TopBar";
import CourseShow from "./CourseShow";
import courseWarePage from "./courseWarePage";
import hwPage from "./hwpage"
import './Course.css'



class CourseSourcePage extends React.Component{
    render() {
        return (
            <div>
                <Topbar/>
                <CourseShow courseID= {this.props.match.params.id}/>
                <div class="returnbutton">
                    <div class="content">
					<Switch>
                        <Route exact path="/myCourse/:id/CourseSource/0/:SourceID" component={courseWarePage}/>
                        <Route exact path="/myCourse/:id/CourseSource/1/:SourceID" component={hwPage}/>
					</Switch>
				</div>
                </div>
            </div>
        );
    }
}
export default CourseSourcePage;