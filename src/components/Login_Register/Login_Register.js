import React from 'react';
import styles from './Login_Register.css';
import { routerRedux } from 'dva/router';

import { ActivityIndicator,Tag,Icon,Flex, WhiteSpace, WingBlank,Button,InputItem} from 'antd-mobile';

function Login_Register({userData}) {

  console.log(userData);

  //登录方法,通过payload来上传数据给model
  function login() {
    const newData = userData;
    userData.dispatch({
      type: 'users/login',
      payload:newData,
   });

  }

  //注册
  function register() {
    const newData = userData;
    userData.dispatch({
      type: 'users/create',
      payload:newData,
   });
  }

  //删除
  function _delete() {
    const newData = userData;
    userData.dispatch({
      type: 'users/_delete',
      payload:newData,
   });
  }

  //更新
  function update(){
    const newData = userData;
    userData.dispatch({
      type: 'users/update',
      payload:newData,
   });
  }

  //查询参与者
  function queryActor(){
    const newData = userData;
    userData.dispatch({
      type: 'users/queryActor',
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

      {/* 多功能输入框  */}
        {/* 多功能输入框1 */}
          <WhiteSpace size="lg" />
          <InputItem   placeholder="请输入账号"  defaultValue={userData.username}
            onChange={value => userData.username = value}>
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
            账号
          </InputItem>
        {/* 多功能输入框2 */}
          <InputItem  placeholder="请输入密码"  type ='password' defaultValue={userData.password}
            onChange={value => userData.password = value} >
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
            密码
          </InputItem>

        <WhiteSpace size="lg" />


      {/* 账spa_登录+注册按钮  */}

      <Flex direction="column">
        {/* <Tag >{userData.id}</Tag>
        <Tag >{userData.password}</Tag> */}
        <Button className={styles.btnStyle} size="small" type="primary"
          onClick={login}>登   录</Button>
          <WhiteSpace/>
        <Button className={styles.btnStyle} size="small" type="ghost" onClick={register}>注   册</Button>
      </Flex>


      {/* <Flex direction="column">
        <Button className={styles.btnStyle} size="small" type="primary"
          onClick={_delete}>删   除</Button>
        <Button className={styles.btnStyle} size="small" type="ghost" onClick={update}>更   新</Button>
        <Button className={styles.btnStyle} size="small" type="ghost" onClick={queryActor}>查询参与者</Button>
      </Flex> */}

      <WhiteSpace/>
      {/* <ActivityIndicator text="加载中..." animating={userData.loading}/> */}
    </div>

  );
}

export default Login_Register;
