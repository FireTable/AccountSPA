import React from 'react';
import { connect } from 'dva';
import styles from './Welcome.css';
import WelcomeComponet from '../components/Welcome/Welcome';

function Welcome() {
  return (
    <div className={styles.normal}>
      <WelcomeComponet />
    </div>
  );
}

function mapStateToProps(state) {
  const {username,password}=state.user;
  return {
    username,
    password,
  };
}

export default connect(mapStateToProps)(WelcomeComponet);
