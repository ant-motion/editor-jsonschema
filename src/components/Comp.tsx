import * as React from 'react';
import { IProps, AllObject } from '../utils';
import ObjectType from './ObjectType';
import ArrayType from './ArrayType';
import Text from './Text';
import Enum from './Enum';
import File from './File';
import Color from './Color';
import Boolean from './Boolean';

export default class Comp extends React.Component<IProps> {
  render() {
    const { schema, data } = this.props;
    switch (schema.type) {
      case 'object':
        return <ObjectType {...this.props} type={schema.type} data={data} />;
      case 'array':
        return <ArrayType {...this.props} type={schema.type} data={data as AllObject[]} />;
      case 'string':
      case 'text':
        return <Text {...this.props} type={schema.type} data={data as string} />;
      case 'url':
        return <Text {...this.props} type={schema.type} data={data as string} useMediumEditor={false} />;
      case 'enum':
        return <Enum {...this.props} type={schema.type} />;
      case 'file':
      case 'image':
        return <File {...this.props} type={schema.type} />;
      case 'boolean':
        return <Boolean {...this.props} type={schema.type} />;
      case 'color':
        return <Color {...this.props} type={schema.type} data={data as string} />;
      default:
        console.error(`type error: 类型错误(${schema.type})`);
        break;
    }
  }
}