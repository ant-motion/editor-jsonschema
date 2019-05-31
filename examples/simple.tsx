// use jsx to render html, do not modify simple.html
import EditorJSON from '../src/';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../assets/index.less';

class Demo extends React.Component<any, any> {
  render() {
    return (
      <div className="App">
        <EditorJSON />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

