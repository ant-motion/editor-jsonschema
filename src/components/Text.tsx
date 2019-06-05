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
    onChange(target.value, selected);
  }

  render() {
    const { schema, data, prefixCls, useMediumEditor, selected, noTitle, onChange } = this.props;
    const { description } = schema;
    const childNames = description.split(remarkStr);
    const child = useMediumEditor ?
      <MediumEditor
        defaultText={data}
        className={`${prefixCls}-editor`}
        onChange={(v) => {
          onChange(v, selected);
        }}
      /> :
      <Input defaultValue={data} onChange={this.onInputChange} size="small" />;
    const className = classnames(`${prefixCls}-box`, `${prefixCls}-box-text`);
    return (
      <div className={className}>
        {!noTitle && <div className={`${prefixCls}-title-x`}>{childNames[0]}</div>}
        <div>{child}</div>
        {childNames[1] && <div>{childNames[1]}</div>}
      </div>
    );
  }
}