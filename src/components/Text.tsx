import * as React from 'react';
import { Input } from 'antd';
import MediumEditor from './MediumEditor';
import Box from './Box';
import { IProps, isLink } from '../utils';

const { TextArea } = Input;
interface IMProps extends IProps {
  data?: string;
}

export default class TextType extends Box<IMProps> {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data,
      });
    }
  }

  onInputBlur = (e) => {
    const target = e.target;
    const { onChange, selected } = this.props;
    onChange(target.value, selected);
  }

  onInputChange = (e) => {
    this.setState({
      data: e.target.value,
    });
  }

  getChildrenToRender = () => {
    const { type, prefixCls, useMediumEditor, selected, onChange } = this.props;
    const { data } = this.state;
    const isText = type === 'text';
    const inputOrText = isText ?
      <TextArea
        value={data || ''}
        placeholder="请输入..."
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
      /> :
      <Input
        value={data || ''}
        placeholder="请输入..."
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
        size="small" />;
    // 排除是链接的情况。。
    const key = selected[selected.length - 1];
    const useEditor = useMediumEditor && !(key === 'href' || key === 'src' || key === 'link');
    return (
      useEditor ?
        <MediumEditor
          text={data || ''}
          className={`${prefixCls}-editor`}
          onChange={(v) => {
            onChange(v, selected);
          }}
          style={isText ? { minHeight: 64 } : null}
        /> :
        inputOrText
    );
  }
}