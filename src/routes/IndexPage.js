import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayoutComponent from '../components/MainLayout/MainLayout';
import AccountComponent from '../components/Account/Account';
import AverageListComponent from '../components/Average/AverageList/AverageList';
import User_InformationComponent from '../components/Information/User_Information/User_Information';



function IndexPage({userData,averageListData,dispatch}) {

  averageListData = {...averageListData,dispatch};
  userData = {...userData,dispatch};
  return (
    <div className={styles.normal}>
        <MainLayoutComponent averageListData={averageListData} >
          <AverageListComponent averageListData={averageListData}  userData={userData}/>
          <AccountComponent />
          <User_InformationComponent userData={userData}/>
        </MainLayoutComponent>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
  const userData = state.users;
  const averageListData=state.averageLists;
  return {
    userData:userData,
    averageListData:averageListData,
  };
}

export default connect(mapStateToProps)(IndexPage);
