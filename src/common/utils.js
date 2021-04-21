// 防抖函数
export const debounce = (func, delay = 100) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// 时间处理函数
export const formatDate = (date, fmt) => {
  // 1.获取年份 同理 y+ => 匹配多个 y 的多种情况 yy => 21 yyyy => 2021
  // RegExp.$1 就是匹配到的 /y+/
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  // 2.获取月份
  // M+ => 正则表达式里面的规则(M MM 匹配多个 M 的多种情况) MM => 04 M => 4
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
};
// 左边加0补齐两位操作 4:4:4 => 04:04:04
const padLeftZero = (str) => {
  return ("00" + str).substr(str.length);
};
