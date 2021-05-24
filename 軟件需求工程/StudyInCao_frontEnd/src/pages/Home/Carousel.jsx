import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '400px',
  width: '80%',
  color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  background: '#364d79',
  marginTop: '30px',
  marginLeft:'10%'
};

/**
 * todo: 
 * 1. 替换为图片
 * 2. （选）添加点击跳转网页
 */
class Banner extends React.Component{
    render(){
        return(
            <Carousel autoplay>
                <div>
                <h3 style={contentStyle}>学</h3>
                </div>
                <div>
                <h3 style={contentStyle}>在</h3>
                </div>
                <div>
                <h3 style={contentStyle}>曹</h3>
                </div>
                <div>
                <h3 style={contentStyle}>楼</h3>
                </div>
            </Carousel>
        )
    }
}

export default Banner