const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const config = require('./config');
const router = require('./routers');

const app = new Koa();
app.keys = ['tickets'];

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(session(config.session, app));
app.use(bodyParser());
app.use(router.routes());

app.listen(config.port);
console.log(`Server start at port： ${config.port}`);