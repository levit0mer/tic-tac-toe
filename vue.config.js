module.exports = {
  publicPath: '/tic-tac-toe/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/styles/styles.scss";`,
      },
    },
  },
};
