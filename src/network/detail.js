import { request } from "./request";
export const getDetail = (iid) => {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
};
export const getRecommend = () => {
  return request({
    url: "/recommend",
  });
};

export class Goods {
  constructor(itemInfo, columns, services) {
    this.desc = itemInfo.desc;
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}
