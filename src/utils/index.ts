import * as React from 'react';
import { Upload } from 'antd';

export type AllObject = { [key: string]: any };

export interface IProps {
  schema?: AllObject;
  parentSchema?: AllObject;
  data?: AllObject | string;
  ignore?: string[];
  parentData?: AllObject | string;
  prefixCls?: string;
  useMediumEditor?: boolean;
  selected?: string[];
  parentSelected?: string[];
  boxClassName?: string;
  type?: string;
  noTitle?: boolean;
  noXTitle?: boolean;
  uploadProps?: Upload;
  uploadImageSize?: number;
  uploadVideoSize?: number;
  dataBasic?: AllObject;
  onChange?: (text: string | any[], selected?: string[]) => void;
  onClick?: (selected?: string[]) => void;
}

export const isLink = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;

export const tagRep = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g;

export const remarkStr = '$remark=';

export function deepCopy(data) {
  if (typeof data !== 'object' || !data) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(item => deepCopy(item));
  }
  const obj = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].map(item => deepCopy(item));
      } else {
        obj[key] = deepCopy(data[key]);
      }
    } else {
      obj[key] = data[key];
    }
  });
  return obj;
}

export const isNumber = (num) => !!Number(num) || Number(num) === 0;

export function currentScrollTop() {
  return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
}