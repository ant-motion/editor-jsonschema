import * as React from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import MediumEditor from './MediumEditor';
import Box from './Box';
import { remarkStr, IProps } from '../utils';

interface IMProps extends IProps {
  data?: string;
}

export default class TextType extends Box<IMProps, any> {

  onInputChange = (e) => {
    const target = e.target;
    const { onChange, selected } = this.props;
    onChange(target.value, selected);
  }

  getChildrenToRender = () => {
    const {  data, prefixCls, useMediumEditor, selected, onChange } = this.props;
    return (
      useMediumEditor ?
      <MediumEditor
        defaultText={data}
        className={`${prefixCls}-editor`}
        onChange={(v) => {
          onChange(v, selected);
        }}
      /> :
      <Input defaultValue={data} onChange={this.onInputChange} size="small" />
    );
  }
}