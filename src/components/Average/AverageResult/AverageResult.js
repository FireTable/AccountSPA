import React from 'react';
import styles from './AverageResult.css';
import { routerRedux} from 'dva/router';
import { Result, Icon, WhiteSpace,NavBar,Button,WingBlank,List,Grid} from 'antd-mobile';
import _ from 'lodash';

function AverageResult({averageResultData,userData,averageListData}) {

const Item = List.Item;

const id = userData.id;
//paylist是我应付花费,我应该给谁多少钱,不包括免单,要平均
const payList= averageResultData.payList;
//costList是我本来的花费,包括了免单,谁为我花多少钱,要平均
const costList= averageResultData.costList;
//freelist是免单了的花费,表示谁总共免单了多少钱,
const freeList= averageResultData.freeList;
//freeList_all谁免单了多少
const freeList_all= averageResultData.freeList_all;
const actor_num= averageResultData.actor_num;


console.log('averageListData');
console.log(averageListData);
console.log('UserData');
console.log(userData);
console.log('averageResultData');
console.log(averageResultData);

console.log(freeList_all);
console.log("test");

//lodash将对象转为数组
const freeLists =  _.toPairs(freeList_all);
const payLists =  _.toPairs(payList);

const resultItemList = freeLists.map(freeList=>{
  const id = freeList[0];
  const cost =freeList[1];
  const actorList =userData.actorLists_new;
  return(
    <Item
        thumb={actorList[id].icon}
        ><div >
          <span style={{fontSize:'0.45rem'}}>
          {actorList[id].nickname}：
          </span>
          <span style={{fontSize:'0.45rem',color:'#666666'}}>
          我给大家免了
          </span>
          <span style={{fontSize:'0.45rem',color:'#F66666'}}>
          ￥{cost}
          </span>

        </div>
    </Item>

  );

});


//AA分账的list_item
const AAItemList = payLists.map(payLists_map=>{
  const id = payLists_map[0];
  const cost =payLists_map[1];
  let free ='none';
  if(freeList[id]){
    free = freeList[id];
  }

  const actorList =userData.actorLists_new;
  return(
    <Item
        thumb={actorList[id].icon}
        >
          <div >
          <span style={{fontSize:'0.45rem'}}>
              {actorList[id].nickname}
            </span>
          <span style={{fontSize:'0.45rem',color:'#666666'}}>
          ：嗨，你还欠我
            <span style={{fontSize:'0.45rem',color:'#F66666'}}>
              {(free != 'none'? `￥${cost-free}`:`￥${cost}`)}
            </span>
            {(free != 'none'? '，给你免了':'。')}
            <span style={{fontSize:'0.45rem',color:'#F66666'}}>
              {(free != 'none'? `￥${free}`:'')}
            </span>
              {(free != 'none'? '！':'')}
          </span>

            <div style={{fontSize:'0.45rem',color:'#666666',
              display:`${(actorList[id].alipay ? ``:'none')}`}}>
              {(actorList[id].alipay ? `支付宝：`:'')}
              {(actorList[id].alipay ? `${actorList[id].alipay}    `:'')}
              &nbsp;&nbsp;&nbsp;
              {(actorList[id].alipay_tips ? '    备注：':'')}
              {(actorList[id].alipay_tips ? `${actorList[id].alipay_tips}。`:'')}
            </div>
            <div style={{fontSize:'0.45rem',color:'#666666',
              display:`${(actorList[id].wechat ? ``:'none')}`}}>
              {(actorList[id].wechat ? `微信：`:'')}
              {(actorList[id].wechat ? `${actorList[id].wechat}`:'')}
              &nbsp;&nbsp;&nbsp;
              {(actorList[id].wechat_tips ? '备注：':'')}
              {(actorList[id].wechat_tips ? `${actorList[id].wechat_tips}。`:'')}
            </div>


        </div>
    </Item>

  );

});




const AAContent = ()=>{
  return(
      <div style={{fontSize:'0.45rem'}}>
        <div>
          待付款情况如下
        </div>
        <br/>

        <List>
          {AAItemList}
        </List>

        <br/>
        大侠有空把欠账结一下哈！
      </div>
    );

}


const FreeContent = ()=>{
  if(freeList_all.length!=0){
  return(
      <div>
        <br/>
        <div>
          免单记录如下
        </div>
        <br/>
        <List>
          {resultItemList}
        </List>
        <br/>
        以上大侠替大家省了不少钱呢！
      </div>
    );

  }else{
    return(
      <span><br/>无免单记录</span>
    );
  }
}


  const ResultContent = ()=>{
    const my_pay = costList[id];
    return(
      <div style={{fontSize:'0.45rem'}}>
        本次活动总消费（未减去免单费用）：
        <span style={{fontSize:'0.45rem'}}>
        ￥{averageResultData.allCost}
        </span>
        <br/>
        参与人数：
        <span style={{fontSize:'0.45rem'}}>
        {actor_num}人
        </span>
        <br/>
        大侠仅凭一人之力支付了：
        <span style={{fontSize:'0.45rem'}}>
        ￥{my_pay}
        </span><br/>
        <div>
          <FreeContent/>
        </div>
      </div>
    );
  }




  return (
    <div className={styles.normal}>
      <NavBar
        mode="light"
        iconName={require('!svg-sprite!../../../assets/icons/left.svg')}
        onLeftClick={() =>{
          averageResultData.dispatch(routerRedux.push('/'));
        }}
      >结算详情</NavBar>

      <WhiteSpace />
    <Result
     img={<Icon  type={require('!svg-sprite!../../../assets/icons/提示-实心.svg')} className={styles.icon} />}
     title={<span style={{fontSize:'0.7rem'}}>结算成功</span>}
     message={<ResultContent/>}
    />
    <WhiteSpace />

    <Result
     img={<Icon type={require('!svg-sprite!../../../assets/icons/等待-实心.svg')} className={styles.icon} />}
     title={<span style={{fontSize:'0.7rem'}}>AA分账结果</span>}
     message={<AAContent/>}
    />
    <WhiteSpace size='lg'/>
    <WingBlank>
    <Button className={styles.btnStyle} size="small" type="primary"
      onClick={
        () =>{
          averageResultData.dispatch(routerRedux.push('/'));
        }
      }>
      已   阅</Button>
    </WingBlank>
    <WhiteSpace size='lg'/>
    </div>
  );
}

export default AverageResult;
