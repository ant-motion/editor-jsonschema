import * as React from 'react';
import { Input } from 'antd';
import MediumEditor from './MediumEditor';
import Box from './Box';
import { IProps } from '../utils';

const { TextArea } = Input;
interface IMProps extends IProps {
  data?: string;
}

export default class TextType extends Box<IMProps> {

  onInputChange = (e) => {
    const target = e.target;
    const { onChange, selected } = this.props;
    onChange(target.value, selected);
  }

  getChildrenToRender = () => {
    const { type, data, prefixCls, useMediumEditor, selected, onChange } = this.props;
    const isText = type === 'text';
    const inputOrText = isText ? <TextArea defaultValue={data} onChange={this.onInputChange} /> : <Input defaultValue={data} onChange={this.onInputChange} size="small" />;
    return (
      useMediumEditor ?
      <MediumEditor
        defaultText={data}
        className={`${prefixCls}-editor`}
        onChange={(v) => {
          onChange(v, selected);
        }}
        style={isText ? { minHeight: 120 } : null}
      /> :
      inputOrText
    );
  }
}