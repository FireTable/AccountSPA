import React from 'react';
import styles from './User_Information.css';
import {routerRedux} from 'dva/router';
import ReactDOM from 'react-dom';
import {
  Picker,
  List,
  InputItem,
  WhiteSpace,
  Card,
  Tag,
  Result,
  WingBlank,
  Button,
  Toast,
  Modal
} from 'antd-mobile';
import {UploaderBuilder, uploader} from 'qiniu4js';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;
const Brief = Item.Brief;

const waitTips = '正在处理...';

let newPassword= true;
let checkPassword= false;

const sex = [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
];


let modalType = 'none';
let modalVisible = false;

function User_Information({userData}) {
  console.log(userData);

  modalType = userData.modalType;
  modalVisible = userData.modalVisible;

  let Iconuploader = new UploaderBuilder().debug(false) //开启debug，默认false
  // .button('button')//指定上传按钮
    .domain({http: "http://upload-z2.qiniu.com", https: "https://upload-z2.qbox.me"}) //默认为{http: "http://upload.qiniu.com", https: "https://up.qbox.me"}
  //.scheme("https")//默认从 window.location.protocol 获取，可以通过指定域名为 "http://img.yourdomain.com" 来忽略域名选择。
    .retry(0). //设置重传次数，默认0，不重传
  compress(0.5). //默认为1,范围0-1
  scale([200, 0]). //第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽
  size(1024 * 1024). //分片大小，最多为4MB,单位为字节,默认1MB
  chunk(true). //是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
  auto(true). //选中文件后立即上传，默认true
  multiple(true) //是否支持多文件选中，默认true
  //.accept(['video/*'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp

  // 在一次上传队列中，是否分享token，如果为false每上传一个文件都需要请求一次token，默认true。
  //
  // 如果saveKey中有需要在客户端解析的变量，则忽略该值。
    .tokenShare(true)

  // 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
  //
  // 覆盖tokenUrl的设置。
    .tokenFunc(function(setToken, task) {
    setTimeout(function() {
      setToken("");
    }, 1000);
  })

  // 设置token获取URL：客户端向该地址发送HTTP GET请求, 若成功，服务器端返回{"uptoken": 'i-am-token'}。
  //
  // 覆盖tokenFunc的设置。
    .tokenUrl('http://localhost:8000/api/token/query')

  // 设置token获取过程是否使用了saveKey，默认false。
  //
  // 若为true，则listener中的onTaskGetKey不会被调用。
    .saveKey(true)

  // 设置tokenUrl请求中的saveKey参数和七牛上传策略中的saveKey字段。
  //
  // 客户端解析变量（七牛不支持在saveKey中使用这些变量）：
  // * $(uuid)
  // * $(imageInfo.width) $(imageInfo.height)
  //
  // 如参数中有需要在客户端解析的变量，则忽略tokenShare的设置。
  //
  // 若设置了，则listener中的onTaskGetKey不会被调用。
  //
  // 关于saveKey，见https://developer.qiniu.com/kodo/manual/vars
    .saveKey('dir1/dir2/$(uuid)_$(imageInfo.width)x$(imageInfo.height)$(ext)')

  //任务拦截器
    .interceptor({
    //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
    onIntercept: function(task) {
      return task.file.size > 1024 * 1024;
    },
    //中断任务，返回true，任务队列将会在这里中断，不会执行上传操作。
    onInterrupt: function(task) {
      if (this.onIntercept(task)) {
        Toast.info('头像必须小于1M...', 1.3);
        return true;
      } else {
        return false;
      }
    }
  })
  //你可以添加多个任务拦截器
  // .interceptor({...})
    .listener({
    onReady(tasks) {
      //该回调函数在图片处理前执行,也就是说task.file中的图片都是没有处理过的
      //选择上传文件确定后,该生命周期函数会被回调。
      Toast.info('上传头像中...', 1.3);

    },
    onStart(tasks) {
      //所有内部图片任务处理后执行
      //开始上传

    },
    onTaskGetKey(task) {
      //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
      return "test.png";

    },
    onTaskProgress: function(task) {
      //每一个任务的上传进度,通过`task.progress`获取
      console.log(task.progress);

    },
    onTaskSuccess(task) {
      //一个任务上传成功后回调
      console.log(task.result.key); //文件的key

      userData.icon = `http://opzvozftr.bkt.clouddn.com/${task.result.key}`;

      const newData = userData;
      console.log("userData");
      console.log(newData);
      userData.dispatch({
        type: 'users/update',
        payload: {
          ...newData
        }
      });

      console.log(task.result.hash); //文件hash
    },
    onTaskFail(task) {
      //一个任务在经历重传后依然失败后回调此函数
    },
    onTaskRetry(task) {
      //开始重传
    },
    onFinish(tasks) {
      //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
    }
  }).build();

  //如果auto设置为false,则需要手动启动上传。
  //uploader.start();

  //上传头像
  function uploadIcon() {
    Iconuploader.chooseFile();
  }
  //退出登录
  function outLogin() {
    userData.dispatch({type: 'users/outLogin', payload: {}});

    Toast.info('退出登录，正在跳转...', 1.3, () => userData.dispatch(routerRedux.push('/welcome')));
  }

  //修改用户
  function updateUser() {
    const newData = userData;
    userData.dispatch({type: 'users/update', payload: {
        newData
      }});
  }

  //修改modal可见
  function changeVisible(type) {
    //将actor_id也放进去averageDetailData中
    let flag =true;
    if(modalType =='密码'){
      if(newPassword == checkPassword){
        userData.password = newPassword;
      }else{
        Toast.info('两次密码不匹配，保存失败...', 1.3);
         flag =false;
      }
    }
    const newData = {
      "modalType": type,
      'modalVisible': !userData.modalVisible
    };
    console.log(newData);

     if(type =='ok' && flag == true){
      Toast.info('保存信息中...', 1,()=>{
        userData.dispatch({type: 'users/update', payload: userData});
      });
    }
    userData.dispatch({type: 'users/changeVisible', payload: newData});
  }

  //modal的内容
  const ModalContent = () => {
    const flag = 'none';
    switch (modalType) {
      case '昵称':
        return (
          <InputItem placeholder="请输入昵称" autoFocus defaultValue={userData.nickname} onChange={value => userData.nickname = value}>
            昵称
          </InputItem>
        );
        break;
      case '电话':
        return (
          <InputItem placeholder="请输入电话" autoFocus type='phone' defaultValue={userData.phone} onChange={value => userData.phone = value}>
            电话
          </InputItem>
        );
        break;
      case '邮箱':
        return (
          <InputItem placeholder="请输入邮箱" autoFocus defaultValue={userData.email} onChange={value => userData.email = value}>
            邮箱
          </InputItem>
        );
        break;
      case '年龄':
        return (
          <InputItem placeholder="请输入年龄" autoFocus tyoe='number' defaultValue={userData.age} onChange={value => userData.age = value}>
            年龄
          </InputItem>
        );
        break;
      case '支付宝':
        return (
          <InputItem placeholder="请输入支付宝" autoFocus defaultValue={userData.alipay} onChange={value => userData.alipay = value}>
            支付宝
          </InputItem>
        );
        break;
      case '支付宝备注':
        return (
          <InputItem placeholder="请输入支付宝备注" autoFocus defaultValue={userData.alipay_tips} onChange={value => userData.alipay_tips = value}>
            支付宝备注
          </InputItem>
        );
      case '微信':
        return (
          <InputItem placeholder="请输入微信" autoFocus defaultValue={userData.wechat} onChange={value => userData.wechat = value}>
            微信
          </InputItem>
        );
        break;
      case '微信备注':
        return (
          <InputItem placeholder="请输入微信备注" autoFocus defaultValue={userData.wechat_tips} onChange={value => userData.wechat_tips = value}>
            微信备注
          </InputItem>
        );

        case '密码':
          return (
            <div>
            <InputItem placeholder="请输入新密码"  type='password' onChange={value => newPassword = value}>
              新密码
            </InputItem>
            <InputItem placeholder="请再次输入新密码"  type='password' onChange={value => checkPassword = value}>
              再次输入
            </InputItem>
          </div>
          );

      case 'ok':
        return (
          <div>
            {waitTips}
          </div>
        );
      case 'cancel':
        return (
          <div>
            {waitTips}
          </div>
        );
    }
  }

  return (
    <div className={styles.normal}>
      <WhiteSpace size='lg'/>
      <QueueAnim>
      <WingBlank>
        <Card key='1'>
          <Card.Header title={< WingBlank size = 'sm' > <span style={{
            fontSize: '0.5rem'
          }}>
            账号：{userData.username}
          </span> < WhiteSpace size = 'sm' /> <span style={{
            fontSize: '0.5rem'
          }}>
            创建时间：{userData.created_at}
          </span> < /WingBlank>} thumb={userData.icon} thumbStyle={{
            width: '2rem'
          }} onClick={uploadIcon}/>
        </Card>
        <Modal title={`修改信息`} transparent maskClosable closable={true} onClose={() => changeVisible('cancel')} key='3' visible={modalVisible} footer={[
          {
            text: '取消',
            onPress: () => {
              changeVisible('cancel');
            }
          }, {
            text: '确认',
            onPress: () => {
              changeVisible('ok');
            }
          }
        ]} style={{
          width: '80%',
          height: '80%'
        }}>
          <ModalContent/>
        </Modal>

      </WingBlank>
      <List renderHeader={() => '基本信息'} key='2'>
        <Item arrow="horizontal" extra={userData.nickname} onClick={() => changeVisible('昵称')} key='3'>
          昵称
        </Item>
        <Picker data={sex} cols={1} title='选择性别'  extra={userData.sex}
          onChange={value=>{
          console.log(value);
           userData.sex =value[0];
           Toast.info('保存信息中...', 1,()=>{
             userData.dispatch({type: 'users/update', payload: userData});
           });
           }}>
        <Item arrow="horizontal" extra={userData.sex} key='4'>
          性别
        </Item>
        </Picker>
        <Item arrow="horizontal" extra={userData.age} onClick={() => changeVisible('年龄')} key='5'>
          年龄
        </Item>
        <Item arrow="horizontal" extra={userData.phone} onClick={() => changeVisible('电话')} key='6'>
          电话
        </Item>
        <Item arrow="horizontal" extra={userData.email} onClick={() => changeVisible('邮箱')} key='7'>
          邮箱
        </Item>
      </List>
      <List renderHeader={() => '支付信息'} key='3'>
        <Item arrow="horizontal" extra={userData.alipay} onClick={() => changeVisible('支付宝')} key='8'>
          支付宝
        </Item>
        <Item arrow="horizontal" extra={userData.alipay_tips} onClick={() => changeVisible('支付宝备注')} key='9'>
          支付宝·备注
        </Item>
        <Item arrow="horizontal" extra={userData.wechat} onClick={() => changeVisible('微信')} key='10'>
          微信
        </Item>
        <Item arrow="horizontal" extra={userData.wechat_tips} onClick={() => changeVisible('微信备注')} key='11'>
          微信·备注
        </Item>
      </List>
      <WhiteSpace size='lg'/>
      <Button size='small'  onClick={() => changeVisible('密码') }>修改密码</Button>
      <WhiteSpace size='md'/>
      <Button size='small' type="warning" onClick={() => outLogin()}>退出登录</Button>
    </QueueAnim>
    </div>
  );
}

export default User_Information;
