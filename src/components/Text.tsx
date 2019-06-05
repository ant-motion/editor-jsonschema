import * as React from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
import MediumEditor from './MediumEditor';
import { remarkStr, IProps } from '../utils';

interface IMProps extends IProps {
  data?: string;
}

export default class TextType extends React.Component<IMProps> {

  onInputChange = (e) => {
    const target = e.target;
    const { onChange, selected } = this.props;
    console.log(selected);
    onChange(target.value, selected);
  }

  render() {
    const { schema, data, prefixCls, useMediumEditor, onChange } = this.props;
    const { description } = schema;
    const childNames = description.split(remarkStr);
    const child = useMediumEditor ?
      <MediumEditor defaultText={data} className={`${prefixCls}-editor`} onChange={onChange} /> :
      <Input defaultValue={data} onChange={this.onInputChange} />;
    const className = classnames(`${prefixCls}-box`, `${prefixCls}-box-text`);
    return (
      <div className={className}>
        {/* 不显示文字里的标题 !noTitle && <div className={`${prefixCls}-title-x`}>{childNames[0]}</div> */}
        <div>{child}</div>
        {childNames[1] && <div>{childNames[1]}</div>}
      </div>
    );
  }
}