import * as React from 'react';
import classnames from 'classnames';

import { IProps, remarkStr } from '../utils';

export default class Box<props extends IProps, state = any> extends React.Component<props, state> {
  getChildrenToRender = () => {
    return null;
  }
  render() {
    const { schema, prefixCls, type, noTitle, noXTitle } = this.props;
    const { description } = schema;
    const childNames = description.split(remarkStr);
    const childrenToRender = this.getChildrenToRender();
    const className = classnames(`${prefixCls}-box`, `${prefixCls}-box-${type}`);
    return (
      <div className={className}>
        {!noTitle && <div className={`${prefixCls}-title-x ${noXTitle ? `${prefixCls}-title-z` : ''}`}>{childNames[0]}</div>}
        {childrenToRender}
        {childNames[1] && <div>{childNames[1]}</div>}
      </div>
    );
  }
}