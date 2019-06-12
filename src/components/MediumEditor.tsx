import * as React from 'react';
import MediumEditor from 'medium-editor';

interface IProps {
  options?: any;
  defaultText?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (text: string) => void;
}

const noop = () => { };
export default class Editor extends React.PureComponent<IProps> {
  medium = null;
  dom: HTMLDivElement;

  componentDidMount() {
    const { options, defaultText } = this.props;
    this.dom.innerHTML = defaultText;
    this.medium = new MediumEditor(this.dom, {
      ...options,
      placeholder: {
        text: '请输入...',
      },
      toolbar: false,
    });
    this.medium.subscribe('editableInput', (e, b: HTMLDivElement) => {
      (this.props.onChange || noop)(b.innerHTML);
    });
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const { options, onChange, defaultText, children, ...props } = this.props;
    return (
      <div
        ref={(c) => { this.dom = c; }}
        {...props}
      />
    );
  }
}
