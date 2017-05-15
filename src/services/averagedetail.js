import request from '../utils/request';
import qs from 'qs';

//``使用连接字符串,request的url
const url ='http://localhost:8000/api/averagedetail';

//params转换为formData,提供给post用
function paramsTOformData(params){
  const formData = new FormData;
  let paramsValue;
  for(let paramsKey in params){
    //将dispatch也去掉
    if(paramsKey != "dispatch" ){
     paramsValue = params[paramsKey];
     formData.append(paramsKey,paramsValue);
   }
  }
  return formData;
}

//创建
export async function create(params) {
  //post需要用formData来传输值,fetch中并没有内置,需要自己创建
  //这里我用了个params转换为formdata的自写方法
  const  formData = paramsTOformData(params);
  console.log('services中,create');
  console.log(params);
  const data =request(`${url}/create`,
  {
    method: 'POST',
    body:formData
  });

  return data;
}

//删除
export async function _delete(params) {
  const data =request(`${url}/delete/${params.id}`,
  {
    method: 'DELETE'
  });

  return data;
}

//更新,patch提交的是json
export async function update(params) {
  console.log('update_server');
  console.log(params);
  const data =request(`${url}/update/${params.id}`,
  {
    method: 'PATCH',//PUT对资源完全替换,PATCH局部替换
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(params)
  });

  return data;
}

//查询details
export async function queryDetails(params) {
  const data =request(`${url}/query/${params.id}`,
  {
    method: 'GET'
  });

  return data;
}
