import React from 'react';
import { connect } from 'dva';
import styles from './AverageResult.css';
import AverageResultComponent from '../components/Average/AverageResult/AverageResult';

function AverageResult({averageResultData,dispatch,userData,averageListData}) {
  averageResultData = {...averageResultData,dispatch};
  userData = {...userData,dispatch};
  averageListData ={...averageListData,dispatch}
  return (
    <div className={styles.normal}>
      <AverageResultComponent averageResultData={averageResultData} userData={userData} averageListData={averageListData}/>
    </div>
  );
}

function mapStateToProps(state) {
  const averageResultData=state.averageResults;
  const userData=state.users;
  const averageListData = state.averageLists;
  return {
    averageResultData:averageResultData,
    userData:userData,
    averageListData:averageListData,
  };
}

export default connect(mapStateToProps)(AverageResult);
