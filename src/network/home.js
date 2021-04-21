import { request } from "./request";

export function getHomeMultiData() {
  return request({
    url: "/home/multidata",
  });
}
/**
 *
 * @param {流行 新品 精选 三取一} type
 * @param {分页} page
 * @returns Promise
 */
export function getHomeGoods(type, page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page,
    },
  });
}
