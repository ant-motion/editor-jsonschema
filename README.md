# rc-editor-jsonschema
---

React EditorJSON Component for Ant Design Landing Intranet.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![codecov](https://codecov.io/gh/ant-motion/editor-jsonschema/branch/master/graph/badge.svg)](https://codecov.io/gh/ant-motion/editor-jsonschema)
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-editor-jsonschema.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-editor-jsonschema
[travis-image]: https://img.shields.io/travis/ant-motion/editor-jsonschema.svg?style=flat-square
[travis-url]: https://travis-ci.org/ant-motion/editor-jsonschema
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-editor-jsonschema.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-editor-jsonschema

## Example

http://localhost:8008/examples/


online example: http://ant-motion.github.io/editor-jsonschema/


## install


[![rc-editor-jsonschema](https://nodei.co/npm/rc-editor-jsonschema.png)](https://npmjs.org/package/rc-editor-jsonschema)


## Usage

```js
var EditorJSON = require('rc-editor-jsonschema');
var React = require('react');
React.render(<EditorJSON />, container);
```

## API

### props

| name      | type           | default   | description    |
|-----------|----------------|-----------|----------------|
|  data     | object         | null      | ant design landing 的 dataSource.      |
|  dataBasic | object      | null      | 源数据结构，如果 data 数据里的 array 全部删除后，将参照此数据源再新增 |
|  schema   | object         | null      | 凤蝶的 schema 简单的解析，以 Object 和 Array 做主类，结合 landing 的数据，子级目前只支持 String(default), Text, Enum, Image, File, Boolean。     |
|  selected | string[]        | null      | 默认树状选择器    |
| ignore    | string[] |  null | 不显示 schema 数据里的 key |
|  className | string        | null      | className    |
|  prefixCls | string        | `rc-editor-jsonschema`      | prefix class.    |
|  useMediumEditor | boolean        | true      | 输入框的模式，false 为 input 形式，true 为 MediumEditor 模式，产出的 string 将带 html 标签，如 `<p>标题文字</p>`   |
|  uploadProps | object        | null      | 上传组件的 props.   |
|  uploadImageSize | number        |  `1m`      | 图片上传的大小限制.   |
|  uploadVideoSize | number        |  `2m`      | 视频上传的大小限制.   |
|  onChange   | (data: object) => void;       |  null      | 数据变更的回调。   |
|  onSelectedChange   | (selected: string[]) => void;       |  null      | 选择器变更的回调。 |


## 说明

如果是数组形式，请必须将数据里的数值全部添加到 schema 里，并设置默认，用 ignore 隐藏的数值，如 className 数值, 如果不添加，将不会有出现在新增数据里。

## License

rc-editor-jsonschema is released under the MIT license.
