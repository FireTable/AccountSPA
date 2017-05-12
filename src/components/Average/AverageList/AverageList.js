import React from 'react';
import {Link} from 'react-router';
import styles from './AverageList.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Button,List,WhiteSpace,Toast,Icon} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


function AverageList({averageListData,userData}) {

//获取model中的数据
const averageLists = averageListData.averageLists;


  //点击之后进入averageList的detail
  function getDetails(averageList) {
    const id = averageList.id;
    averageListData.id = id ;
    const newData = averageList;
    console.log(newData);
    Toast.info('读取数据中...', 1.2);
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
  }

console.log('长度');
console.log(averageLists.length);




  const doingItemList = averageLists.map(averageList =>{
    if(averageList.state == '进行中')
    return(
        <div>
        {/* 会有警告信息说不是个函数 */}
        <Link to='/averagedetail'>
        <Item
            thumb={<Icon type={require('!svg-sprite!../../../assets/icons/等待-实心.svg')} size="md" />}
            arrow="horizontal"
            key={averageList.id}
            extra={`￥${averageList.cost}`}
            onClick={ () => getDetails(averageList) }
            ><div style={{fontSize:'0.46rem'}}>{averageList.title}</div>
             <div style={{fontSize:'0.35rem',color:'#666666'}}>
                  {averageList.tips}<br/>
                  {averageList.created_at}
             </div>
        </Item>
        </Link>
      </div>
    );
  }
 );


   const doneItemList = averageLists.map(averageList =>{
     if(averageList.state == '已完成')
     return(
         <div>
         {/* 会有警告信息说不是个函数 */}
         <Link to='/averagedetail'>
         <Item
             thumb={<Icon type={require('!svg-sprite!../../../assets/icons/对勾-实心.svg')} size="md" />}
             arrow="horizontal"
             key={averageList.id}
             extra={`￥${averageList.cost}`}
             onClick={ () => getDetails(averageList) }
             ><div style={{fontSize:'0.46rem'}}>{averageList.title}</div>
              <div style={{fontSize:'0.35rem',color:'#666666'}}>
                   {averageList.tips}<br/>
                   {averageList.created_at}
              </div>
         </Item>
         </Link>
       </div>
   );
 }
);

  return (
    <div className={styles.normal}>
      <List renderHeader={() => '— 进行中 —'}>
        {doingItemList}
      </List>
      <List renderHeader={() => '— 已完成 —'}>
        {doneItemList}
      </List>
    </div>
  );
}


export default AverageList;
