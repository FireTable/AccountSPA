import React from 'react';
import styles from './User_Information.css';
import { routerRedux } from 'dva/router';
import {List,InputItem,WhiteSpace,Card,Tag,Result,WingBlank,Flex,Button,Toast} from 'antd-mobile';

const Item=List.Item;
const Brief=Item.Brief;

function User_Information({userData}) {
  console.log(userData);

  function outLogin(){
    userData.dispatch({
      type:'users/outLogin',
      payload:{
      }
    });

    Toast.info('退出登录，正在跳转...', 1.3,
      ()=>userData.dispatch(routerRedux.push('/welcome'))
    );
  }

  return (
    <div className={styles.normal}>
      <WhiteSpace />
      <WingBlank>
      <Card>
      <Card.Header
        title={
              <WingBlank size='sm'>
                <span style={{fontSize:'0.5rem'}}>
                账号：{userData.username}
                </span>
                <WhiteSpace size='sm'/>
                <span style={{fontSize:'0.5rem'}}>
                创建时间：{userData.created_at}
                </span>
              </WingBlank>
              }
        thumb='https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
        thumbStyle={{width:'2rem'}}
      />
    </Card>
</WingBlank>
      <List  renderHeader={() => '基本信息' }>
        <Item arrow="horizontal" extra={userData.nickname}>
          昵称
        </Item>
        <Item arrow="horizontal" extra={userData.sex}>
          性别
        </Item>
        <Item arrow="horizontal" extra={userData.phone}>
          电话
        </Item>
        <Item arrow="horizontal" extra={userData.email}>
          邮箱
        </Item>
        <Item arrow="horizontal" extra={userData.location}>
          地区
        </Item>
      </List>
      <List  renderHeader={() => '支付信息' }>
        <Item arrow="horizontal" extra={userData.alipay}>
          支付宝
        </Item>
        <Item arrow="horizontal" extra={userData.alipay_tips}>
          支付宝备注
        </Item>
        <Item arrow="horizontal" extra={userData.wechat}>
          微信
        </Item>
        <Item arrow="horizontal" extra={userData.wechat_tips}>
          微信备注
        </Item>

      </List>
      <WhiteSpace size='lg' />
      <Button  size='small'  type="warning" onClick={()=>outLogin()}>退出登录</Button>

    </div>
  );
}

export default User_Information;
