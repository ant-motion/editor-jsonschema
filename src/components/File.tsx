import * as React from 'react';
import { Upload, Row, Col, Input, message, Icon } from 'antd';
import Box from './Box';
import { IProps } from '../utils';

interface IMProps extends IProps {
  type?: string;
}

interface IState {
  src: string;
  percent: number;
}

export default class File extends Box<IMProps, IState> {
  state = {
    src: '',
    percent: 0,
  };


  beforeUpload = (file) => {
    const { type, uploadImageSize, uploadVideoSize } = this.props;
    const { percent } = this.state;
    if (percent) {
      message.error('当前有文件正在上传，请稍后。');
      return false;
    }
    const size = type === 'image' ? uploadImageSize : uploadVideoSize;
    if (file.size > size) {
      message.error(`大小不能超过 ${Math.floor(size / 1024)}KB`);
      return false;
    }
    return true;
  }

  handleProcess = (info) => {
    const { file } = info;
    const { status, response, percent, name } = file;
    const { selected } = this.props;
    switch (status) {
      case 'error': {
        message.error(`${name} 上传失败。`);
        break;
      }
      case 'done': {
        message.success(`${name} 上传成功。`);
        this.props.onChange(response.url, selected);
        // 恢复进步条;
        setTimeout(() => {
          this.setState({
            percent: 0,
          });
        }, 300);
        this.setState({
          percent,
        });
        break;
      }
      default:
        this.setState({
          percent: percent > 95 ? 95 : percent,
        });
        break;
    }
  }

  getChildrenToRender = () => {
    const { type, prefixCls, uploadProps, data } = this.props;
    const { percent } = this.state;
    const image = type === 'image' ? (
      <div className={`${prefixCls}-${type}-img`} style={{ backgroundImage: `url(${data.toString()})` }} />
    ) : null;
    return (
      <Row gutter={8}>
        {image ? <Col span={8}>{image}</Col> : null}
        <Col span={image ? 16 : 24}>
          <Input defaultValue={data.toString()} size="small" placeholder="请上传或粘贴地址." />
          <Upload
            accept={type === 'image' ? 'image/*' : 'video/*'}
            withCredentials
            beforeUpload={this.beforeUpload}
            {...uploadProps}
            onChange={this.handleProcess}
            showUploadList={false}
          >
            <div className={`${prefixCls}-upload-button`}>
              <em style={{ width: `${percent}%` }} />
              <p><Icon type={percent ? 'loading' : 'upload'} /> 选择文件</p>
            </div>
          </Upload>
        </Col>
      </Row>
    );
  }
}