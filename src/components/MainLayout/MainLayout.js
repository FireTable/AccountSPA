import React from 'react';
import {TabBar,Popover ,NavBar,Icon,WhiteSpace,Button,Popup,List,InputItem,WingBlank,Toast} from 'antd-mobile';
import styles from './MainLayout.css';

/* eslint global-require: 0 */
let nowTabContent;
const Item = Popover.Item;

//气泡控件
class PopoverComponent extends React.Component {

  //构造器
  constructor(props) {
    super(props);
  }

  state = {
    visible: false,
    selected: '',
  };

  onSelect = (opt) => {
    console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });

    switch(opt.props.value){
      case 'scan':
        break;
      case 'create':
        this.showCreatePopup();
        break;
      case 'add':
        this.showAddPopup();
        break;
    }
  };

  onMaskClose = () => {
    console.log('onMaskClose');
    // also support Promise
    // return new Promise((resolve) => {
    //   console.log('1000ms 后关闭');
    //   setTimeout(resolve, 1000);
    // });
  };

  showAddPopup = () => {
 // e.preventDefault(); // 修复 Android 上点击穿透
   Popup.show(<AddPopup onClose={() => Popup.hide()}
     //传递属性进去
     averageListData={this.props.averageListData} />,this.onMaskClose());
 };

   showCreatePopup = () => {
  // e.preventDefault(); // 修复 Android 上点击穿透
    Popup.show(<CreatePopup onClose={() => Popup.hide()}
      //传递属性进去
      averageListData={this.props.averageListData} />,this.onMaskClose());
  };
  // newInstance() {
  //  const ins = Popup.newInstance();
  //  ins.show(<Button onClick={() => ins.hide()}>关闭</Button>);
  // },

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  render() {
    let offsetX = -10; // just for pc demo
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }
    return (
      <div>
        <Popover mask
          visible={this.state.visible}
          overlay={[
            (<Item key="0" value="scan" disabled>扫一扫</Item>),
            (<Item key="1" value="create" style={{ whiteSpace: 'nowrap' }}>创建活动</Item>),
            (<Item key="2" value="add" >
              <span style={{ marginRight: 5 }}>加入活动</span>
            </Item>),
          ]}
          popupAlign={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [offsetX, 15],
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 0.3rem',
            marginRight: '-0.3rem',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            {/* 嵌入图标 */}
            <Icon type={require('!svg-sprite!../../assets/icons/菜单.svg')} size="xs" />
          </div>
        </Popover>
    </div>
  );
  }
}

class CreatePopup extends React.Component {
  //构造器
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    sel: '',
  };
  onSel = (sel) => {
    this.setState({ sel });
    this.props.onClose();
  };

  createList(){
    console.log(this.props);
    this.props.averageListData.cost ='0';
    const newData = this.props.averageListData;
    console.log(newData);
    //创建
    this.props.averageListData.dispatch({
      type: 'averageLists/createList',
      payload:newData,
   });
   //Toast,并且关闭Popup
   Toast.info('创建活动中，请稍后...', 1.3,
     ()=>{
       //创建成功后刷新列表
       this.props.averageListData.dispatch({
         type: 'averageLists/queryAverageList',
         payload:newData,
      });
       Popup.hide();
     }
   );


  }

  render() {
    return (

      <div style={{textAlign:'center'}}>
        <WingBlank>
        <List renderHeader={() => `新增活动`}>
            <InputItem  clear placeholder='必填'
              onChange={value => this.props.averageListData.title = value}>
              标题
            </InputItem>
            <InputItem  placeholder='必填' type='password'
              onChange={value => this.props.averageListData.password = value}>
              密码
            </InputItem>
            <InputItem  placeholder='选填'
              onChange={value => this.props.averageListData.tips = value}>
              备注
            </InputItem>
            <WhiteSpace/>
          <Button  size="small" type="primary"
            onClick={()=>this.createList()}>创   建</Button>
            <WhiteSpace/>
          <Button  size="small" type="ghost" onClick={() => Popup.hide()}>取   消</Button>
        </List>
          <WhiteSpace size='md'/>
          </WingBlank>

        </div>

    );
  }
}


