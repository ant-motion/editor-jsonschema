export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  preCommit: {
    eslint: true,
    prettier: true,
  },
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }],
  ],
};