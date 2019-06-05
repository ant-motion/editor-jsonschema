// use jsx to render html, do not modify simple.html
import EditorJSON from '../src/';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../assets/index.less';

const schema = JSON.parse('{"type":"object","description":"应用场景_0","properties":{"carouselWrapper":{"type":"object","description":"主要信息","properties":{"children":{"type":"array","description":"子级$remark=这是个备注","properties":{"title":{"type":"object","description":"大标题","properties":{"children":{"type":"string","description":"标题文字"}}},"explain":{"type":"object","description":"解释说明","properties":{"children":{"type":"array","description":"内容编辑","properties":{"component":{"type":"enum","description":"标题正文选择","items":[{"label":"标题","value":"h2"},{"label":"内容文字","value":"div"}]},"children":{"type":"string","description":"文字"}}}}},"hot":{"type":"object","description":"热门推荐","properties":{"title":{"type":"object","description":"标题","properties":{"children":{"type":"string","description":"标题文字"}}},"children":{"type":"object","description":"内容区块","properties":{"children":{"type":"array","description":"内容编辑","properties":{"href":{"type":"string","description":"链接地址"},"children":{"type":"string","description":"文字"}}}}}}},"children":{"type":"object","description":"详细说明外壳","properties":{"children":{"type":"array","description":"详细说明","properties":{"component":{"type":"enum","description":"标题正文选择","items":[{"label":"大标题","value":"h2"},{"label":"小标题","value":"h4"},{"label":"内容文字","value":"p"}]},"children":{"type":"string","description":"文字"}}}}}}}}}}}');
const dataSource = {
  wrapper: {
    className: 'scenario-wrapper',
  },
  page: {
  },
  titleWrapper: {
    titleNameEn: {
      children: 'SCENARIO',
    },
    children: [
      {
        component: 'h1',
        className: 'tech-landing-page-title-h1',
        children: '应用场景',
      },
      {
        className: 'tech-landing-page-title-image',
        children: 'https://gw.alipayobjects.com/zos/basement_prod/cccd6f14-7b0d-4358-a072-7cd10559348c.svg',
      },
    ],
  },
  OverPack: { playScale: 0.3 },
  blockWrapper: {
    className: 'scenario-block-wrapper',
  },
  detailedWrapper: {
    className: 'scenario-detailed-wrapper',
    detailed: {
      className: 'scenario-detailed',
    },
  },
  carouselWrapper: {
    list: {
      className: 'scenario-list',
    },
    children: [
      {
        className: 'scenario-item',
        title: {
          className: 'scenario-list-title',
          children: '完整体系化的数据中台',
        },
        explain: {
          className: 'scenario-explain',
          children: [
            {
              component: 'h2',
              children: '缓存热点自动迁移，毫秒级响应',
            },
            {
              children: '蚂蚁金服提供完整的数据中台解决方案，涵盖基础的分布式云平台架构、在线/离线数据的采集能力、海量数据加工和存储能力、数据资产建设能力、数据资产管理能力，并结合多年的风控、营销、客服的经验，提供智能风控、智能营销、智能客服等业务应用的解决方案，帮助企业实现大数据的业务价值。',
            },
          ],
        },
        hot: {
          className: 'scenario-hot',
          title: {
            className: 'scenario-hot-title',
            children: '相关产品推荐',
          },
          children: {
            className: 'scenario-hot-button-wrapper',
            children: [
              {
                component: 'a',
                href: '#',
                children: '数据访问代理',
              },
            ],
          },
        },
        children: {
          className: 'scenario-content',
          children: [
            {
              component: 'h2',
              children: '解决问题',
            },
            {
              component: 'h4',
              children: '开发简单',
            },
            {
              component: 'p',
              children: '提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。',
            },
            {
              component: 'h4',
              children: '开发简单',
            },
            {
              component: 'p',
              children: '提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。',
            },
            {
              component: 'h4',
              children: '开发简单',
            },
            {
              component: 'p',
              children: '提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。',
            },
          ],
        },
      },
      {
        className: 'scenario-item',
        title: {
          className: 'scenario-list-title',
          children: '完整体系化的数据中台',
        },
        explain: {
          className: 'scenario-explain',
          children: [
            {
              component: 'h2',
              children: '缓存热点自动迁移，毫秒级响应',
            },
            {
              children: '蚂蚁金服提供完整的数据中台解决方案，涵盖基础的分布式云平台架构、在线/离线数据的采集能力、海量数据加工和存储能力、数据资产建设能力、数据资产管理能力，并结合多年的风控、营销、客服的经验，提供智能风控、智能营销、智能客服等业务应用的解决方案，帮助企业实现大数据的业务价值。',
            },
          ],
        },
        hot: {
          className: 'scenario-hot',
          title: {
            className: 'scenario-hot-title',
            children: '相关产品推荐',
          },
          children: {
            className: 'scenario-hot-button-wrapper',
            children: [
              {
                component: 'a',
                href: '#',
                children: '数据访问代理',
              },
            ],
          },
        },
        children: {
          className: 'scenario-content',
          children: [
            {
              children: '解决问题开发简单提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。开发简单提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。开发简单提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。开发简单提供高性能微服务框架，轻松构建原生云应用，具备快速开发，持续交付和部署和能力。',
            },
            {
              className: 'scenario-hot',
              children: [
                {
                  className: 'scenario-hot-title',
                  children: '相关产品推荐',
                  component: 'h3',
                },
                {
                  className: 'scenario-hot-button-wrapper',
                  children: [
                    {
                      component: 'a',
                      href: '#',
                      children: '数据访问代理',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
};

class Demo extends React.Component<any, any> {
  render() {
    const selected = 'carouselWrapper&children&1'.split('&');
    return (
      <div style={{ width: 240, height: 600 }}>
        <EditorJSON data={dataSource} schema={schema} selected={selected} />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

