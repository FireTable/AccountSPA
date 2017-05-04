//引入请求相关（与后台系统的交互）模块
import { query,create,_delete,update } from '../services/averagelist';


export default {
  namespace: 'averageLists',
  state: {
     averageData : [
      {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: '相约酒店',
        des: '不是所有的兼职汪都需要风吹日晒',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: '麦当劳邀您过周末',
        des: '不是所有的兼职汪都需要风吹日晒',
      },
      {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: '食惠周',
        des: '不是所有的兼职汪都需要风吹日晒',
      },
    ],
    data :[
      {
        id:'',
        title: '约会',
        tips:'哈哈哈',
        cost: '15',
        creator_id:'',
        actor_id:'',
        state:'',
        created_at:'',
        updated_at:'',
      },
    ],
    list :[

    ],

  },
  reducers: {
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    //查询
    querySuccess(state,{payload:newData}){
      return{...state,
        ...newData,
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
     const {data} = yield call(() => query(newData));
     console.log(data);
     if (data) {
       yield put({
         type: 'querySuccess',
         payload: {
           ...data
         }
       });
     }
   },

  },
  subscriptions: {},
  };
