import TweenOne from 'rc-tween-one';
import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import classnames from 'classnames';
import { IProps, currentScrollTop } from '../utils';
import { SketchPicker, BlockPicker } from 'react-color';
import Box from './Box';

interface IMProps extends IProps {
  data?: string;
}

interface IState {
  show?: boolean;
}

const TweenOneGroup = TweenOne.TweenOneGroup;
const alphaBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/' +
  '9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0p' +
  'gAAAABJRU5ErkJggg==';

const colorExp = /^#([0-9a-f]{6}|[0-9a-f]{3})$|rgb(a?)\((\d+),\s*(\d+),\s*(\d+)((,\s*(\d+))?)\)$|^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/i;

const isColor = (t) => colorExp.test(t);


export default class ColorComp extends Box<IMProps, IState> {
  state = {
    show: undefined
  };
  private colorDom: HTMLElement;

  onColorClick = () => {
    this.setState({
      show: true,
    });
  }

  onInputChange = (e) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    const { onChange, selected } = this.props;
    if (isColor(target.value) && onChange) {
      onChange(target.value, selected);
    }
  }
  closeColorPicker = () => {
    this.setState({
      show: false,
    });
  }
  colorHandleChange = (value) => {
    const { selected, onChange } = this.props;
    const rgb = value.rgb;
    const color = rgb.a === 1 ? value.hex : `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    if (onChange) {
      onChange(color === value.hex ? color.toLocaleUpperCase() : color, selected);
    }
  }
  getStyle = (rect, { r, top, center }) => {

    const w = rect.windowRect;
    const c = rect.colorRect;
    let $top = w.scrollTop + c.top + (top || 0);
    let $left = center ? c.left - r.w / 2 + c.width / 2 : c.x;
    let transformOrigin = '50% 0';
    $left = $left < 10 ? 10 : $left;
    if (c.top + r.h > w.height) {
      $top = c.top - r.h - 10 + (top || 0);
      transformOrigin = '50% 100%';
    }
    if ($left + r.w > w.width) {
      $left = w.width - r.w - 10;
    }
    return {
      top: $top,
      left: $left,
      transformOrigin,
    };
  }

  getColorPicker = (rect) => {
    const { schema, data: color, prefixCls } = this.props;
    const { show } = this.state;
    let r;
    let pickerChild;
    if (schema.meta && schema.meta.color) {
      const colors = schema.meta.color.split(',').map(c => c.trim());
      r = {
        r: {
          w: 170,
          h: 41 + Math.floor(colors.length / 5) * 32,
        },
        top: 30,

      };
      pickerChild = (
        <BlockPicker
          color={color}
          colors={colors}
          onChangeComplete={this.colorHandleChange}
        />
      );
    } else {
      r = {
        r: {
          w: 220,
          h: 309,
        },
        top: 20,
        center: true,
      };
      pickerChild = (
        <SketchPicker
          color={color && isColor(color) ? color : 'rgba(0,0,0,0)'}
          presetColors={[
            '#f04134',
            '#00a854',
            '#108ee9',
            '#f5317f',
            '#f56a00',
            '#7265e6',
            '#ffbf00',
            '#00a2ae',
            '#222222',
            '#404040',
            // '#5a5a5a',
            '#919191',
            '#bfbfbf',
            '#d9d9d9',
            '#e9e9e9',
            // '#f5f5f5',
            // '#f7f7f7',
            '#fbfbfb',
            'transparent',
          ]}
          onChangeComplete={this.colorHandleChange}
        />
      );
    }
    const style = this.getStyle(rect, r);
    const pos = {
      top: style.top,
      left: style.left,
    };
    const className = classnames({
      [`${prefixCls}-color-picker-wrapper`]: true,
      [`${prefixCls}-color-picker-show`]: show,
    });
    const origin = style.transformOrigin;
    return (
      <div className={className}>
        <div className={`${prefixCls}-color-mask`} onClick={this.closeColorPicker} />
        <TweenOneGroup
          className={`${prefixCls}-color-picker`}
          enter={{ scaleY: 0.8, opacity: 0, type: 'from', duration: 200, ease: 'easeOutCirc' }}
          leave={{ scaleY: 0.8, opacity: 0, duration: 300, ease: 'easeInOutCirc' }}
          style={pos}
        >
          {show && <div style={{ transformOrigin: origin }} key="picker">
            {pickerChild}
          </div>}
        </TweenOneGroup>
      </div>
    );
  }
  getRect = () => {
    const colorRect = this.colorDom.getBoundingClientRect();
    const windowRect = {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
      scrollTop: currentScrollTop(),
    };
    return { windowRect, colorRect };
  }
  getChildrenToRender = () => {
    const { data, schema, prefixCls } = this.props;
    const { show } = this.state;
    const rect = this.colorDom ? this.getRect() : {};
    const className = classnames({
      [`${prefixCls}-color`]: true,
      active: show,
    });
    return (
      <div>
        <a
          ref={c => {
            this.colorDom = c;
          }}
          onClick={this.onColorClick}
          className={className}
          style={{ background: `#fff url(${alphaBg})` }}
        >
          <i
            style={{ background: data }}
            className={`${!data ? 'no-color' : ''}`}
          >
            {!data && (<svg width="100%" height="100%" viewBox="0 0 60 20" id="no-color">
              <g id="Page-1">
                <path d="M0.5,19.5 L59.5,0.5" id="Line" stroke="#FF0000" />
              </g>
            </svg>)}
          </i>
        </a>
        <div className={`${prefixCls}-color-input`}>
          <Input
            disabled={!!(schema.meta && schema.meta.color)}
            value={!!(schema.meta && schema.meta.color) ? data : undefined}
            defaultValue={data}
            size="small"
            width="100%"
            onBlur={this.onInputChange}
          />
        </div>
        {show !== undefined && ReactDOM.createPortal(this.getColorPicker(rect), document.body)}
      </div>
    );
  }
}
