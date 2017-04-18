import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Welcome from "./routes/Welcome.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* 主页改过 */}
      <Route path="/" component={Welcome} />
      <Route path="/welcome" component={Welcome} />
    </Router>
  );
}

export default RouterConfig;
