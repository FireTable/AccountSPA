//引入请求相关（与后台系统的交互）模块
import { query,create,_delete,update,get,queryAverageList,addList} from '../services/averagelist';
import {Toast} from 'antd-mobile';

export default {
  namespace: 'averageLists',
  state: {
    id:'',
    title: '',
    tips:'',
    cost: '',
    creator_id:'',
    actor_id:'',
    password:'',
    state:'进行中',
    averageLists: [
      {
        id:'待加载',
        title: '待加载',
        tips:'待加载',
        cost: '待加载',
        creator_id:'待加载',
        actor_id:'待加载',
        password:'待加载',
        state:'待加载',
        created_at:'待加载',
        updated_at:'待加载',
      },
    ],

  },
  reducers: {
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    //更新Model的state
    updateState(state,{payload:newData}){
      console.log('abc');
      console.log(newData);
      return{
        ...state,
        ...newData,
      };
    },
    //查询
    querySuccess(state,{payload:newData}){
      console.log(newData);
      return{
        ...state,
        averageLists:newData.data,
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
      return{...state,
        ...newData,
      };
    },
    //加入成功
    addSuccess(state,{payload:newData}){
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
   //查询列表
   *queryAverageList({ payload : newData },{ select ,call, put}){
     //获取user的averageLists_id
     const id = yield select(state=>state.users.averagelists_id);
     const {data} = yield call(() => queryAverageList(id));
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           data
         }
       });
     }
   },
   *createList({ payload : newData },{ select ,call, put}){
     const creator_id = yield select(state=>state.users.id);
     const actor_id = `${creator_id}-`;
     newData = {...newData,'creator_id':creator_id,'actor_id':actor_id};
     const {data} = yield call(() => create(newData));
     if (data) {
       console.log('创建了list');
       console.log(data);
       //创建了之后要更新user的参与list
       const userData = yield select(state => state.users);
       console.log('userData');
       console.log(userData);
       const averagelists_id = `${userData.averagelists_id}${data.id}-`;
       const newUserData = {...userData,averagelists_id:averagelists_id};
       console.log('newwwwwwwwuserData');
       console.log(newUserData);
       yield put({
          type: 'users/update',
          payload: {
            ...newUserData
          }
        });
      //更新list
       yield put({
         type: 'createSuccess',
         payload: {
           data
         }
       });
     }
   },
   //加入活动
   *addList({ payload : newData },{ select ,call, put}){
     //拿到的是userid和password和表id
     const userData = yield select(state => state.users);
     newData ={...newData,'userid':userData.id}
     const {data} = yield call(() => addList(newData));
     console.log(data);
     if (data) {
       console.log('加入成功');
       //加入了之后要更新user的参与list
       console.log('userData');
       console.log(userData);
       const averagelists_id = `${userData.averagelists_id}${data.id}-`;
       const newUserData = {...userData,averagelists_id:averagelists_id};
       console.log(newUserData);
       yield put({
          type: 'users/update',
          payload: {
            ...newUserData
          }
        });
      //更新list
       yield put({
         type: 'addSuccess',
         payload: {
           data
         }
       });
     }else{
       //错误提示
       Toast.info('信息错误，无法加入...', 1.5);
     }
   },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('订阅');
      return history.listen(({ pathname, newData }) => {
        if (pathname === '/') {
          dispatch({
            type: 'averageLists/queryAverageList',
            payload: newData
          });
        }
      });
    },
  },
  };
