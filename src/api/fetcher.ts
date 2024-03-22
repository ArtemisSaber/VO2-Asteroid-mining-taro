import { BASE_URL } from "@/config";
import Taro from "@tarojs/taro";

export enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const request = (
  url: string,
  method: HTTPMethods = HTTPMethods.GET,
  data: any = null,
  params: any = null,
  header: any = { "content-type": "application/json" }
) => {
  return new Promise((resolve, reject) => {
    let requestURL = url;
    if (params) {
      requestURL = `${url}?${new URLSearchParams(params).toString()}`;
    }
    Taro.request({
      url: requestURL,
      method,
      data,
      header,
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res.errMsg);
        }
      },
      fail(res) {
        reject(res);
      },
    });
  });
};

export const requestAPI = (
  url: string,
  method: HTTPMethods = HTTPMethods.GET,
  data: any = null,
  params: any = null,
  header: any = { "content-type": "application/json" }
) => {
  const APIURL = `${BASE_URL}${url}`;
  return request(APIURL, method, data, params, header);
};
