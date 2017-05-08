import React from 'react';
import styles from './AverageList.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Button,List,WhiteSpace} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;


function AverageList({averageListData}) {

//获取model中的真实数据
const Data = averageListData.realData;

  //登录方法,通过payload来上传数据给model
  function enterDetail(id) {
    console.log(id);
  //   const newData = userData;
  //   userData.dispatch({
  //     type: 'users/login',
  //     payload:newData,
  //  });
  }

console.log(Data);

  const ItemList = Data.map(Data =>
      <div>
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          arrow="horizontal"
          key={Data.id}
          extra={Data.created_at}
          onClick={ () => enterDetail(Data.id) }
          >{Data.title}
          <Brief>{Data.cost}</Brief>
      </Item>
    </div>
   );

  return (
    <div className={styles.normal}>
      <List renderHeader={() => '未完成'}>
        {ItemList}
      </List>
    </div>
  );
}


export default AverageList;
