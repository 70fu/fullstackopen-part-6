// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

//check if content is at least 5 characters
const validationMiddleware = (req,res,next) => {
  if(req.method === 'PUT' || req.method === 'POST'){
    if(!req.body){
      return res.status(400).json({ error:'No request body' });
    }
    const MIN_CONTENT_LENGTH = 5;
    if(!req.body.content || req.body.content.length<MIN_CONTENT_LENGTH){
      return res.status(400).json({ error:`content length must be at least ${MIN_CONTENT_LENGTH}` })
    }
  }
  next();
}

server.use('/anecdotes',validationMiddleware);
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})