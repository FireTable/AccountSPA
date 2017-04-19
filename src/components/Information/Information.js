import React from 'react';
import styles from './Information.css';

import { Tag,Icon,Flex, WhiteSpace, WingBlank,Button,InputItem} from 'antd-mobile';

function Information({informationData}) {

  return (
    <div className={styles.normal}>
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      {/* 账spa_logo */}
      <Flex direction="column" >
        <Icon type={require('!svg-sprite!../../assets/icons/QQicon.svg')} size="lg" />
        <Tag>{informationData.title}</Tag>
      </Flex>

      <WhiteSpace size="lg" />
    </div>
  );
}

export default Information;
