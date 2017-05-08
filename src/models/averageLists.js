//引入请求相关（与后台系统的交互）模块
import { query,create,_delete,update } from '../services/averagelist';


export default {
  namespace: 'averageLists',
  state: {
    realData: [
      {
        id:'待加载',
        title: '待加载',
        tips:'待加载',
        cost: '待加载',
        creator_id:'待加载',
        actor_id:'待加载',
        state:'待加载',
        created_at:'待加载',
        updated_at:'待加载',
      },
    ],

  },
  reducers: {
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    changeState(state,{payload:newData}){
      console.log(newData);
      return{
        ...state,
        state:newData,
      };
    },
    //查询
    querySuccess(state,{payload:newData}){
      return{
        ...state,
        realData:newData.data,
      };
    },
    //查询
    queryFail(state,{payload:newData}){
      return{...state,
        ...newData,
      };
    },
    //添加成功
    createSuccess(state,{payload:newData}){
      alert('创建成功');
      return{...state,
        ...newData,
      };
    },
    //删除,管理员用的
    deleteSuccess(state,{payload:newData}){
      alert('删除成功');
      return{
        // ...state,
        // ...newData,
      };
    },
    //更新成功
    updateSuccess(state,{payload:newData}){
      alert('更新成功');
      return{...state,
        ...newData,
      };
    },
  },
  effects: {
   *create({ payload : newData },{ select ,call, put}){
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
   *query({ payload : newData },{ select ,call, put}){
     const {data} = yield call(() => query());
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           data
         }
       });
     }
   },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('订阅');
      return history.listen(({ pathname, newData }) => {
        if (pathname === '/') {
          dispatch({
            type: 'averageLists/query',
            payload: newData
          });
        }
      });
    },
  },
  };
