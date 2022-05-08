const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
app.use(cors()); // CORS
app.use(async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
  console.log(`[${new Date().toLocaleString()}] ${method} ${url}`);
  const diigo_response = await axios({
    url,
    method,
    baseURL: "https://www.diigo.com/",
    params,
    headers: {
      "X-Requested-With": headers["X-Requested-With".toLowerCase()],
      cookie: headers["_cookie"],
    },
  });
  context.response.body = diigo_response.data;
  context.response.type = diigo_response.headers["content-type"];
});
app.listen(3001);
