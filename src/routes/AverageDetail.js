import React from 'react';
import { connect } from 'dva';
import styles from './AverageDetail.css';
import AverageDetailComponent from '../components/Average/AverageDetail/AverageDetail';

function AverageDetail({averageDetailData,dispatch}) {
  averageDetailData = {...averageDetailData,dispatch};
  return (
    <div className={styles.normal}>
      <AverageDetailComponent averageDetailData={averageDetailData} />
    </div>
  );
}

function mapStateToProps(state) {
  const averageDetailData=state.averageDetails;
  return {
    averageDetailData:averageDetailData,
  };
}

export default connect(mapStateToProps)(AverageDetail);
