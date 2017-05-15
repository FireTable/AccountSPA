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

    // updateModal的查询参与者,需要排除
    updateActorSuccess(state,{payload:newData}){
      //往actorLists中添加text字段,用于grid显示名称
      console.log('updateActorSuccess');
      console.log(newData);
      const inActor_id = newData.nowActor.split("-"); //字符分割
      const allActor_id = newData.actor_id.split("-");
      const actorLists = newData.actorLists;
      let addTextshareListsData =[];
      let addTextactorListsData =[];
      allActor_id.pop();
      inActor_id.pop();
      inActor_id.map(id=>{
        //if匹配到已经在了的,加到sharelistData里面
        //如果匹配不到就放在actorList里面
        let actorList = actorLists[id];
        actorList = {...actorList,text:actorList.nickname};
        console.log('actorList');
        console.log(actorList);
          addTextshareListsData.push(actorList);
      });
      //一个求差集算法
      let outActor_id  = new Array();
       allActor_id.map(all_id=>{
        let had = true;
        inActor_id.map(in_id=>{
          if(in_id == all_id){
            had = false;
          }
        });
        if(had){
          outActor_id.push(all_id);
        }
      });
      console.log('差集结果');
      console.log(outActor_id);
      //差集循环
      outActor_id.map(id=>{
        //if匹配到已经在了的,加到sharelistData里面
        //如果匹配不到就放在actorList里面
        let actorList = actorLists[id];
        actorList = {...actorList,text:actorList.nickname};
        addTextactorListsData.push(actorList);
      });

      newData.shareLists = addTextshareListsData;
      newData.actorLists = addTextactorListsData;
      console.log('reducer中的updateActorSuccess');
      console.log(newData);
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
    // 修改modal的是否可见,并且将进度条设为0,数据清空
    createModalVisible(state,{payload:modalVisible,current}){
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
    // 修改modal的是否可见,并且将进度条设为0,数据不清空
    updateModalVisible(state,{payload:modalVisible,current,averageDetailData}){
      return{
      ...state,
      ...averageDetailData,
      modalVisible:modalVisible,
      current:current,
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
      console.log('保存数据');
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
    //删除
    deleteSuccess(state,{payload:newData}){
      return{
        ...state,
        ...newData,
        modalVisible:false,
        current:0,
      };
    },
    //更新成功
    updateSuccess(state,{payload:newData}){
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
     console.log('queryActor');
     console.log(newData);
       const actorLists = yield select(state => state.users.actorLists);
       yield put({
         type: 'users/queryActor',
         payload: {
           actorLists
         }
       });
   },

   *updateActor({ payload : newData },{ select ,call, put}){
     console.log('updateActor');
     //newData.actor_id为现在的参与人的id string
     //actorList这个活动的总参与人的id string
      const actor_id = yield select(state => state.averageLists.actor_id);
       const userData = yield select(state => state.users);
       const actorLists = userData.actorLists_new;
       const nowActor = newData.actor_id;
       console.log(actor_id);
        console.log(nowActor);
       yield put({
         type: 'updateActorSuccess',
         payload: {
           actorLists,nowActor,actor_id
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
       console.log('查到');
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
          //验证登录
          newData ={...newData,dispatch};
          dispatch({
            type: 'users/hadLogin',
            payload: newData
          });
          //获取该averageList的detail
          dispatch({
            type: 'averageDetails/queryDetails',
            payload: {}
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
