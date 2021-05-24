import React, {Component} from 'react';
import CourseContent from './CourseContent'

/**
 * 课程详细信息页面
*/
class Course extends Component{
    render(){
        return(
            <div style={{marginLeft:"10%",}}>
                <CourseContent pageID = {this.props.match.params.id} />
            </div>
        );
    }
}
export default Course;