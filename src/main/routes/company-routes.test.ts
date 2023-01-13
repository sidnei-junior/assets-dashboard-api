import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'

let companyCollection: Collection
let accountCollection: Collection

interface RoleObject {
  role: string
}
const makeAccessToken = async (roleObject: RoleObject = null): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Sidnei',
    email: 'sidnei.ifrn@gmail.com',
    password: '123',
    ...roleObject
  })
  const { insertedId: id } = res
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne(
    {
      _id: id
    },
    {
      $set: {
        accessToken
      }
    }
  )
  return accessToken
}

describe('Company Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /companies', () => {
    test('Should return 403 on add company without accessToken', async () => {
      await request(app)
        .post('/api/companies')
        .send({
          name: 'TRACTIAN',
          cnpj: '111.111'
        })
        .expect(403)
    })

    test('Should return 204 on add company with valid accessToken', async () => {
      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .post('/api/companies')
        .set('x-access-token', accessToken)
        .send({
          name: 'TRACTIAN',
          cnpj: '111.111'
        })
        .expect(204)
    })
  })

  describe('GET /companies', () => {
    test('Should return 403 on load companies without accessToken', async () => {
      await request(app).get('/api/companies').expect(403)
    })

    test('Should return 2xx on load companies with valid accessToken', async () => {
      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .get('/api/companies')
        .set('x-access-token', accessToken)
        .expect(200 | 204)
    })
  })

  describe('DELETE /companies/:companyId', () => {
    test('Should return 403 on delete company without accessToken', async () => {
      await request(app).delete('/api/companies/any_company_id').expect(403)
    })

    test('Should return 204 on success', async () => {
      const mongoResponse = await companyCollection.insertOne({
        name: 'any_name',
        cnpj: 'any_cnpj'
      })
      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .delete(`/api/companies/${mongoResponse.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
