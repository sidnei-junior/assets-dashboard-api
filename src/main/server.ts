import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import env from './config/env'

void MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    console.log('MONGO_URL: ', env.mongoUrl)
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
