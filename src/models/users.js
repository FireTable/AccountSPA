//引入请求相关（与后台系统的交互）模块
import { login,create as register,_delete,update,queryActor } from '../services/users';
import {Toast} from 'antd-mobile';
import { routerRedux } from 'dva/router';

const toastTime = 1.3;

//修改下标为id,不能用FOR,否则在异步下错乱
async function changeIndex(actorLists){
  let tempLists =[] ;
  actorLists.map(actorList=>{
    if(actorList != null){
      tempLists[actorList.id]  = actorList;
    }
  });
  actorLists = tempLists;
  return actorLists;
}

export default {
  namespace: 'users',
  state: {
    id:null,
    username:null,
    nickname:'',
    password:'',
    phone:'',
    email:'',
    location:'',
    age:0,
    sex:'',
    role_id:null,
    alipay:'',
    alipay_tips:'',
    wechat:'',
    wechat_tips:'',
    averagelists_id:'',
    icon:'',
    loading: false, // 控制加载状态
    actorLists:[],
    actorLists_new:[],

    // modalVisible: false, // 弹出窗的显示状态
    // modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
  },
  reducers: {
    showLoading(state){
      return { ...state,
        loading: true,
      };
    }, // 控制加载状态的 reducer
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},

    //登录的查询
    outLogin(state,{payload:newData}){
      //显示toast,并且自动跳转
      return{...state,
        id:null,
        username:null,
        nickname:'',
        password:'',
        phone:'',
        email:'',
        location:'',
        age:0,
        sex:'',
        role_id:null,
        alipay:'',
        alipay_tips:'',
        wechat:'',
        wechat_tips:'',
        averagelists_id:'',
        icon:'',
        actorLists:[],
        actorLists_new:[],
      };
    },

    //查询参与者
    queryActorSuccess(state,{payload:newData}){
      return{...state,
        actorLists:newData.actorLists,
        actorLists_new:newData.actorLists_new,
        loading: false,
      };
    },
    //登录的查询
    loginSuccess(state,{payload:newData}){
      //显示toast,并且自动跳转
      Toast.info('登录成功，正在跳转...', toastTime,
        ()=>newData.dispatch(routerRedux.push('/'))
      );
      return{...state,
        ...newData,
        loading: false,
      };
    },
    //查询
    loginFail(state,{payload:newData}){
      Toast.info('账号或密码错误', toastTime);
      return{...state,
        ...newData,
        loading: false,
      };
    },
    //添加成功
    createSuccess(state,{payload:newData}){
      Toast.info('注册成功', toastTime);
      return{...state,
        ...newData,
        loading: false,
      };
    },
    //删除,管理员用的
    deleteSuccess(state,{payload:newData}){
      alert('删除成功');
      return{
        // ...state,
        // ...newData,
        loading: false,
      };
    },
    //更新成功
    updateSuccess(state,{payload:newData}){
      console.log(newData);
      return{...state,
        ...newData,
        loading: false,
      };
    },
  },
  effects: {
    //call 是调用执行一个函数
    //put  相当于 dispatch 执行一个 action
    //select 可以用来访问其它 model
  *login({ payload : newData }, { select, call, put }) {
     yield put({ type: 'showLoading' }); //执行reducer中的showloading();
     const  {data}  = yield call(() =>login(newData)); //call 是调用执行 login查询
     //const todos = yield select(state => state.todos); //用于从 state 里获取数据。
     console.log('login');
     console.log(data);
     //console.log(state);
     let reducerType;
     if (data.id) {
       reducerType ='loginSuccess';
     }else{
       reducerType ='loginFail';
     }
     yield put({
       type: reducerType,
       payload: {
         //将输入框的账号密码放进模型,如果查询到了会覆盖相关信息
         //没有查询到只会返回有输入框账号密码
         ...newData,
         ...data
       }
     });
   },
   *create({ payload : newData },{ select ,call, put}){
     newData = {...newData,'nickname':newData.username}
     const {data} = yield call(() => register(newData));
     const password = newData.password;
     if (data) {
       yield put({
         type: 'createSuccess',
         payload: {
           password:password,
           ...data
         }
       });
     }
   },
   //因为delete是关键字,所以要特殊处理
   *_delete({ payload : newData },{ select ,call, put}){
     console.log(newData);
     yield put({ type:'showLoading'});
     const {data} = yield call(() => _delete(newData));
     if (data) {
       yield put({
         type: 'deleteSuccess',
         payload: {
           ...data
         }
       });
     }
   },
   *update({ payload : newData },{ select ,call, put}){
     yield put({ type:'showLoading'});
     const {data} = yield call(() => update(newData));
     console.log("在users update");
     console.log(data);
     if (data) {
       yield put({
         type: 'updateSuccess',
         payload: {
           ...data
         }
       });
     }
   },
   *query(){
     //暂无实现
   },
   ////查询参与者
   *queryActor({ payload : newData },{ select ,call, put}){
     const id = yield select(state => state.averageLists.id);
     const actor_id = yield select(state => state.averageLists.actor_id);
       newData ={...newData,actor_id:actor_id,id:id}
       const getData = yield call(() => queryActor(newData));
       const actorLists = getData.data;
       if (actorLists) {
         const length = actorLists.length;
         //将查询到的数据下标换成id,存到新的表
         const actorLists_new =yield call(() => changeIndex(actorLists));
         if(actorLists){
           yield put({
             type: 'queryActorSuccess',
             payload: {
               actorLists_new,actorLists
             }
           });
        }
       }
   },
   //查证是否登录,没有就跳转
   *hadLogin({ payload : newData },{ select ,call, put}){
     const id = yield select(state => state.users.id);
       if (id == null) {
         newData.dispatch(routerRedux.push('/welcome'));
       }
   },

  },
  subscriptions: {},
};
