import * as dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb+srv://tractian:tractian123@assets-dashboard-cluste.kat26mh.mongodb.net/?retryWrites=true&w=majority',
  port: process.env.PORT || 5051,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
