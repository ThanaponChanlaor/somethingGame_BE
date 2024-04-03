import express from 'express'
import { getTestMessage } from '../service/test'

const testRoute = express.Router()

testRoute.get('/test', getTestMessage)

export default testRoute
