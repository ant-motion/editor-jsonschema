import * as React from 'react';
import Text from './Text';
import ObjectType from './ObjectType';
import { IProps, AllObject } from './utils';
import ArrayType from './ArrayType';


export default class Comp extends React.Component<IProps> {
  render() {
    const { schema, data } = this.props;
    // console.log(schema)
    switch (schema.type) {
      case 'string':
        return <Text {...this.props} data={data as string} />;
      case 'object':
        return <ObjectType {...this.props} data={data} />;
      case 'array':
        return <ArrayType {...this.props} data={data as AllObject[]} />;
      case 'enum':
        return <div></div>;
      default:
        console.error(`type error: 类型错误(${schema.type})`);
        break;
    }
  }
}