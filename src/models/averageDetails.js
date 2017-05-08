import { query,create,_delete,update } from '../services/averagedetail';

export default {
  namespace: 'averageDetails',
  state: {
      id:'',
      title: '',
      tips:'',
      averagelist_id:'',
      cost: '',
      creator_id:'',
      actor_id:'',
      state:'不免单',
      actor_num:'',
      realData: [
        {
          id:'待加载',
          title: '待加载',
          tips:'待加载',
          averagelist_id:'待加载',
          cost: '待加载',
          creator_id:'待加载',
          actor_id:'待加载',
          state:'待加载',
          actor_num:'待加载',
          created_at:'待加载',
          updated_at:'待加载',
        },
        {
          id:'待加载',
          title: '待加载',
          tips:'待加载',
          averagelist_id:'待加载',
          cost: '待加载',
          creator_id:'待加载',
          actor_id:'待加载',
          state:'待加载',
          actor_num:'待加载',
          created_at:'待加载',
          updated_at:'待加载',
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
            type: 'averageDetails/query',
            payload: newData
          });
        }
      });
    },
  },
  };
