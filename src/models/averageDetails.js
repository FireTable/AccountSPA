import { query,create,_delete,update,queryDetails} from '../services/averagedetail';

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
      modalVisible:false,
      //处理步进条
      current:0,
      actorLists:[],
      shareLists:[],
      averageDetailLists: [
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

    // 查询actorLists
    queryActorSuccess(state,{payload:newData}){
      //往actorLists中添加text字段,用于grid显示名称
      let addTextData = newData.actorLists.map(actorList=>
        actorList={...actorList,text:actorList.nickname}
      );
      newData.actorLists = addTextData;
      console.log(newData.actorLists);
      return{
      ...state,
      ...newData
      };
    },

    // 保存actorlist
    saveActorList(state,{payload:shareLists,actor_id}){
      return{
      ...state,
      shareLists:shareLists,
      actor_id:actor_id
      };
    },
    // 修改modal的是否可见,并且将进度条设为0
    changeModalVisible(state,{payload:modalVisible,current}){
      return{
      ...state,
      modalVisible:modalVisible,
      current:current,
      //点增加细节的时候,重置modal的表单数据
      id:'',
      title: '',
      tips:'',
      cost: '',
      actor_id:'',
      state:'不免单',
      actor_num:'',
      current:0,
      actorLists:[],
      shareLists:[],
      };
    },
    // 修改将进度条
    changeCurrent(state,{payload:current,newData}){
      return{
        ...state,
        ...newData,
        current:current,
      };
    },
    // 修改免单按钮的样式
    changeState(state,{payload:checked,newData}){
      //转换成数据库的免单枚举类型
      if(checked == true){
        checked = '免单';
      }else if(checked == false){
        checked = '不免单';
      }
      return{
        ...state,
        ...newData,
        state:checked,
      };
    },
    //查询
    querySuccess(state,{payload:newData}){
      console.log('保存');
      console.log(newData);
      return{
        ...state,
        averageDetailLists:newData.data,
        averagelist_id:newData.averagelist_id,
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
     const averagelist_id = yield select(state => state.averageLists.id);
     console.log('create.details');
     console.log(averagelist_id);
     const {data} = yield call(() => create(newData));
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

   *queryActor({ payload : newData },{ select ,call, put}){
       const actorLists = yield select(state => state.users.actorLists);
       yield put({
         type: 'queryActorSuccess',
         payload: {
           actorLists
         }
       });
   },

  //  *query({ payload : newData },{ select ,call, put}){
  //    const {data} = yield call(() => query(newData));
  //    if (data) {
  //      yield put({
  //        type: 'querySuccess',
  //        payload: {
  //          data
  //        }
  //      });
  //    }
  //  },

   //点击list_item后获取details
   *queryDetails({ payload : newData },{ select ,call, put}){
     const averagelist_id = yield select(state => state.averageLists.id);
     const averageListData = yield select(state=>state.averageLists);
     const {data} = yield call(() => queryDetails(averageListData));
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           data,averagelist_id
         }
       });
     }
   },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('订阅');
      return history.listen(({ pathname, newData }) => {
        if (pathname === '/averagedetail') {
          //获取该averageList的detail
          dispatch({
            type: 'averageDetails/queryDetails',
            payload: newData
          });
          //获取averageList的actor_id,存放在users的model中
          dispatch({
            type: 'users/queryActor',
            payload: {}
          });
        }
      });
    },
  },
  };
