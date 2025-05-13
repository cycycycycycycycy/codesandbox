/**
* @File 原生方法文件下载
* @Type function
* @Author chen_yu
* @Date 2023-08-05 17:09:17
* @Version 1.0
* 
* @Params URL, Header, Filename
* 
* URL 请求的完整地址
* Header 请求的请求头 对象形式 例如 
  {
    token: '123456'
  }
* Filename 下载后文件的名称
* 
* @Description
* 使用页面基础配置
* 1.页面引入方法
* import { downloadGET，downloadPOST } from "此文件的路径"; 包含两个方法GET/POST
* 2.页面使用方法  
* downloadGET(URL, Header, Filename)
* 
* 
* @returns 文件下载
*/


export const downloadGET = (Url, Header, Filename) => {
  download(Url, Header, Filename, 'GET')
}
export const downloadPOST = (Url, Header, Filename) => {
  download(Url, Header, Filename, 'POST')
}

const download = (Url, Header, Filename, ajaxType) => {

  let xhr = new XMLHttpRequest();

  xhr.open(ajaxType, Url, true);

  for (const key in Header) {
    if (Object.hasOwnProperty.call(Header, key)) {
      const value = Header[key];
      xhr.setRequestHeader(key, value);
    }
  }

  xhr.responseType = "blob";

  xhr.onload = function (e) {

    //如果请求执行成功
    if (this.status == 200) {

      let blob = this.response;

      let filename = Filename;

      let a = document.createElement("a");

      //创键临时url对象

      let url = URL.createObjectURL(blob);

      a.href = url;

      a.download = filename;

      a.click();

      //释放之前创建的URL对象

      window.URL.revokeObjectURL(url);
    }
  };

  //发送请求
  xhr.send();

}

