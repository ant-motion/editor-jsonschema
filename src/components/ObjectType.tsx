import * as React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import Comp from './Comp';
import { IProps, remarkStr, isNumber } from './utils';


export default class ObjectType extends React.Component<IProps> {
  getChildrenToRender = () => {
    const { schema, data, prefixCls, useMediumEditor, selected, parentSelected, onChange, onClick } = this.props;
    const { description, properties } = schema;
    const names = description.split(remarkStr);
    // 如果最后个 select 是数字时，在顶级加上数值；
    const isNum = isNumber(parentSelected[parentSelected.length - 1]);
    console.log(parentSelected, properties, description);
    // 判断是否是顶级；
    const noTop = selected.toString() !== parentSelected.toString();
    const children = Object.keys(properties).map(key => {
      const item = properties[key];
      const boxClass = item.type === 'array' || item.type === 'object' && noTop ? `${prefixCls}-box-content` : '';
      const $selected = [...selected, key];
      console.log(key, item.type, boxClass);
      return (
        <Comp
          schema={item}
          data={data[key]}
          key={key}
          onClick={onClick}
          onChange={onChange}
          prefixCls={prefixCls}
          useMediumEditor={useMediumEditor}
          selected={$selected}
          parentSelected={parentSelected}
          boxClassName={boxClass}
        />
      );
    });
    return (
      <div>
        <div
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
        </div>
        {names[1] && (
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
    return (
      <div className={className}>
        {this.getChildrenToRender()}
      </div>
    );
  }
}