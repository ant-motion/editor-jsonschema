import * as React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import mock from 'schemas-utile/lib/mock';
import evaluate from 'simple-evaluate';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
/* import Comp from './Comp'; */
import { IProps, AllObject, remarkStr, deepCopy } from '../utils';

const barIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 6 11" fill="currentColor">
    <g id="Group-5" fillRule="nonzero" >
      <path d="M-4.37499998,5.25 C-4.37499998,5.5626074 -4.20822593,5.85146854 -3.93749999,6.00777224 C-3.66677404,6.16407594 -3.33322592,6.16407594 -3.06249998,6.00777224 C-2.79177403,5.85146854 -2.62499998,5.5626074 -2.62499998,5.25 C-2.62499998,4.9373926 -2.79177403,4.64853146 -3.06249998,4.49222776 C-3.33322592,4.33592406 -3.66677404,4.33592406 -3.93749999,4.49222776 C-4.20822593,4.64853146 -4.37499998,4.9373926 -4.37499998,5.25 L-4.37499998,5.25 Z M1.84390956e-08,5.25 C1.84390956e-08,5.73324916 0.391750862,6.125 0.875000018,6.125 C1.35824917,6.125 1.75000002,5.73324916 1.75000002,5.25 C1.75000002,4.76675084 1.35824917,4.375 0.875000018,4.375 C0.391750862,4.375 1.84390956e-08,4.76675084 1.84390956e-08,5.25 Z M4.37500002,5.25 C4.37500002,5.73324916 4.76675086,6.125 5.25000002,6.125 C5.73324917,6.125 6.12500002,5.73324916 6.12500002,5.25 C6.12500002,4.76675084 5.73324917,4.375 5.25000002,4.375 C4.76675086,4.375 4.37500002,4.76675084 4.37500002,5.25 Z" id="Shape" transform="translate(0.875000, 5.250000) rotate(90.000000) translate(-0.875000, -5.250000) " />
      <path d="M-0.124999982,5.25 C-0.124999982,5.5626074 0.0417740682,5.85146854 0.312500013,6.00777224 C0.583225958,6.16407594 0.916774079,6.16407594 1.18750002,6.00777224 C1.45822597,5.85146854 1.62500002,5.5626074 1.62500002,5.25 C1.62500002,4.9373926 1.45822597,4.64853146 1.18750002,4.49222776 C0.916774079,4.33592406 0.583225958,4.33592406 0.312500013,4.49222776 C0.0417740682,4.64853146 -0.124999982,4.9373926 -0.124999982,5.25 L-0.124999982,5.25 Z M4.25000002,5.25 C4.25000002,5.73324916 4.64175086,6.125 5.12500002,6.125 C5.60824917,6.125 6.00000002,5.73324916 6.00000002,5.25 C6.00000002,4.76675084 5.60824917,4.375 5.12500002,4.375 C4.64175086,4.375 4.25000002,4.76675084 4.25000002,5.25 Z M8.62500002,5.25 C8.62500002,5.73324916 9.01675086,6.125 9.50000002,6.125 C9.98324917,6.125 10.375,5.73324916 10.375,5.25 C10.375,4.76675084 9.98324917,4.375 9.50000002,4.375 C9.01675086,4.375 8.62500002,4.76675084 8.62500002,5.25 Z" id="Shape-Copy" transform="translate(5.125000, 5.250000) rotate(90.000000) translate(-5.125000, -5.250000) " />
    </g>
  </svg>
);


interface IMProps extends IProps {
  data?: AllObject[];
}

