import request from '../utils/request';
import qs from 'qs';

//``使用连接字符串,request的url
const url ='http://localhost:8000/api/averageresult';
//const url ='http://xn--brva.top/AccountSPA_php/public/index.php/api/averageresult';

//查询details
export async function queryResult(params) {
  console.log('queryResult');
  console.log(params);
  const data =request(`${url}/query/${params.id}/${params.userid}`,
  {
    method: 'GET'
  });

  return data;
}
