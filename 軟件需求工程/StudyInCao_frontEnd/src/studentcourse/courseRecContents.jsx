import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import homeworkPage from './homeworkPage'
import coursewarePage from './coursewarePage'
import CourseShow from "./CourseShow";
import Topbar from "../components/Navigator/TopBar"
import './Course.css';

class courseRecContents extends Component{
    
    render(){
        return(
            <div>
                <Topbar/>
                <CourseShow courseID= {this.props.match.params.id}/>
                <div class="returnbutton">
                    <div class="content">
					<Switch>
                        <Route exact path="/course/:id/CourseRes/0/:SourceID" component={coursewarePage}/>
                        <Route exact path="/course/:id/CourseRes/1/:SourceID" component={homeworkPage}/>
					</Switch>
				</div>
                </div>
            </div>
        )
    }
}
export default courseRecContents