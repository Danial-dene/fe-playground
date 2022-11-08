const path = require("path");
const withLess = require("next-with-less");

const antdLessFile = path.resolve(__dirname, "./styles/antd.less");

if (typeof require !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  require.extensions[".less"] = () => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  require.extensions[".css"] = (file) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  };
}

module.exports = withLess({
  lessLoaderOptions: {
    additionalData: (content) => `${content}\n\n@import '${antdLessFile}';`,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // test: /\.(js|ts)x?$/,
        and: [/\.(js|ts)x?$/],
      },

      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: [
      "icon-library.com",
      "pbs.twimg.com",
      "upload.wikimedia.org",
      "my-live.slatic.net",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
