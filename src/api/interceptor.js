import { message } from 'antd';
import axios from 'axios';

axios.defaults.baseURL = window.url

axios.create({
    timeout: 5 * 1000, //请求超时时间（5秒后还未接收到数据，就需要再次发送请求）
    retry: 3, //设置全局重试请求次数（最多重试几次请求）
    retryDelay: 1000, //设置全局请求间隔
});


axios.interceptors.request.use(
    (config) => {
      // let each request carry token
      // this example using the JWT token
      // Authorization is a custom headers key
      // please modify it according to the actual situation
      if (!config.headers) {
        config.headers = {};
      }

      return config;
    },
    (error) => {
      // do something
      return Promise.reject(error);
    }
  );


  // add response interceptors
axios.interceptors.response.use(
    (response) => {
      const res = response.data;
      //判断不需要拦截器工作的情况
      if (response.config.noNeedInterceptor) {
        return res;
      }
      // if the custom code is not 200, it is judged as an error.
    //   if (res?.state !== 0 && res?.state !== 0) {
    //     // 401: 权限校验失败
    //     if (res.errcode === 401) {
    //       message.error(
    //         res?.state_info || res.msg || res.result || '权限校验失败'
    //       );
    //       return Promise.reject(new Error(res.msg || '权限校验失败'));
    //     }
  
    //     // 17: token失效
    //     if (res.state == 17) {
    //       return;
    //     }
    //     message.error(
    //       res?.state_info || res.msg || res.result || '网络异常，请联系管理员'
    //     );
    //     return Promise.reject(new Error(res.msg || '接口异常，请联系管理员'));
    //   }
      return Promise.resolve(res);
    },
    (error) => {
    //   if (error.code === 'ERR_CANCELED') return Promise.reject('打断请求');
    //   if (error?.response?.status === 401) {
    //     message.error('权限校验失败');
    //     return;
    //   }
    //   if (error?.response?.status === 440) {
    //     return;
    //   }
      message.error(error.msg || '网络异常，请联系管理员');
      console.log(error);
      return Promise.reject(new Error('网络异常，请联系管理员'));
    }
  );