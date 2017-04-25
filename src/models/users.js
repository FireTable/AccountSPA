//引入请求相关（与后台系统的交互）模块
import { login,create as register } from '../services/users';


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
    age:null,
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
    //添加
    createSuccess(){
      alert('注册成功');
      return{
        loading: false,
      };
    },
    //删除,管理员用的
    deleteSuccess(){},
    //更新
    updateSuccess(){},
  },
  effects: {
    //call 是调用执行一个函数
    //put  相当于 dispatch 执行一个 action
    //select 可以用来访问其它 model
  *login({ payload : newData }, { select, call, put }) {
     yield put({ type: 'showLoading' }); //执行reducer中的showloading();
     //这里执行的就是异步,call执行函数之后返回promise,才会有数据出来
     const  {data}  = yield call(() =>login(newData)); //call 是调用执行 login查询
     //const todos = yield select(state => state.todos); //用于从 state 里获取数据。
     console.log(data);
     //console.log(state);
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           ...newData,
         }
       });
     }
   },
   *create({ payload : newData },{ select ,call, put}){
     yield put({ type:'showLoading'});
     const {data} = yield call(() => register(newData));
     console.log(data);
     if (data) {
       yield put({
         type: 'createSuccess',
         payload: {
           ...newData,
         }
       });
     }
   },
   //因为delete是关键字,所以要特殊处理
   *'delete'(){},
   *update(){},
   *query(){},

  },
  subscriptions: {},
};
