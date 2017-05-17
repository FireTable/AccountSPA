import React from 'react';
import styles from './APP_Information.css';

import {
  Tag,
  Icon,
  Flex,
  WhiteSpace,
  WingBlank,
  Button,
  InputItem
} from 'antd-mobile';
import TweenOne from 'rc-tween-one';

function Information({informationData}) {
  const p1 = 'M0,100 C5,120 25,130 25,100';
  const ease1 = TweenOne.easing.path(p1);
  const animation = [
    {
      repeatDelay: 500,
      appearTo: 0,
      scaleX: 0,
      scaleY: 2,
      repeat: 0,
      yoyo: true,
      ease: ease1,
      duration: 1500
    }
  ];

  return (
    <div className={styles.normal}>
      <WhiteSpace size="xl"/>
      <WhiteSpace size="xl"/>
      <WhiteSpace size="xl"/> {/* <TweenOne
       animation={animation}
       paused={false}
       className="code-box-shape"
       style={{
         position: 'absolute',
         transformOrigin: 'center bottom',
       }}
     > */}
      <div>
        <Flex justify='center' direction='column'>

          {/* 账spa_logo */}

          <Icon type={require('!svg-sprite!../../../assets/icons/logo.png')} size="lg"/> {/* <Tag>{informationData.title}</Tag> */}

        </Flex>
      </div>
      {/* </TweenOne>*/}
      {/* <WhiteSpace size="lg" /> */}
      {/* <WhiteSpace size="lg" /> */}

      <WhiteSpace size="md"/>
    </div>
  );
}

export default Information;
