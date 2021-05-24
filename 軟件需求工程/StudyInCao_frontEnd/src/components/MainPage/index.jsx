import React, {Component} from 'react';
import '../../assets/css/Menu.css';

//布局组件
import MainContent from "../MainContent/index";//主题
import TopBar from '../Navigator/TopBar';  //顶部导航栏

/**
 * 首页
 */
class MainPage extends Component {
	render() {
		return (
			<div>
				<TopBar/>
				<MainContent/>
			</div>
		);
	}
}
export default MainPage;