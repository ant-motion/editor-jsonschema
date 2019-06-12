import * as React from 'react';
import MediumEditor from 'medium-editor';

interface IProps {
  options?: any;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (text: string) => void;
}

const noop = () => { };
export default class Editor extends React.PureComponent<IProps> {
  medium = null;
  dom: HTMLDivElement;

  state = {
    text: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }

  componentDidMount() {
    const { options } = this.props;
    const { text } = this.state;
    this.dom.innerHTML = text;
    this.medium = new MediumEditor(this.dom, {
      ...options,
      placeholder: {
        text: '请输入...',
      },
      toolbar: false,
    });
    this.medium.subscribe('editableInput', (e, b: HTMLDivElement) => {
      this.setState({
        text: b.innerHTML,
      }, () => {
        (this.props.onChange || noop)(b.innerHTML);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text) {
      this.setState({
        text: nextProps.text
      }, () => {
        this.medium.destroy();
        this.dom.innerHTML = nextProps.text;
        this.medium.setup();
      });
    }
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  render() {
    const { options, onChange, text, children, ...props } = this.props;
    return (
      <div
        ref={(c) => { this.dom = c; }}
        {...props}
      />
    );
  }
}
