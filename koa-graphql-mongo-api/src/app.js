const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa')
const Router = require('koa-router')
const db = require('./lib/service/db')
const typeDefs = gql(require('./lib/graphql/typeDefs'))
const resolvers = require('./lib/graphql/resolvers')
const FileUpload = require('./lib/service/fileupload');

const app = new Koa();
const v1 = new Router();
const second = new Router();
const apiupload = new Router();


// GET /
v1.get('/', async (ctx, next) => {
  //console.log(ctx.request);
  console.log(" GET /");
  ctx.response.body = '<h1> Index page </h1>'; 
});

// Upload API
apiupload.post('/upload', async (ctx, next) => {
  await FileUpload(ctx); 
});

second.post('/addevent', async (ctx, next) => {
  //console.log(ctx.request);
  console.log(" POST /v1/addevent");
  // await xxxx();
});

v1.use('/v1', second.routes(), second.allowedMethods());

app.use(v1.routes());
app.use(apiupload.routes());

const server = new ApolloServer({
 typeDefs,
 resolvers
})

server.applyMiddleware({ app })


//app.on('error', err => {
//  log.error('server error', err)
//});

module.exports = {
 run: async (port) => {
   await db.connect()
   await app.listen(port)
   console.log(`Server Listening ${port}`)
 },
 app
}
