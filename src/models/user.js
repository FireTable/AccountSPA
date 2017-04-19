//引入请求相关（与后台系统的交互）模块
import { query } from '../services/user';


export default {
  namespace: 'user',
  state: {
    id:'id',
    username:'username',
    nickname:'nickname',
    password:'password',
    phone:'phone',
    email:'email',
    location:'location',
    age:'age',
    sex:'sex',
    addtime:'addtime',
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
    createSuccess(){},
    //删除,管理员用的
    deleteSuccess(){},
    //更新
    updateSuccess(){},
  },
  effects: {
    //call 是调用执行一个函数
    //put  相当于 dispatch 执行一个 action
    //select 可以用来访问其它 model
  *query({ payload : newData }, { select, call, put }) {
     yield put({ type: 'showLoading' }); //执行reducer中的showloading();
     const  data  = yield call(query); //call 是调用执行 query查询
     //const todos = yield select(state => state.todos); //用于从 state 里获取数据。
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           ...newData,
         }
       });
     }
   },
   *create(){},
   //因为delete是关键字,所以要特殊处理
   *'delete'(){},
   *update(){},
  },
  subscriptions: {},
};
