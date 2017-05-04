import React from 'react';
import { connect } from 'dva';
import styles from './Welcome.css';
import APP_InformationComponent from '../components/Information/APP_Information/APP_Information';
import UserComponent from '../components/Login_Register/Login_Register';

function Welcome({userData,informationData,dispatch}) {
  //将dispatch直接放进data中,直接引入
  userData={...userData,dispatch};
  informationData={...informationData,dispatch};

  return (
    <div className={styles.normal}>
      <APP_InformationComponent informationData={informationData} />
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
