module.exports = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)", // Remove the mdx pattern if you don't use it
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react-webpack5",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};