export default async(url='',data={},type='GET',method='fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;

  if(type === 'GET'){
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    if(dataStr!==''){
      dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'));
      url = url + '?' +dataStr;
    }
  }

  if(window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include', //为了在当前域名内自动发送cookies，必须加上这个
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors', //请求的模式
      cache: 'force-cache'
    }

    if(type == 'POST'){
      Object.defineProperty(requestConfig,'body',{
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  }else {
    return new Promise((resolve,reject) => {
      let responseObj;
      if(window.XMLHttpRequest){
        responseObj = new XMLHttpRequest();
      }else {
        responseObj = new ActiveXObject;
      }

      let sendData = '';
      if(type == 'POST'){
        sendData = JSON.stringify(data);
      }

      responseObj.open(type,url,true);
      responseObj.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      responseObj.send(sendData);

      responseObj.onreadystatechange = () => {
        if(responseObj.readyState == 4){
          if(responseObj.status == 200){
            let obj = responseObj.response
            if(typeof obj !== 'object'){
              obj = JSON.parse(obj)
            }
            resolve(obj)
          }else{
            reject(responseObj)
          }
        }
      }
    })
  }
}