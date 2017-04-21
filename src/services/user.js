// request 是我们封装的一个网络请求库
import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  //request返回的是promise,只有promise完成,return之后,才会得到值
  // 在jquery中，传入对象框架会自动封装成formData的形式，fetch没有这个功能。
  // 既然fetch不会自动转FormData，那我们自己new一个FormData，直接传给body,否则无法提交数据给php。
  let formData = new FormData();
  formData.append("type","test");

  const data =request('http://localhost/AccountSPA_php/user.php',
  {method: 'POST',
  headers: {},
  body:formData});
  return data;
}
