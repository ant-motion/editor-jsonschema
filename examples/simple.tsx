// use jsx to render html, do not modify simple.html
import EditorJSON from '../src/';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { schema } from 'schema-util';
import '../assets/index.less';

const schemaJSON = schema(`
Object(产品优势_0) {
  blockWrapper(主要信息): Object{
    bannerBgPC(电脑端背景): Object {
      children(图片地址): Image
    },
    bannerBgMobile(无线端背景): Object {
      children(图片地址): Image
    },
    title(标题): Object {
      children(文字内容),
    },
    descriptionContent(说明文字): Object{
      children(文字内容): Text,
    },
    dynamic(动态内容): Object{
      children(动态内容数组): Array{
        href(链接地址),
        children(动态标题),
      },
      all(全部动态): Object{
        href(链接地址),
        children(全部动态名称),
      },
    },
    btnWrap(按钮组合): Object{
      btn(主次按钮组合): Object {
        children(按钮编辑): Array[maxLength: 2, minLength: 1] {
          href(链接地址),
          children(按钮名称),
        }
      },
      btnsExtra(文字按钮组合): Object{
        children(按钮编辑): Array{
          target(按钮属性): Enum{
            _blank(新窗口中打开),
            _self(当前窗口打开),
          },
          href(链接地址),
          children(按钮名称),
        }
      }
    },
    introText(底部信息链接): Object{
      children(信息编辑): Array{
        target(按钮属性): Enum{
          _blank(新窗口中打开),
          _self(当前窗口打开),
        },
        href(链接地址),
        children(按钮名称),
      }
    },
    remarks(产品介绍): Object {
      isVideo(是否 Video): Boolean,
      video(Video 内容): Object[if: "$.isVideo"] {
        poster(预览图地址): Image,
        children(Video 地址): File,
      },
      info(信息内容): Object[if:"!$.isVideo"] {
        name(信息名称): Object{
          children(名称编辑),
        },
        children(信息内容): Object{
          children(内容编辑),
        }
      }
    }
  }
}
`);

const dataSource = {
  wrapper: {
    className: 'product-banner',
  },
  blockWrapper: {
    className: 'product-banner-wrapper',
    bannerBgPC: {
      className: 'product-banner-bg-pc',
      children: 'https://gw.alipayobjects.com/zos/antfincdn/59c51cf5-bab9-4d9e-9745-768c816eaa0c/594fb30f-01c4-4ebe-a93f-18977871ff99/bg.png',
    },
    bannerBgMobile: {
      className: 'product-banner-bg-mobile',
      children: 'https://gw.alipayobjects.com/zos/antfincdn/59c51cf5-bab9-4d9e-9745-768c816eaa0c/594fb30f-01c4-4ebe-a93f-18977871ff99/bg.png',
    },
    title: {
      className: 'product-banner-title',
      children: '微服务平台',
    },
    descriptionContent: {
      className: 'product-banner-description',
      children: '蚂蚁金服自主研发的金融级分布式中间件',
    },
    dynamic: {
      className: 'product-banner-dynamic',
      children: [
        {
          className: 'product-banner-dynamic-item',
          component: 'a',
          href: 'https://tech.antfin.com',
          children: '微服务平台免费试用',
        },
        {
          className: 'product-banner-dynamic-item',
          component: 'a',
          href: 'https://tech.antfin.com',
          children: '微服务平台免费试用',
        },
      ],
      all: {
        className: 'product-banner-dynamic-all',
        children: '全部产品动态',
        component: 'a',
        href: 'https://tech.antfin.com',
      },
    },
    btnWrap: {
      className: 'product-banner-btnWrap',
      btn: {
        children: [
          {
            className: 'product-banner-btn',
            children: '立即购买',
            href: 'https://product.cloud.alipay.com/common-buy?productCode=MS',
          },
          {
            className: 'product-banner-btn',
            children: '进入控制台',
          },
        ],
      },
      btnsExtra: {
        children: [
          {
            className: 'product-banner-btnsExtra',
            children: '产品价格',
            component: 'a',
            href: 'https://tech.antfin.com/price/MS',
          },
          {
            className: 'product-banner-btnsExtra',
            children: '产品文档',
            component: 'a',
            href: 'https://tech.antfin.com/docs/2/57599',
          },
          // {
          //   className: 'product-banner-btnsExtra',
          //   children: '学习路径',
          //   component: 'a',
          //   href: 'https://tech.antfin.com',
          // },
          {
            className: 'product-banner-btnsExtra',
            children: '相关活动',
            component: 'a',
            target: '_blank',
            href: 'https://tech.antfin.com/community/activities?brandId=6',
          },
          // {
          //   className: 'product-banner-btnsExtra',
          //   children: '官方专区',
          //   component: 'a',
          //   href: 'https://tech.antfin.com',
          // },
        ],
      },
    },
    introText: {
      children: [
        {
          className: 'product-banner-introText',
          children: '最新发布新版本，点击了解详情',
          component: 'a',
          href: 'https://www.sofastack.tech/',
          target: '_blank',
        },
        // {
        //   className: 'product-banner-introText',
        //   component: 'a',
        //   children: '最新发布新版本，点击了解详情',
        //   href: 'https://tech.antfin.com',
        // },
      ],
    },
    remarks: {
      className: 'product-banner-remarks',
      isVideo: false,
      video: {
        poster: 'https://gw.alipayobjects.com/zos/antfincdn/b0575e6a-1d46-4992-a441-8bc5d0d1cdf0/d77cf122-ff46-4ca5-81b9-a703bc166734/1.png',
        children: 'https://os.alipayobjects.com/rmsportal/YhwYbNmKkEYvNtTsxqZK.mp4',
      },
      info: {
        name: {
          className: 'product-banner-remarks-author',
          children: '—— 南京银行',
        },
        children: {
          className: 'product-banner-remarks-description',
          children: 'OceanBase 数据库系统经过蚂蚁金服内部大量互联网金融场景验证，给了我们尝试使用的信心。实践证明，南京银行选择OceanBase数据库，给“鑫云+”互金平台提供了更加坚实的保证。',
        },
      },
    },
  },
};

class Demo extends React.Component<any, any> {
  render() {
    const selected = 'blockWrapper'.split('&');
    return (
      <div style={{ width: 240, height: 600 }}>
        <EditorJSON data={dataSource} schema={schemaJSON} selected={selected} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

