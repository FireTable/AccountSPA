import React from 'react';
import { connect } from 'dva';
import styles from './Welcome.css';
import InformationComponent from '../components/Information/Information';
import UserComponent from '../components/Users/Users';

function Welcome({userData,informationData,dispatch}) {
  //将dispatch直接放进data中,直接引入
  userData={...userData,dispatch};
  informationData={...informationData,dispatch};

  return (
    <div className={styles.normal}>
      <InformationComponent informationData={informationData} />
      <UserComponent userData={userData}  />
    </div>
  );
}

function mapStateToProps(state) {
  const userData=state.users;
  const informationData=state.information;
  return {
    userData:userData,
    informationData:informationData,
  };
}

//通过connet来下发数据
export default connect(mapStateToProps)(Welcome);
