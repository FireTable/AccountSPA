//引入请求相关（与后台系统的交互）模块
import { query,create,_delete,update,get,queryAverageList,addList,outList} from '../services/averagelist';
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
    //更新成功
    updateSuccess(state,{payload:newData}){
      return{...state,

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
     console.log('userData');
     console.log(userData);
     const averagelists_id = userData.averagelists_id;
     //分割字符串
     let operation = 'add';
     const averagelists = averagelists_id.split("-"); //字符分割
     averagelists.map(id=>{
       if(id == newData.id){
         operation = 'stop';
       }
     });
     console.log('operation');
     console.log(operation);
     newData ={...newData,'userid':userData.id};
     if(operation == 'add'){
     const {data} = yield call(() => addList(newData));
     console.log(data);
     if (data) {
       Toast.info('加入成功...', 1.5);
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
    }else if(operation =='stop'){
     Toast.info('你已经加入该活动...', 1.5);
    }
   },

   //退出活动
   *outList({ payload : newData },{ select ,call, put}){
     //拿到的是userid和password和表id
     const userData = yield select(state => state.users);
     console.log('userData');
     console.log(userData);
     let newActor_id ='';
     let newAveragelists_id ='';
     const averagelists_id = userData.averagelists_id;
     const actors_id = newData.actor_id;
     //分割字符串..一个是给User的,一个是给AverageList
     const averagelist = averagelists_id.split("-"); //字符分割
     const actor_id = actors_id.split("-"); //字符分割
     averagelist.pop();
     actor_id.pop();
     //删除对应的,给User的
     averagelist.map((id,index) =>{
       if(id == newData.id){
         averagelist.splice(index,1);
       }
     });
     //重新组合,User
     averagelist.map(id =>{
       newAveragelists_id =`${newAveragelists_id}${id}-`;
     });

     //删除对应的,给List的
     actor_id.map((id,index) =>{
       if(id == userData.id){
         actor_id.splice(index,1);
       }
     });
     //重新组合,List
     actor_id.map(id =>{
       newActor_id =`${newActor_id}${id}-`;
     });

     console.log('new');
     console.log(newActor_id);
     console.log(newAveragelists_id);

     newData ={...newData,'userid':userData.id,'actor_id':newActor_id,'averagelists_id':newAveragelists_id};
     const {data} = yield call(() => outList(newData));
     console.log(data);
     if (data == 'success') {
       Toast.info('退出成功...', 1.5);
       console.log('退出成功');
       //加入了之后要更新user的参与list
       console.log('userData');
       console.log(userData);
       const newUserData = {...userData,averagelists_id:newAveragelists_id};
       console.log(newUserData);
       yield put({
          type: 'users/update',
          payload: {
            ...newUserData
          }
        });
     }else{
       Toast.info('退出失败，你是活动创建者...', 1.5);
     }
   },

   //结算活动
   *updateList({ payload : newData },{ select ,call, put}){
     //拿到的是userid和password和表id
     const userData = yield select(state => state.users);
     let operation = 'update';
     if(userData.id != newData.creator_id){
         operation = 'stop';
    }
     console.log('operation');
     console.log(operation);
     if(operation == 'update'){
     const {data} = yield call(() => update(newData));
     console.log(data);
     if (data) {
       Toast.info('结算成功...', 1.5);
       //加入了之后要更新user的参与list
      //更新list
       yield put({
         type: 'updateSuccess',
         payload: {
           data
         }
       });
     }
    }else if(operation =='stop'){
     Toast.info('你不是创建者，无法结算...', 1.5);
    }
   },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('订阅');
      return history.listen(({ pathname, newData }) => {
        if (pathname === '/') {
          newData ={...newData,dispatch};
          dispatch({
            type: 'users/hadLogin',
            payload: newData
          });
          dispatch({
            type: 'averageLists/queryAverageList',
            payload: newData
          });
        }
      });
    },

  },
  };
