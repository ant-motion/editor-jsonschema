import * as React from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import { IProps, remarkStr } from '../utils';

const { Option } = Select;

export default class Enum extends React.Component<IProps> {

  getChildrenToRender = () => {
    const { schema, data, parentSchema, selected, onChange } = this.props;
    console.log(schema, parentSchema, data);
    const defaultValue = [];
    const options = schema.items.map(item => {
      if (data === item.value) {
        defaultValue.push(item.value);
      }
      return (
        <Option value={item.value} key={item.value}>{item.label}</Option>
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
  render() {
    const { schema, prefixCls, noTitle } = this.props;
    const { description } = schema;
    const childNames = description.split(remarkStr);
    const childrenToRender = this.getChildrenToRender();
    const className = classnames(`${prefixCls}-box`, `${prefixCls}-box-enum`);
    return (
      <div className={className}>
        {!noTitle && <div className={`${prefixCls}-title-x`}>{childNames[0]}</div>}
        {childrenToRender}
        {childNames[1] && <div>{childNames[1]}</div>}
      </div>
    );
  }
}