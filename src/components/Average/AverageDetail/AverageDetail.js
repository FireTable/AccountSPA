import React from 'react';
import styles from './AverageDetail.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { Switch,Flex,Popover,Drawer,Button,WhiteSpace,Card,WingBlank,Tag,Modal,Toast,List,InputItem} from 'antd-mobile';


const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;
let checked = false;

function AverageDetail({averageDetailData}) {

//获取model中的真实数据
const Data = averageDetailData.realData;


  //登录方法,通过payload来上传数据给model

  function addDetail() {
    console.log('addDetail');


  //   const newData = userData;
  //   userData.dispatch({
  //     type: 'users/login',
  //     payload:newData,
  //  });
  }

  function changeState(){
    checked = !checked;
      averageDetailData.dispatch({
        type: 'averageLists/changeState',
        payload:checked,
     });
  }



  const Test = ()=>{
    if(Data.state=='不免单'){
      checked = false;
    }else{
      checked = true;
    }
    return (
    <Modal
        title="这是 title"
        transparent
        maskClosable={false}
        visible='true'
        footer={[{ text: '确定', onPress: () => { console.log('ok'); } }]}
         style={{width:'80%'}}
      >

        <InputItem  clear placeholder="标题" >
          标题
        </InputItem>

        <InputItem clear placeholder="0.00" extra="元" type="number" >
           花费
        </InputItem>
        <InputItem  clear value="">
            备注
        </InputItem>

        <WhiteSpace/>

      <Button  size="small" type="primary"
      >登   录</Button>
      <Button  size="small" type="ghost" >注   册</Button>

      </Modal>
   );
  }


   const CardList = Data.map(Data =>{
     //判断是否自己发的
     let divClass;
     if(Data.id == '3'){
       divClass = styles.div_right;
     }else{
       divClass = styles.div_left;
     }
     return (
       <div className={divClass}>
         <Tag>abc</Tag>
         <WingBlank size='lg'>
         <Card onClick={()=>console.log('ds')}>
            <Card.Header/>
            <Card.Body>
              <div>{Data.tips}</div>
            </Card.Body>
            <Card.Footer content={Data.cost} />
          </Card>
          </WingBlank>
          <WhiteSpace size='xl'/>
     </div>
    );
  }
);


  return (
    <div className={styles.normal}>
      {CardList}
      <Test/>
      <div className={styles.div_btn}>
      <Button  type="primary" inline style={{ margin: '0.08rem' }}
               onClick={ () => addDetail()}
               >+</Button>

      </div>
    </div>
  );
}


export default AverageDetail;
