import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayoutComponent from '../components/MainLayout/MainLayout';



function IndexPage() {
  return (
    <div className={styles.normal}>
        <MainLayoutComponent/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
