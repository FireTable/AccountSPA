import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './AverageDetail.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import {  Icon,NavBar,Grid,Steps,Switch,Button,WhiteSpace,Card,WingBlank,Tag,Modal,Toast,List,InputItem} from 'antd-mobile';


const prompt = Modal.prompt;
const Item = List.Item;
const Brief = Item.Brief;
const Step = Steps.Step;
let checked = false;
//进度条计数
let current;
//参与者id
let actor_id;
//detail表
let averageDetailLists;
//modal可见
let modalVisible;
//modal中按钮文字
let leftBtnText;
let rightBtnText;
//Button是否可用
let disabledBtn = false;
//modal的类型
let modalType;


//modal的tips
const waitTips ='正在处理...';

//存放未参与者的列表
let no_shareLists= [];
//存放参与者的列表
let shareLists = [];



function AverageDetail({averageDetailData,userData,averageListData}) {

//获取model中的真实数据,供card用
averageDetailLists = averageDetailData.averageDetailLists;
current = averageDetailData.current;
modalVisible = averageDetailData.modalVisible;
//将list的参与者加到no_shareLists,默认都没有参与
no_shareLists = averageDetailData.actorLists;
//shareLists是参与的,是参与表的依据
shareLists = averageDetailData.shareLists;
actor_id = averageDetailData.actor_id;
disabledBtn = ((averageListData.state == '已完成') ? true : false );

console.log('init');
console.log(userData);
console.log(averageListData);


//创建新的条目
function createNewDetail() {
  //参与者根据列表的长度变换
  averageDetailData.actor_num = shareLists.length;
  averageDetailData.creator_id = userData.id;
  const newData = averageDetailData;
  averageDetailData.dispatch({
    type: 'averageDetails/create',
    payload:newData
 });
}

//更新的条目
function updateOldDetail() {
  //参与者根据列表的长度变换
  averageDetailData.actor_num = shareLists.length;
  averageDetailData.creator_id = userData.id;
  const newData = averageDetailData;
  averageDetailData.dispatch({
    type: 'averageDetails/update',
    payload:newData
 });
}

//删除的条目
function deleteOldDetail() {
  //参与者根据列表的长度变换
  const newData = averageDetailData;
  averageDetailData.dispatch({
    type: 'averageDetails/_delete',
    payload:newData
 });
}

//查询averagelist所有参与者
function queryActor() {
  const newData = averageDetailData;
  averageDetailData.dispatch({
    type: 'averageDetails/queryActor',
    payload:newData
 });
}

//update一下,用于传入modal的list数据
function updateActor() {
  const newData = averageDetailData;
  averageDetailData.dispatch({
    type: 'averageDetails/updateActor',
    payload:newData
 });
}

//拼接actor_id,变成 id1-id2-id3-……形式
//顺便上传actor_num
function pushActor_id(){
  //由于是遍历,得先重置免得重复
  actor_id ='';
  shareLists.map(shareList =>{
     actor_id=`${actor_id}${shareList.id}-`;
    }
  );
  //actor_id
  averageDetailData.actor_id = actor_id;
}

  //增加到参与者列表,并且在grid中移除
  function changeActorList(obj,index){
    let operation;
    let listIndex;
    if(shareLists.length >0){
      for(let i = 0;i < shareLists.length; i++){
        if(obj.id == shareLists[i].id){
            operation = 'splice';
            listIndex = i ;
            break;
        }else{
            operation = 'push';
        }
      }
    }else{
      operation = 'push';
    }
    //push移除grid,添加到shareLists,splice相反
    if(operation == 'push'){
      shareLists.push(obj);
      no_shareLists.splice(index,1);
    }else if (operation == 'splice') {
      no_shareLists.push(obj);
      shareLists.splice(listIndex,1);
    }
    //上传参与者列表
    //将actor_id也存进去
    pushActor_id();
    averageDetailData.dispatch({
      type: 'averageDetails/saveActorList',
      payload:shareLists,actor_id
   });

  }

  //打开增加条目的modal
  function addDetail() {
    console.log('addDetail');
    modalType ='create';
    modalVisible = !modalVisible;
    current = 0 ;
    averageDetailData.dispatch({
      type: 'averageDetails/createModalVisible',
      payload:modalVisible,current
   });
  }

  //打开修改条目的modal
  function updateDetail(averageDetailList) {
    modalType ='update';
    console.log('updateDetail');
    console.log(averageDetailList);
    console.log(averageDetailData);
    //传递数据
    averageDetailData = {...averageDetailData,...averageDetailList};
    console.log(averageDetailData);
    modalVisible = !modalVisible;
    current = 0 ;
    averageDetailData.dispatch({
      type: 'averageDetails/updateModalVisible',
      payload:modalVisible,current,averageDetailData
   });
  }

  //修改免单的数据
  function changeState(){
    const newData = averageDetailData;
    checked = !checked;
      averageDetailData.dispatch({
        type: 'averageDetails/changeState',
        payload:checked,newData
     });
  }

  //modal可见切换
  function createModalVisible(){
    averageDetailData.dispatch({
      type: 'averageDetails/createModalVisible',
      payload:!modalVisible
     });
  }

  //修改进度条
  function changeCurrent(type){
    if(type == 'add'){
    current = current + 1;
    }
    else if (type == 'minus') {
      current = current - 1;
    }
    //将actor_id也放进去averageDetailData中
    const newData = averageDetailData;
    console.log(newData);
    averageDetailData.dispatch({
      type: 'averageDetails/changeCurrent',
      payload:current,newData
     });
  }

  //定义步骤条组件
  const StepComponent =()=>{
    return(
      <div>
        <Steps direction="horizontal" current={current} size='small' >
           <Step title="填写信息"  />
           <Step title="选择参与者"   />
        </Steps>
      </div>
  );
  }

  //定义展示参与者组件
  const ActorList = shareLists.map(actorList =>{
     return (
           <Tag selected={true} onChange={ () => changeActorList(actorList)}>
             {actorList.text}
           </Tag>
      );
    }
  );

  //定义modal的内容组件
  const ModalContent = ()=>{
      if(current == 0){
        return(
        <div>
          <WhiteSpace/>
          <StepComponent/>
          <WhiteSpace/>
          <InputItem  clear placeholder="必填"  defaultValue={averageDetailData.title}
            onChange={value =>averageDetailData.title = value} >
            标题
          </InputItem>
          <InputItem clear placeholder="0.00" extra="元" type="number" defaultValue={averageDetailData.cost}
            onChange={value => averageDetailData.cost = value} >
            花费
          </InputItem>
          <InputItem  clear placeholder="选填" defaultValue={averageDetailData.tips}
            onChange={value => averageDetailData.tips = value} >
            备注
          </InputItem>
          <List.Item extra={<Switch
                            checked={checked}
                            onChange={()=>changeState()}
          />}
          >是否免单</List.Item>
          {/* 如果是create就不显示 */}
          <div style={{display:(modalType == 'create'?"none":"")}}>
          <Button size="small" type="warning"
            onClick={()=>{
              if(averageDetailData.creator_id==userData.id){
              deleteOldDetail();
              Toast.info('删除成功，正在更新...', 1.3,()=>{
                averageDetailData.dispatch({
                  type: 'averageDetails/queryDetails',
                  payload:{
                  }
                });
              });
            }else{
              Toast.info('无法删除他人的条目...', 1.5);
            }
            }}>删除本条目</Button>
          </div>
      </div>
      );
    }
      else if (current == 1)
        return(
        <div>
          <WhiteSpace/>
          <StepComponent/>
          <WhiteSpace/>
          <div>目前：已有{shareLists.length}人参与</div>
          {/* <div>{shareLists.length>0?'包括：':' '}{ActorList}</div> */}
          <WhiteSpace/>
          {/* todos用图片√x来代替 */}
          <div className={styles.div_border}>已参与
          <Grid  data={shareLists}
                  className={styles.grid_border}
                  columnNum={5}
                  //跑马灯
                  isCarousel={true}
                  carouselMaxRow={1}
                  hasLine={false}
                  onClick={(_el, index) => changeActorList(_el,index)}
                />
          </div>
          <WhiteSpace size='lg'/>
          <div className={styles.div_border}>未参与
          <Grid  data={no_shareLists}
                className={styles.grid_border}
                  columnNum={5}
                  //跑马灯
                  isCarousel={true}
                  carouselMaxRow={1}
                  hasLine={false}
                  onClick={(_el, index) => changeActorList(_el,index)}
                />
          </div>
          <WhiteSpace/>
          <span style={{fontSize:'0.45rem',color:'#F4333C'}}>
            *未选择参与者的条目无法分账，也不会记入总金额。
          </span>
        </div>
        );
      else{
        //除了current的以上两种状态,其他上传数据,并且设置modal为看不见
        createModalVisible();
        //如果current==2,那么就是确认,上传数据,并且跳转刷新数据
        if(current == 2){
          //modalType ==create 就新建
          if(modalType == 'create'){
            createNewDetail();
            //强制刷新,延迟一点,防止数据没更新
            console.log('强制刷新');
            Toast.info('添加成功，正在更新...', 1.3,()=>{
              averageDetailData.dispatch({
                type: 'averageDetails/queryDetails',
                payload:{
                }
              });
            }
            );
          }else if (modalType == 'update') {
              if(averageDetailData.creator_id == userData.id){
                updateOldDetail();
                //强制刷新,延迟一点,防止数据没更新
                console.log('强制刷新');
                console.log(averageDetailData.creator_id);
                Toast.info('修改成功，正在更新...', 1.3,()=>{
                  averageDetailData.dispatch({
                    type: 'averageDetails/queryDetails',
                    payload:{
                    }
                  });
                }
                );
              }else{
                Toast.info('无法修改他人的条目...', 1.5);
              }

          }
          }

        return(
          <div>
            {waitTips}
          </div>
        );
      }
    }

  //Modal组件,里面含ModalContent
  const ModalComponent = ()=>{
    //将免单枚举类型转换为按钮属性
    if(averageDetailData.state == '不免单'){
      checked = false;
    }else if(averageDetailData.state == '免单'){
      checked = true;
    }
    //按钮的文字
    if(current == 0){
      leftBtnText  = '取消';
      rightBtnText = '下一步';
    }else if(current == 1){
      leftBtnText  = '上一步';
      rightBtnText = '确认';
    }else{
      leftBtnText ='请稍等';
      rightBtnText='请稍等';
    }
    return (
    //设置成居中?
    <div style={{display:'flex'}}>
    <Modal
        title={(modalType == 'create'?"新增条目":"修改条目")}
        transparent
        maskClosable
        closable={true}
        onClose={()=>createModalVisible()}
        visible={modalVisible}
        footer={[{ text:`${leftBtnText}`, onPress: () => { changeCurrent('minus'); }},
          { text: `${rightBtnText}`, onPress: () => { changeCurrent('add'); } }]}
        style={{width:'80%',height:'80%'}}
      >

      <ModalContent />
      </Modal>
      </div>
  );
}



  const CardList = averageDetailLists.map(averageDetailList =>{
     //判断是否自己发的
     let divClass;
     //todos
     if(averageDetailList.creator_id == userData.id){
       divClass = styles.div_right;
     }else{
       divClass = styles.div_left;
     }
     //查询到actorLists的长度说明加载完毕,渲染list
     if(userData.actorLists.length != 0){
       const actorLists = userData.actorLists_new;
       const index = averageDetailList.creator_id;
     return (
       <div className={divClass}>
         <Tag >{actorLists[index].nickname}</Tag>
         <WingBlank size='lg'>
         <Card onClick={()=>{
           //打开修改modal
           updateDetail(averageDetailList);
           updateActor();
         }}>
            <Card.Header
              title={
                    <div>
                      <span style={{fontSize:'0.52rem'}} >
                      {averageDetailList.title}
                      </span>
                      &nbsp;
                      <span style={{fontSize:'0.4rem',color:'#F66666'}}>
                        ￥{averageDetailList.cost}
                      </span>
                  </div>
                    }
              extra={
                <div>
                <span style={{fontSize:'0.4rem'}}>
                  {averageDetailList.actor_num}人参与
                </span>
                <span style={{fontSize:'0.4rem',color:'#99cc66'}}>
                {(averageDetailList.state =='免单')? '·免单':'' }
                </span>
                </div>
                }
                  />
            <Card.Body>
            <span style={{fontSize:'0.52rem'}}>
              {averageDetailList.tips}
            </span>
            </Card.Body>
            <Card.Footer content={
              <div style={{fontSize:'0.3rem'}}>
              {averageDetailList.updated_at}
            </div>
            } />
          </Card>
          </WingBlank>
          <WhiteSpace size='xl'/>
     </div>
      );
    }else{
      return(
        <div>
        </div>
      );
    }
    }
);

  return (
    <div className={styles.normal}>
      <NavBar mode="light" iconName={require('!svg-sprite!../../../assets/icons/left.svg')}
        //leftContent='AA分账'
        onLeftClick={() =>{
          averageDetailData.dispatch(routerRedux.push('/'));
        }
      }>{averageListData.title}</NavBar>
      <WhiteSpace size="md"/>
      {CardList}
      <ModalComponent/>
      <div className={styles.div_btn}>
      <Button  type="primary" inline style={{ margin: '0.08rem' }} disabled={disabledBtn}
               onClick={ () => {
                addDetail();
                queryActor();
               }}
               >+</Button>
      </div>
    </div>
  );
}


export default AverageDetail;
