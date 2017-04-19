import React from 'react';
import styles from './User.css';

import { ActivityIndicator,Tag,Icon,Flex, WhiteSpace, WingBlank,Button,InputItem} from 'antd-mobile';

function User({userData}) {

  const PlaceHolder = props => (
    <div style={{
      backgroundColor: '#ebebef',
      color: '#bbb',
      textAlign:'center',
      height: '0.6rem',
      lineHeight: '0.6rem',
      width: '100%',
    }} {...props}
    >Item</div>
  );

  //登录方法,通过payload来上传数据给model
  function login() {
    const newData = userData;
    userData.dispatch({
      type: 'user/query',
      payload:newData,
   });
  }

  //已用箭头函数来代替原来的赋值function
  //详情看相关InputItem
  // function getInputItemValue(value){
  //   username = value;
  // }
  return (
    <div className={styles.normal}>
      {/* 账spa_多功能输入框  */}
      <Flex direction="column" >
        {/* 多功能输入框1 */}
        <Flex justify="center">
          <InputItem clear placeholder="请输入已验证的手机号或邮箱"  onChange={value => userData.username = value}>
            账号
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
          </InputItem>
        </Flex>

        <Tag >{userData.username}</Tag>

        {/* 多功能输入框2 */}
        <Flex justify="center">
          <InputItem clear placeholder="密码" onChange={value => userData.password = value}>
            密码
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
          </InputItem>
        </Flex>
        <Tag >{userData.password}</Tag>

      </Flex>
      <WhiteSpace size="lg" />

      {/* 账spa_登录注册按钮  */}
      <Flex direction="column">
        <Button className={styles.btnStyle} size="small" type="primary"
          onClick={login}>登   录</Button>
        <Button size="small" type="ghost">注   册</Button>
      </Flex>
      <PlaceHolder/>
      <WhiteSpace/>
      {/* <ActivityIndicator text="加载中..." animating={userData.loading}/> */}
    </div>

  );
}

export default User;
