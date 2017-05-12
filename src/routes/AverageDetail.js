import React from 'react';
import { connect } from 'dva';
import styles from './AverageDetail.css';
import AverageDetailComponent from '../components/Average/AverageDetail/AverageDetail';

function AverageDetail({averageDetailData,dispatch,userData,averageListData}) {
  averageDetailData = {...averageDetailData,dispatch};
  userData = {...userData,dispatch};
  averageListData ={...averageListData,dispatch};
  return (
    <div className={styles.normal}>
      <AverageDetailComponent averageDetailData={averageDetailData} userData={userData} averageListData={averageListData} />
    </div>
  );
}

function mapStateToProps(state) {
  const averageDetailData=state.averageDetails;
  const userData=state.users;
  const averageListData = state.averageLists;
  return {
    averageDetailData:averageDetailData,
    userData:userData,
    averageListData:averageListData,
  };
}

export default connect(mapStateToProps)(AverageDetail);
