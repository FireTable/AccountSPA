import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Welcome from "./routes/Welcome.js";


import AverageDetail from "./routes/AverageDetail.js";
import AverageResult from './routes/AverageResult.js';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* 主页改过 */}
      <Route path="/" component={IndexPage} />
      <Route path="/averageresult" component={AverageResult} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/averagedetail" component={AverageDetail} />
    </Router>
  );
}

export default RouterConfig;
