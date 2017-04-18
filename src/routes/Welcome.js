import React from 'react';
import { connect } from 'dva';
import styles from './Welcome.css';
import WelcomeComponet from '../components/Welcome/Welcome';

function Welcome() {
  return (
    <div className={styles.normal}>
      <WelcomeComponet/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Welcome);
