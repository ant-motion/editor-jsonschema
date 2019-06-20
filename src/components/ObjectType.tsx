import * as React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import evaluate from 'simple-evaluate';
import Comp from './Comp';

import { IProps, remarkStr, isNumber } from '../utils';

export default class ObjectType extends React.Component<IProps> {
  getChildrenToRender = () => {
    const {
      schema,
      data,
      parentData,
      prefixCls,
      useMediumEditor,
      selected,
      parentSelected,
      noTitle,
      onChange,
      onClick,
      uploadProps,
      uploadVideoSize,
      uploadImageSize,
      dataBasic,
      ignore,
    } = this.props;
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
    const propertiesType = Object.keys(properties).map(key => properties[key].type);
    const children = Object.keys(properties).map((key, i) => {
      const item = properties[key];
      if (ignore.indexOf(key) >= 0) {
        return null;
      }
      const boxClass = item.type === 'array' && !isOnlyChild || item.type === 'object' && noTop ? `${prefixCls}-box-child` : '';
      const $selected = [...selected, key];
      console.log(item.type, isOnlyChild, item.type !== 'array' || item.type !== 'object', propertiesType[i - 1], (propertiesType[i - 1] || '').match(/array|object/));
      const noXTitle = (item.type !== 'array' || item.type !== 'object') && !!(propertiesType[i - 1] || '').match(/array|object/);
      return (
        <Comp
          schema={item}
          parentSchema={properties}
          data={data[key]}
          parentData={data}
          dataBasic={dataBasic && dataBasic[key] || {}}
          key={key}
          onClick={onClick}
          onChange={onChange}
          prefixCls={prefixCls}
          useMediumEditor={useMediumEditor}
          selected={$selected}
          parentSelected={parentSelected}
          noTitle={isOnlyChild && noTop}
          noXTitle={noXTitle}
          boxClassName={boxClass}
          ignore={ignore}
          uploadProps={uploadProps}
          uploadImageSize={uploadImageSize}
          uploadVideoSize={uploadVideoSize}
        />
      );
    }).filter(c => c);
    if (!children.length) {
      return null;
    }
    console.log(children, noTitle);
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