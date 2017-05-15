//引入请求相关（与后台系统的交互）模块
import {queryResult} from '../services/averageresult';
import {Toast} from 'antd-mobile';

export default {
  namespace: 'averageResults',
  state: {
    //这订单总花费
    allCost:'',
    //paylist是我应付花费,我应该给谁多少钱,不包括免单,要平均
    payList:[],
    //costList是我本来的花费,包括了免单,谁为我花多少钱,要平均
    costList:[],
    //freelist是免单了的花费,表示谁为我免单了多少钱,
    freeList:[],
    //freeList_all为谁免单了多少
    freeList_all:[],
    //参与者人数
    actor_num:'',
  },
  reducers: {
    // 查询成功返回数据
    queryResultSuccess(state,{payload:newData}){
      console.log(newData);
      return{
      ...state,
      ...newData
      };
    },
  },
  effects: {
    //查询结果
    *queryResult({ payload : newData },{ select ,call, put}){
       const userid = yield select(state => state.users.id);
       newData ={...newData,userid};
      const {data} = yield call(() => queryResult(newData));
        console.log(data);
       if (data) {
         console.log('查到');
         yield put({
           type: 'queryResultSuccess',
           payload: {
             ...data
          }
        });
      }

    },
  },
  subscriptions:  {
    setup({ dispatch, history }) {
      console.log('订阅');
      return history.listen(({ pathname, newData }) => {
        if (pathname === '/averageresult') {
          newData ={...newData,dispatch};
          //验证登录
          dispatch({
            type: 'users/hadLogin',
            payload: newData
          });
          //查询
          dispatch({
            type: 'averageResults/queryResult',
            payload: newData
          });
        }
      });
    },

  },
};
