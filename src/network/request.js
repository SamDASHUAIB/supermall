import axios from "axios";
export function request(baseConfig) {
  // 1. 创建 axios 实例
  const instance = axios.create({
    baseURL: "http://106.54.54.237:8000/api/mn",
    timeout: 5000,
  });
  // 响应拦截
  instance.interceptors.response.use(
    (res) => {
      // Do something before response is sent
      return res.data;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance(baseConfig);
}
