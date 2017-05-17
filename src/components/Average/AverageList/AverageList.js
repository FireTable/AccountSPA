import React from 'react';
import { routerRedux} from 'dva/router';
import styles from './AverageList.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Button,List,WhiteSpace,Toast,Icon,SwipeAction} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;
const Brief = Item.Brief;


function AverageList({averageListData,userData}) {

//获取model中的数据
const averageLists = averageListData.averageLists;

function enterDetails(){
  Toast.info('读取数据中...', 1.2);
  averageListData.dispatch(routerRedux.push('/averagedetail'));
}


  //点击之后进入averageList的detail
  function getDetails(averageList) {
    const id = averageList.id;
    averageListData.id = id ;
    const newData = averageList;
    console.log(newData);
    //Toast.info('读取数据中...', 1.2);
    //avergeList的state更新
    averageListData.dispatch({
      type: 'averageLists/updateState',
      payload:{
        ...newData
      }
   });
    //将id传到details的model中,并且查询相关信息
    averageListData.dispatch({
      type: 'averageDetails/queryDetails',
      payload:{}
   });

   //查询参与者
  //查询
     averageListData.dispatch({
       type: 'users/queryActor',
       payload:{
         ...newData
       }
    });
   //延时
   setTimeout(()=>{
     console.log('queryActor');
     averageListData.dispatch({
       type: 'averageDetails/queryActor',
       payload:{

       }
    });
  },800);

  }


//退出活动
  function outList(){
    const newData = averageListData;
    averageListData.dispatch({
      type: 'averageLists/outList',
      payload:{
        ...newData
      }
   });
   setTimeout(()=>{
     console.log('waitting');
     averageListData.dispatch({
       type: 'averageLists/queryAverageList',
       payload: {}
     });
   },800);
   //查询
}

  //更新
  function updateList(){
    averageListData.state ='已完成';
    const newData = averageListData;
    averageListData.dispatch({
      type: 'averageLists/updateList',
      payload:{
        ...newData
      }
   });
   //查询必须延时
   setTimeout(()=>{
     console.log('waitting');
     averageListData.dispatch({
       type: 'averageLists/queryAverageList',
       payload: {}
     });
   },800);



 }


 //点击之后获取list的结果
 function getListResult(averageList) {

   console.log('result');
   const newData = averageList;
   console.log(newData);
   //Toast.info('读取数据中...', 1.2);
   //avergeList的state更新
   averageListData.dispatch({
     type: 'averageLists/updateState',
     payload:{
       ...newData
     }
  });

  //查询
  averageListData.dispatch({
    type: 'users/queryActor',
    payload:{
      ...newData
    }
 });

   //将id传到details的model中,并且查询相关信息
   averageListData.dispatch({
     type: 'averageResults/queryResult',
     payload:{
       ...newData
     }
  });



  //跳转
  averageListData.dispatch(routerRedux.push('/averageresult'));

 }

console.log('长度');
console.log(averageLists.length);

  const doingItemList = averageLists.map(averageList =>{
    if(averageList.state == '进行中')
    return(
        <div>
        {/* 会有警告信息说不是个函数 */}
        <SwipeAction
          style={{ backgroundColor: 'gray' }}
          autoClose
          left={[
         {
           text: '结算',
           onPress: () => updateList(),
           style: { backgroundColor: '#108ee9', color: 'white' },
         },
         {
           text: '取消',
           onPress: () => console.log('取消'),
           style: { backgroundColor: '#ddd', color: 'white' },
         },
        ]}
          right={[
            {
              text: '取消',
              onPress: () => console.log('取消'),
              style: { backgroundColor: '#ddd', color: 'white' },
            },
            {
              text: '退出',
              onPress: () => outList(),
              style: { backgroundColor: '#F4333C', color: 'white' },
            },
          ]}
          onOpen={() => getDetails(averageList)}
          onClose={() => console.log('global close')}
      >
        <Item
            thumb={
              <Icon type={require('!svg-sprite!../../../assets/icons/等待-实心.svg')} size="md" />
              }
            arrow="horizontal"
            key={averageList.id}
            extra={`￥${averageList.cost}`}
            onClick={ () => {
              getDetails(averageList);
              enterDetails();
            }
          }
            ><div style={{fontSize:'0.46rem'}}>
              {averageList.title}
              <span style={{fontSize:'0.3rem',color:'#666666'}}>
                &nbsp;#
              </span>
              <span style={{fontSize:'0.3rem',color:'#F66666'}}>
              {averageList.id}
              </span>
            </div>
             <div style={{fontSize:'0.35rem',color:'#666666'}}>
                  {averageList.tips}<br/>
                  {averageList.created_at}
             </div>
        </Item>
      </SwipeAction>
      </div>
    );
  }
 );



   const doneItemList = averageLists.map(averageList =>{
     if(averageList.state == '已完成')
     return(
         <div key={averageList.id + 100}>
         {/* 会有警告信息说不是个函数 */}
         <SwipeAction
           style={{ backgroundColor: 'gray' }}
           autoClose
           right={[
             {
               text: '取消',
               onPress: () => console.log('取消'),
               style: { backgroundColor: '#ddd', color: 'white' },
             },
             {
               text: '详情',
               onPress: () => getListResult(averageList),
               style: { backgroundColor: '#108ee9', color: 'white' },
             },
           ]}
           onOpen={() => getDetails(averageList)}
           onClose={() => console.log('global close')}
       >
         <Item
             thumb={<Icon type={require('!svg-sprite!../../../assets/icons/对勾-实心.svg')} size="md" />}
             arrow="horizontal"
             key={averageList.id}
             extra={`￥${averageList.cost}`}
             onClick={ () => {
               getDetails(averageList);
               enterDetails();
             } }
             ><div >
               <span style={{fontSize:'0.46rem'}}>
               {averageList.title}
             </span>
               <span style={{fontSize:'0.3rem',color:'#666666'}}>
                 &nbsp;#
               </span>
               <span style={{fontSize:'0.3rem',color:'#F66666'}}>
               {averageList.id}
               </span>
             </div>
              <div style={{fontSize:'0.35rem',color:'#666666'}}>
                   {averageList.tips}<br/>
                   {averageList.created_at}
              </div>
         </Item>
       </SwipeAction>

       </div>
   );
 }
);

  return (
    <div className={styles.normal}>
      <QueueAnim>
      <List renderHeader={() => '— 进行中 —'} id='list1' key='1'>
        {doingItemList}
      </List>
      <List renderHeader={() => '— 已完成 —'} id='list2' key='2'>
        {doneItemList}
      </List>
    </QueueAnim>
    </div>
  );
}


export default AverageList;
