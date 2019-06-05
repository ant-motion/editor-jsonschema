import * as React from 'react';
import { IProps, AllObject } from '../utils';
import ObjectType from './ObjectType';
import ArrayType from './ArrayType';
import Text from './Text';
import Enum from './Enum';

export default class Comp extends React.Component<IProps> {
  render() {
    const { schema, data } = this.props;
    // console.log(schema)
    switch (schema.type) {
      case 'object':
        return <ObjectType {...this.props} data={data} />;
      case 'array':
        return <ArrayType {...this.props} data={data as AllObject[]} />;
      case 'string':
        return <Text {...this.props} data={data as string} />;
      case 'enum':
        return <Enum {...this.props} />;
      default:
        console.error(`type error: 类型错误(${schema.type})`);
        break;
    }
  }
}