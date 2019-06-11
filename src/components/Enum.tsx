import * as React from 'react';
import { Select } from 'antd';

import Box from './Box';

import { IProps } from '../utils';

const { Option } = Select;

export default class Enum extends Box<IProps> {
  getChildrenToRender = () => {
    const { schema, data, parentSchema, selected, onChange } = this.props;
    const defaultValue = [];
    const options = schema.items.map(item => {
      if (data === item.value) {
        defaultValue.push(item.value);
      }
      return (
        <Option value={item.value} key={item.value}>{item.label} - {item.value}</Option>
      );
    });
    if (!defaultValue.length) {
      defaultValue.push(schema.items[0].value);
    }
    // 是否是多选
    const multiple = !!(schema.meta && schema.meta.multiple);
    return (
      <Select
        size="small"
        style={{ width: '100%' }}
        mode={multiple ? 'multiple' : null}
        defaultValue={defaultValue}
        onChange={(v) => {
          onChange(v, selected);
        }}
      >
        {options}
      </Select>
    );
  }
}