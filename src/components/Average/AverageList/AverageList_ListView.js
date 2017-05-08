import React from 'react';
import styles from './AverageList.css';
/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView,Button } from 'antd-mobile';

let index;
let realData;
let data;

const NUM_SECTIONS = 2;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;


class AverageList extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    //获取从model那边来的数据,做初步加载
    data = this.props.averageListData.testData;
    index = data.length - 1;

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      data:data,
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
    };
  }


  componentDidMount() {
    // you can scroll to the specified position
    // this.refs.lv.refs.listview.scrollTo(0, 200);
    // simulate initial Ajax
    setTimeout(() => {
      this.genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 600);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    //获取真正的数据
    realData = nextProps.averageListData.realData;
    index = realData.length - 1;
      this.setState({
        data:realData,
        index:index,
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
    },
    function () {
             console.log('获取真正数据成功');
         });
  }

  //最底部的时候支持onEndReached方法回调
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 4,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      //利用index--来完成一个来回,当index<0,返回数组最后的位置(重置)
      if (index < 0) {
        index = this.state.index;
      }
      let obj = this.state.data[index--];
      console.log(index);
      //console.log(obj);
      //待加载判定
      // if(this.state.data!='待加载')
      {
      return (
        <div key={rowID} className="row">
          <div className="row-title">{obj.title}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
            {/* <img style={{ height: '1.28rem', marginRight: '0.3rem' }} src={obj.img} /> */}
            <div className="row-text">
              <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' }}>{obj.tips}</div>
              <div><span style={{ fontSize: '0.6rem', color: '#FF6E27' }}>{obj.cost}</span>元/任务</div>
            </div>
          </div>
        </div>
      );
    }
    };

    return (
      <div>
        <ListView ref="lv"
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
        renderSectionHeader={sectionData => (
          <div>{`任务 ${sectionData.split(' ')[1]}`}</div>
        )}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        //每一次事件的循环渲染的行数
        pageSize={4}
        scrollEventThrottle={100}
        onScroll={() => { console.log('scroll'); }}
        // 最底部onEndReached方法回调
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        //固定区块标题到页面顶部
        stickyHeader
        stickyProps={{
          stickyStyle: { zIndex: 999, WebkitTransform: 'none', transform: 'none' },
          // topOffset: -43,
           isActive: false, // 关闭 sticky 效果,不再悬浮置顶
        }}
        stickyContainerProps={{
          className: 'for-stickyContainer-demo',
        }}
      />
    </div>
    );
  }
}

export default AverageList;
