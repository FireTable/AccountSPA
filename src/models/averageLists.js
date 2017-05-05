//引入请求相关（与后台系统的交互）模块
import { query,create,_delete,update } from '../services/averagelist';


export default {
  namespace: 'averageLists',
  state: {
    testData:'待加载',
    realData: [
      {
        id:'加载失败',
        title: '加载失败',
        tips:'加载失败',
        cost: '加载失败',
        creator_id:'加载失败',
        actor_id:'加载失败',
        state:'加载失败',
        created_at:'加载失败',
        updated_at:'加载失败',
      },
    ],

  },
  reducers: {
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
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
