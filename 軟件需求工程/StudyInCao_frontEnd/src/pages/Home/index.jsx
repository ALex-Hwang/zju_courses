import React, {Component} from 'react';

//布局组件
import Banner from "./Carousel"
import CourseCards from "./CourseCards"

/**
 * 首页显示走马灯+推荐课程
 */
class HomePage extends Component {
	render() {
		return (
			<div>
				<Banner />
                <CourseCards />
			</div>
		);
	}
}
export default HomePage;