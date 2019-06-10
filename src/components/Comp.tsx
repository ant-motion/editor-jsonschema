import * as React from 'react';
import { IProps, AllObject } from '../utils';
import ObjectType from './ObjectType';
import ArrayType from './ArrayType';
import Text from './Text';
import Enum from './Enum';
import File from './File';
import Boolean from './Boolean';

export default class Comp extends React.Component<IProps> {
  render() {
    const { schema, data } = this.props;
    // console.log(schema)
    switch (schema.type) {
      case 'object':
        return <ObjectType {...this.props} type={schema.type} data={data} />;
      case 'array':
        return <ArrayType {...this.props} type={schema.type} data={data as AllObject[]} />;
      case 'string':
        return <Text {...this.props} type={schema.type} data={data as string} />;
      case 'enum':
        return <Enum {...this.props} type={schema.type} />;
      case 'file':
      case 'image':
        return <File {...this.props} type={schema.type} />;
      case 'boolean':
        return <Boolean {...this.props} type={schema.type} />;
      default:
        console.error(`type error: 类型错误(${schema.type})`);
        break;
    }
  }
}