class AddPopup extends React.Component {
  //构造器
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    sel: '',
  };
  onSel = (sel) => {
    this.setState({ sel });
    this.props.onClose();
  };

  addList(){
    console.log(this.props);
    this.props.averageListData.cost ='0';
    const newData = this.props.averageListData;
    console.log(newData);
    //加入
    this.props.averageListData.dispatch({
      type: 'averageLists/addList',
      payload:newData,
   });
   //Toast,并且关闭Popup
   Toast.info('加入活动中，请稍后...', 1.3,
     ()=>{
       //加入成功后刷新列表
       this.props.averageListData.dispatch({
         type: 'averageLists/queryAverageList',
         payload:newData,
      });
       Popup.hide();
     }
   );

  }

  render() {
    return (

      <div style={{textAlign:'center'}}>
        <WingBlank>
        <List renderHeader={() => `加入活动`}>
            <InputItem  clear placeholder='必填'
              onChange={value => this.props.averageListData.id = value}>
              编号
            </InputItem>
            <InputItem  placeholder='必填' type='password'
              onChange={value => this.props.averageListData.password = value}>
              密码
            </InputItem>
            <WhiteSpace/>
          <Button  size="small" type="primary"
            onClick={()=>this.addList()}>加   入</Button>
            <WhiteSpace/>
          <Button  size="small" type="ghost" onClick={() => Popup.hide()}>取   消</Button>
        </List>
          <WhiteSpace size='md'/>
          </WingBlank>

        </div>

    );
  }
}



class MainLayout extends React.Component {

  //构造器
  constructor(props) {
    super(props);
    console.log('bdbsbdbs');
    console.log(props);
    this.state = {
      selectedTab: 'leftTab',
      hidden: false,
      title:'AA分账',
      display:'',
    };
  }

    state ={
        averageListData:this.props.averageListData,
      }


  //决定展示的内容
  decideContent(){
    //内容展示初始化
    const leftTabContent = React.Children.only(this.props.children[0]);
    const middleTabContent = React.Children.only(this.props.children[1]);
    const rightTabContent = React.Children.only(this.props.children[2]);
    switch(this.state.selectedTab){
      case 'leftTab':
        nowTabContent = leftTabContent;
        break;
      case 'middleTab':
        nowTabContent = middleTabContent;
        break;
      case 'rightTab':
        nowTabContent = rightTabContent;
        break;
    }
  }

  renderContent(pageText) {
    //决定展示内容
    this.decideContent();
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        {/* <a style={{ display: 'block', marginTop: 40,  color: '#108ee9' }} onClick={(e) => {
          e.preventDefault();
          this.setState({
            hidden: !this.state.hidden,
          });
        }}
        >
          点击切换 tab-bar 显示/隐藏
        </a> */}
        <div>
          {nowTabContent}
        </div>
      </div>
    );
  }

  renderIcon(url) {
    return (
      <div style={{
        width: '0.44rem',
        height: '0.44rem',
        background: `url(${url}) center center /  0.42rem 0.42rem no-repeat` }}
      />
    );
  }




  render() {
    return (
      <div className={styles.normal}>
      <NavBar mode="light" iconName={false} rightContent={[
        <div style={{display:`${this.state.display}`}}>
          {/* 不用Button了,改用气泡 */}
          {/* <Button  inline style={{fontSize:'1.0rem',border: '0px solid #ddd',width:'1.6rem' }} size='small'
                   activeStyle ={false}
                   onClick={()=>(event)=>
                     this.showPopup(event)
                   }> */}
                 <PopoverComponent averageListData={this.props.averageListData}/>
        </div>
               ]
      }>{this.state.title}</NavBar>

      <div>
      {this.renderContent()}
      <WhiteSpace size='xl'/>
      <WhiteSpace size='xl'/>
      <WhiteSpace size='xl'/>
      </div>


      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="AA分账"
          key="AA分账"
          icon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg')}
          selectedIcon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg')}
          // 判断如果是该tab返回ture
          selected={this.state.selectedTab === 'leftTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'leftTab',
              title:'AA分账',
              display:'',
            });
          }}
        >

        </TabBar.Item>
        <TabBar.Item
          icon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg')}
          selectedIcon={
          this.renderIcon('https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg')}
          title="记账"
          key="记账"
          selected={this.state.selectedTab === 'middleTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'middleTab',
              title:'记账',
              display:'',
             });
          }}
        >

        </TabBar.Item>
        <TabBar.Item
          icon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg')}
          selectedIcon={this.renderIcon('https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg')}
          title="我"
          key="我"
          selected={this.state.selectedTab === 'rightTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'rightTab',
              title:'我',
              display:'none',
            });
          }}
        >

        </TabBar.Item>
      </TabBar>



    </div>
    );
  }
}

export default MainLayout;
