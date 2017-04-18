import React from 'react';
import styles from './Welcome.css';

import { Icon,Flex, WhiteSpace, Card, WingBlank,Grid} from 'antd-mobile';

const PlaceHolder = props => (
  <div style={{
    backgroundColor: '#ebebef',
    color: '#bbb',
    textAlign:'center',
    height: '0.6rem',
    lineHeight: '0.6rem',
    width: '100%',
  }} {...props}
  >Item</div>
);

const icons = [
  'check-circle', 'check', 'check-circle-o',
  'cross-circle', 'cross', 'cross-circle-o',
  'up', 'down', 'left',
  'right', 'ellipsis',
  'koubei-o', 'koubei', 'loading',
];
/* eslint global-require: 0 */


const data = icons.map(item => ({
   icon: (<Icon type={item} />),
   text: item,
 }));

function Welcome() {
  return (
    <div className={styles.normal}>
      <Flex align="center" direction="column" >
        <Flex.Item ><PlaceHolder/></Flex.Item>
        <WhiteSpace/>
        <Icon type={require('!svg-sprite!../../assets/icons/socialization/Loading.svg')} />

      </Flex>



    </div>
  );
}

export default Welcome;
