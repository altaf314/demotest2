const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/upload-file/**", {
      target: "http://localhost:9090",
    })
  );
};
