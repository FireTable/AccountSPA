import React from 'react';
import {TabBar, NavBar,Icon,WhiteSpace} from 'antd-mobile';
import styles from './MainLayout.css';

/* eslint global-require: 0 */
let nowTabContent;

class MainLayout extends React.Component {

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'leftTab',
      hidden: false,
      title:'AA分账',
    };
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
    //先决定展示内容
    this.decideContent();
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        <a style={{ display: 'block', marginTop: 40,  color: '#108ee9' }} onClick={(e) => {
          e.preventDefault();
          this.setState({
            hidden: !this.state.hidden,
          });
        }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
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
      <NavBar mode="light">{this.state.title}</NavBar>
      <WhiteSpace/>
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
            });
          }}
        >

        </TabBar.Item>
      </TabBar>
      {this.renderContent()}
    </div>
    );
  }
}

export default MainLayout;