export default class ArrayType extends React.Component<IMProps> {
  defaultData: AllObject;
  constructor(props) {
    super(props);
    // mock 数据不能模拟 className, 需要添加 dataBasic 来确认新增的数据, 否则将添加 mock。
    // 如果数据是空再使用 mock；
    this.defaultData = deepCopy(props.data[0] || props.dataBasic[0]);
  }
  sortArray = (data: any[], index: number, end: number) => {
    const [removed] = data.splice(index, 1);
    data.splice(end, 0, removed);
    return data;
  }

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    const { data, onChange, selected } = this.props;
    if (!destination) {
      return;
    }
    /* if (source.droppableId === destination.droppableId) {

    } */
    const $data = this.sortArray(data, source.index, destination.index);
    onChange($data, selected);
  }

  onAddClick = () => {
    const { schema, data, selected, onChange } = this.props;
    const $data = [...data];
    $data.push(this.defaultData || mock(schema)[0]);
    onChange($data, selected);
  }

  onRemove = (n) => {
    const { data, selected, onChange } = this.props;
    const $data = [...data];
    $data.splice(n, 1);
    onChange($data, selected);
  }

  getChildrenToRender = () => {
    const { schema, data, parentData, prefixCls, selected, onClick, noTitle } = this.props;
    const { description } = schema;
    const names = description.split(remarkStr);
    if (schema.meta && schema.meta.if && !evaluate(parentData, schema.meta && schema.meta.if)) {
      return null;
    }
    // 是否显示添加或删除按钮;
    const maxLength = schema.meta ? schema.meta.maxLength : null;
    const minLength = schema.meta ? schema.meta.minLength : null;
    const showAddButton = !maxLength || data.length < maxLength;
    const showRemButton = !minLength || data.length > minLength;
    const children = data.map((item, i) => {
      let childName = item.title && typeof item.title.children === 'string' ? item.title.children : `${names[0]}`;
      childName = typeof item.children === 'string' ? item.children : childName;
      childName = childName.replace(/<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g, '');
      const length = childName.length;
      childName = childName.substring(0, 8);
      return (
        <Draggable key={i.toString()} index={i} draggableId={i.toString()}>
          {
            (provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={`${prefixCls}-array-bar`}
                >
                  <div {...provided.dragHandleProps} className={`${prefixCls}-array-sort-bars`}>
                    <Icon component={barIcon} />
                  </div>
                  <span
                    onClick={() => {
                      onClick(selected.concat(i.toString()));
                    }}
                    className={`${prefixCls}-array-bar-text`}
                  >
                    {i}. {childName}{childName.length < length ? '...' : ''}
                  </span>
                  {showRemButton && (
                    <span
                      className={`${prefixCls}-array-bar-icon`}
                      onClick={() => {
                        this.onRemove(i);
                      }}
                    >
                      <Icon type="delete" />
                    </span>
                  )}
                </div>
              );
            }
          }
        </Draggable>
      );
    });
    const className = classnames(`${prefixCls}-title`, `${prefixCls}-array-title`);

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Droppable key="list" droppableId="list">
          {
            (provided, snapshot) => (
              <div ref={provided.innerRef} >
                {!noTitle && <div
                  className={className}
                  style={{
                    marginBottom: names[1] ? 0 : 8,
                  }}
                >
                  <span
                    className={`${prefixCls}-title-btn`}
                    onClick={() => {
                      onClick(selected);
                    }}
                  >
                    {names[0]}
                  </span>
                </div>}
                {!noTitle && names[1] && (
                  <div className={`${prefixCls}-remark`} >
                    <Icon type="exclamation-circle" />
                    {' '}
                    {names[1]}
                  </div>
                )}
                {children}
                {provided.placeholder}
                {maxLength || minLength ? (
                  <p style={{ fontSize: '12px' }}>
                    此数据
                    {maxLength ? `最多为 ${maxLength} 个${minLength ? '，' : '。'}` : ''}
                    {minLength ? `最少为 ${minLength} 个。` : ''}
                  </p>
                ) : null}
                {showAddButton && <div className={`${prefixCls}-array-add`}>
                  <a onClick={this.onAddClick}>
                    <Icon type="plus" />
                    新增内容
                  </a>
                </div>}
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    );
  }
  render() {
    const { prefixCls, boxClassName } = this.props;
    const className = classnames(`${prefixCls}-box`, `${prefixCls}-box-array`, boxClassName);
    return (
      <div className={className}>
        {this.getChildrenToRender()}
      </div>
    );
  }
}