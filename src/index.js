import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';


// 1. Initialize
const app = dva({
  //切换 history 为 browserHistory
  history: browserHistory,
  //dva 里，effects 和 subscriptions 的抛错全部会走 onError hook，所以可以在 onError 里统一处理错误。
  onError(e, dispatch) {
    console.log(e.message);
  },
});



// 2. Plugins
// app.use({});


// 3. Model,model的注册
// app.model(require('./models/example'));
app.model(require("./models/information"));

app.model(require("./models/users"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
