import * as dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/research-with-programmers-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
