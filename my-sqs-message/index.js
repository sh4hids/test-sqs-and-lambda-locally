const Koa = require("koa");
const app = new Koa();
const { sendMessageSayHello } = require("./SQS");

app.use(async ctx => {
  sendMessageSayHello({ name: "John" });
  ctx.body = "Hello World from KoaJS";
});

app.listen(8888);
