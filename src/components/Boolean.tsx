import React from 'react';
import { Switch } from 'antd';

import Box from './Box';

import { IProps } from '../utils';

export default class BooleanComp extends Box<IProps> {
  getChildrenToRender = () => {
    return (
      <Switch size="small" />
    );
  }
}