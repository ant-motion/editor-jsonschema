import * as React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import evaluate from 'simple-evaluate';
import Comp from './Comp';

import { IProps, remarkStr, isNumber } from '../utils';

export default class ObjectType extends React.Component<IProps> {
  getChildrenToRender = () => {
    const { schema, data, parentData, prefixCls, useMediumEditor, selected, parentSelected, noTitle, onChange, onClick, uploadProps, uploadVideoSize, uploadImageSize } = this.props;
    const { description, properties } = schema;
    const names = description.split(remarkStr);
    // 如果最后个 select 是数字时，在顶级加上数值；
    const isNum = isNumber(parentSelected[parentSelected.length - 1]);
    // 判断是否是顶级；
    const noTop = selected.toString() !== parentSelected.toString();
    // 判断 children 是否是唯一的;
    const isOnlyChild = Object.keys(properties).length === 1;
    if (schema.meta && schema.meta.if && !evaluate(parentData, schema.meta && schema.meta.if)) {
      return null;
    }
    const children = Object.keys(properties).map(key => {
      const item = properties[key];

      const boxClass = item.type === 'array' && !isOnlyChild || item.type === 'object' && noTop ? `${prefixCls}-box-child` : '';
      const $selected = [...selected, key];
      return (
        <Comp
          schema={item}
          parentSchema={properties}
          data={data[key]}
          parentData={data}
          key={key}
          onClick={onClick}
          onChange={onChange}
          prefixCls={prefixCls}
          useMediumEditor={useMediumEditor}
          selected={$selected}
          parentSelected={parentSelected}
          noTitle={isOnlyChild && noTop}
          boxClassName={boxClass}
          uploadProps={uploadProps}
          uploadImageSize={uploadImageSize}
          uploadVideoSize={uploadVideoSize}
        />
      );
    });
    return (
      <div>
        {!noTitle && <div
          className={`${prefixCls}-title`}
        >
          <span
            className={`${prefixCls}-title-btn`}
            onClick={() => {
              onClick(selected);
            }}
          >
            {names[0]}
            {!noTop && isNum ? ` - ${parentSelected[parentSelected.length - 1]}` : ''}
          </span>
        </div>}
        {names[1] && !noTitle && (
          <div className={`${prefixCls}-remark`} >
            <Icon type="exclamation-circle" />
            {' '}
            {names[1]}
          </div>
        )}
        {children}
      </div>
    );
  }
  render() {
    const { prefixCls, boxClassName } = this.props;
    const className = classnames(`${prefixCls}-box`, boxClassName);
    const children = this.getChildrenToRender();
    return (
      children && <div className={className}>
        {children}
      </div>
    );
  }
}