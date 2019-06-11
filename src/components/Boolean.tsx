import * as React from 'react';
import { Switch } from 'antd';

import Box from './Box';

import { IProps } from '../utils';

export default class BooleanComp extends Box<IProps> {
  onChange = (v) => {
    const { selected, onChange } = this.props;
    onChange(v, selected);
  }
  getChildrenToRender = () => {
    const { data } = this.props;
    return (
      <Switch size="small" checked={!!data} onChange={this.onChange} />
    );
  }
}