import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Welcome from "./routes/Welcome.js";


import AverageDetail from "./routes/AverageDetail.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* 主页改过 */}
      <Route path="/" component={AverageDetail} />
      <Route path="/index" component={IndexPage} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/averagedetail" component={AverageDetail} />
    </Router>
  );
}

export default RouterConfig;
