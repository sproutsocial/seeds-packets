/* eslint-disable global-require, import/no-extraneous-dependencies */
const postcssConfig = {
  plugins: [
      require('tailwindcss'),
      require('postcss-import'),
      require('autoprefixer')
  ],
};

if (process.env.NODE_ENV === 'production') {
  postcssConfig.plugins.push(
      require('autoprefixer'),
      require('cssnano')({
        // use the safe preset so that it doesn't
        // mutate or remove code from our css
        preset: 'default',
      })
  );
}

module.exports = postcssConfig;