import React from 'react';
import styles from './Welcome.css';

import { Tag,Icon,Flex, WhiteSpace, WingBlank,Button,InputItem} from 'antd-mobile';
import namespace  from '../../models/user';

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



function Welcome({dispatch,username,password,user}) {

  //登录方法
  function login() {
    console.log('asd');
    dispatch({
      type: 'user/login',
      playload:{
        username:'ddd',
        password:'ccc',
      },
   });
   console.log({username});
  }

  function getInputItemValue(){
    console.log({username});
    if(username!="1"){
      username="1";
    }else{
      username="2";
    }
  }

  return (
    <div className={styles.normal}>
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      {/* 账spa_logo */}
      <Flex direction="column" >
        <Icon type={require('!svg-sprite!../../assets/icons/QQicon.svg')} size="lg" />
      </Flex>
      <WhiteSpace size="lg" />

      {/* 账spa_多功能输入框  */}
      <Flex direction="column" >
        {/* 多功能输入框1 */}
        <Flex justify="center">
          <InputItem clear placeholder="请输入已验证的手机号或邮箱"  id ="inputItem1" onChange={getInputItemValue}>
            账号
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
          </InputItem>
        </Flex>

        <Tag >{username}</Tag>

        {/* 多功能输入框2 */}
        <Flex justify="center">
          <InputItem clear placeholder="密码">
            密码
            {/* <Icon type={require('!svg-sprite!../../assets/icons/user.svg')} size="lg" /> */}
          </InputItem>
        </Flex>

      </Flex>
      <WhiteSpace size="lg" />

      {/* 账spa_登录注册按钮  */}
      <Flex direction="column">
        <Button className={styles.btnStyle} size="small" type="primary"
          onClick={login}>登  录</Button>
        <Button size="small" type="ghost">注  册</Button>
      </Flex>
      <PlaceHolder/>
      <WhiteSpace/>

    </div>
  );
}

export default Welcome;
