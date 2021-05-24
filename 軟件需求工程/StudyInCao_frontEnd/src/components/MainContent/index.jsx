import React from 'react'
// 导入各子系统组件
import HomePage from "../../pages/Home/index"
import HelpPage from "../../pages/Help/index"
import ShowCourse from "../../pages/ShowCourse/index"
import Course from "../../pages/ShowCourse/Course"
import BBS from "../../bbs/BBS"
import Search from "../../pages/Search/SearchContent"
import PostDetail from "../../bbs/PostDetail"
//引入路由
import {Route, Switch,Redirect} from 'react-router-dom'


/**
 * 网页主体部分
 * 设置各子系统路由
 */
class MainContent extends React.Component {
	render() {
		return (
			<div>
				<Switch>
                    <Route path="/" exact render={() => <Redirect to="/study"/>}/>
                    <Route exact path='/study' component={HomePage}/>
					<Route exact path='/study/allCourses' component={ShowCourse}/>
					<Route exact path='/study/help' component={HelpPage}/>
					<Route path='/study/search/:keyword' component={Search}/>
					<Route path='/study/allCourses/:id' component={Course}/>
					<Route path = "/study/bbs/:id" component = {BBS}/>
					<Route path = "/study/post/:id" component = {PostDetail}/>
				</Switch>
			</div>
		)
	}
}

export default MainContent