import express from 'express'
import testRoute from './test'

const routes = express.Router()

routes.use((req, _res, next) => {
  console.log(req.method, '::', req.url)
  next()
})
routes.use(testRoute)

export default routes
