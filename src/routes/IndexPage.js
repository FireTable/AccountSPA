import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayoutComponent from '../components/MainLayout/MainLayout';
import AccountComponent from '../components/Account/Account';
import AverageListComponent from '../components/Average/AverageList/AverageList';
import User_InformationComponent from '../components/Information/User_Information/User_Information';



function IndexPage({averageListData,dispatch}) {

  averageListData = {...averageListData,dispatch};

  return (
    <div className={styles.normal}>
        <MainLayoutComponent>
          <AverageListComponent averageListData={averageListData} />
          <AccountComponent />
          <User_InformationComponent />
        </MainLayoutComponent>
    </div>
  );
}

IndexPage.propTypes = {
};

function mapStateToProps(state) {
  const averageListData=state.averageLists;
  return {
    averageListData:averageListData,
  };
}

export default connect(mapStateToProps)(IndexPage);
