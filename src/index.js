import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';


// 1. Initialize
const app = dva({
  //切换 history 为 browserHistory
  history: browserHistory,
});



// 2. Plugins
// app.use({});


// 3. Model,model的注册
// app.model(require('./models/example'));
//app.model(require("./models/information"));

app.model(require("./models/user"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
