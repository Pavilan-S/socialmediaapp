const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('https://6855135f6a6ef0ed6631285e.mockapi.io/post')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

const port = process.env.PORT || 10000
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
