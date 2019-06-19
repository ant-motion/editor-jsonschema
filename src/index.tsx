import * as React from 'react';
import { Breadcrumb, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import classnames from 'classnames';
import $MediumEditor from './components/MediumEditor';
import ObjectType from './components/ObjectType';
import ArrayType from './components/ArrayType';
import { AllObject, deepCopy, isNumber } from './utils';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

interface IProps extends React.HTMLAttributes<{}> {
  data: AllObject;
  schema: AllObject;
  selected?: string[];
  className?: string;
  prefixCls?: string;
  useMediumEditor?: boolean;
  uploadProps?: UploadProps;
  uploadImageSize?: number;
  uploadVideoSize?: number;
  onChange?: (data: AllObject) => void;
  onSelectedChange?: (selected: string[]) => void;
}

interface IState {
  data: AllObject;
  selected: string[];
}

class EditorJSON extends React.Component<IProps, IState> {
  static MediumEditor = $MediumEditor;

  static defaultProps = {
    prefixCls: 'rc-editor-jsonschema',
    useMediumEditor: true,
    uploadImageSize: 1024000,
    uploadVideoSize: 2048000,
    uploadProps: {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    },
    onSelectedChange: () => { },
    onChange: () => { },
  };

  constructor(props) {
    super(props);
    const { schema } = props;
    const { properties } = schema;
    this.state = {
      data: props.data,
      selected: props.selected || Object.keys(properties),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { schema } = nextProps;
    const { properties } = schema;
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data,
      });
    }
    if (nextProps.selected !== this.props.selected) {
      this.setState({
        selected: nextProps.selected || Object.keys(properties),
      });
    }
  }

  onChange = (text, selected) => {
    const { onChange } = this.props;
    const { data } = this.state;
    const $data = deepCopy(data);
    let t = $data;
    selected.forEach((key, i) => {
      if (i >= selected.length - 1) {
        t[key] = text;
        return;
      }
      t = t[key];
    });
    this.setState({
      data: $data,
    }, () => {
      onChange($data);
    });
  }

  onClick = (selected: string[]) => {
    const { onSelectedChange } = this.props;
    this.setState({
      selected: selected,
    }, () => {
      onSelectedChange(selected);
    });
  }

  getDataAndSchema = () => {
    let { selected, data } = this.state;
    let { schema } = this.props;
    // 显示当前 selected 的所有东西;
    selected.forEach(key => {
      schema = !isNumber(key) ? schema.properties[key] : schema;
      data = data[key];
    });
    return { schema, data };
  }

  getChildToRender = () => {
    const { selected } = this.state;
    const { prefixCls, useMediumEditor, uploadProps, uploadImageSize, uploadVideoSize } = this.props;
    let { schema, data } = this.getDataAndSchema();
    const selectedEnd = selected[selected.length - 1];
    // object 和 array 为带子级 type, 其它的都在 object 里处理;
    let component;
    if (isNumber(selectedEnd)) {
      component = ObjectType;
      schema = deepCopy(schema);
      schema.type = 'object';
    } else {
      switch (schema.type) {
        case 'object':
          component = ObjectType;
          break;
        case 'array':
          component = ArrayType;
          break;
        default:
          console.error('type error: 类型没有。');
          return null;
      }
    }

    return React.createElement(component, {
      data,
      onChange: this.onChange,
      onClick: this.onClick,
      schema,
      prefixCls,
      useMediumEditor,
      selected,
      uploadProps,
      uploadImageSize,
      uploadVideoSize,
      parentSelected: selected,
    });
  }

  onBreadcrumbClick = (i) => {
    const { selected } = this.state;
    selected.splice(i + 1, selected.length);
    this.setState({
      selected,
    }, () => {
      const { onSelectedChange } = this.props;
      onSelectedChange(selected);
    });
  }

  getBreadcrumb = () => {
    const { schema } = this.props;
    let { selected } = this.state;
    let schemaData = schema.properties;
    // 去除 selected 里的 Array 数值;
    // selected = selected.filter(c => !Number(c));
    // 取三级面包屑；
    /*  let currentBreadcrumb = selected.filter((_, c) => c);
     currentBreadcrumb = currentBreadcrumb.filter((_, i) => i >= currentBreadcrumb.length - 3); */
    const currentNum = selected.length - (selected.length > 3 ? 3 : selected.length);
    const $selected = [...selected];
    const newSelected = $selected.splice(currentNum, $selected.length);
    $selected.forEach(key => {
      schemaData = isNumber(key) ? schemaData : schemaData[key].properties;
    });
    const child = newSelected.map((key, i) => {
      const name = isNumber(key) ? key : schemaData[key].description;
      schemaData = isNumber(key) ? schemaData : schemaData[key].properties;
      return (
        <Breadcrumb.Item
          key={i.toString()}
          onClick={
            i < newSelected.length - 1 ? () => {
              this.onBreadcrumbClick(currentNum + i);
            } : null
          }
        >
          {name.split('$')[0]}
        </Breadcrumb.Item>
      );
    });
    return (
      <Breadcrumb>
        {child}
      </Breadcrumb>
    );
  }

  render() {
    const {
      className,
      prefixCls,
      schema,
      data,
      useMediumEditor,
      uploadImageSize,
      uploadVideoSize,
      uploadProps,
      onSelectedChange,
      ...props
    } = this.props;
    const wrapperClassName = classnames(
      `${prefixCls}-wrapper`,
      className,
    );
    return (
      <div className={wrapperClassName} {...props}>
        <div className={`${prefixCls}-breadcrumb`}>
          {this.getBreadcrumb()}
        </div>
        <div className={`${prefixCls}-container`}>
          {this.getChildToRender()}
        </div>
      </div>
    );
  }
}
export default EditorJSON;

export const MediumEditor = $MediumEditor;
