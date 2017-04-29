//引入请求相关（与后台系统的交互）模块
import { login,create as register,_delete,update } from '../services/users';


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
    addtime:'',
    loading: false, // 控制加载状态
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
    //查询
    querySuccess(state,{payload:newData}){
      return{...state,
        ...newData,
        loading: false,
      };
    },
    //查询
    queryFail(state,{payload:newData}){
      return{...state,
        ...newData,
        loading: false,
      };
    },
    //添加成功
    createSuccess(state,{payload:newData}){
      alert('注册成功');
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
      alert('更新成功');
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
     console.log(data);
     //console.log(state);
     let reducerType;
     if (data) {
       reducerType ='querySuccess';
     }else{
       reducerType ='queryFail';
     }
     yield put({
       type: reducerType,
       payload: {
         //将输入框的账号密码放进模型,如果查询到了会覆盖相关信息
         //没有查询到只会有输入框账号密码
         ...newData,
         ...data
       }
     });
   },
   *create({ payload : newData },{ select ,call, put}){
     yield put({ type:'showLoading'});
     const {data} = yield call(() => register(newData));
     console.log(data);
     if (data) {
       yield put({
         type: 'createSuccess',
         payload: {
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

  },
  subscriptions: {},
};
