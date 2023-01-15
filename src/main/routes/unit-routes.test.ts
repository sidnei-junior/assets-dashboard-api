import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'

let unitCollection: Collection
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

describe('Unit Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    unitCollection = await MongoHelper.getCollection('units')
    await unitCollection.deleteMany({})
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /units', () => {
    test('Should return 403 on add unit without accessToken', async () => {
      await request(app)
        .post('/api/units')
        .send({
          name: 'TRACTIAN',
          companyId: 'any_company_id'
        })
        .expect(403)
    })

    test('Should return 200 on add unit with valid accessToken', async () => {
      const mongoResponse = await companyCollection.insertOne({ name: 'TRACTIAN', cnpj: '111.111' })
      const { insertedId: id } = mongoResponse
      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .post('/api/units')
        .set('x-access-token', accessToken)
        .send({
          name: 'Guadalajara',
          companyId: id.toHexString()
        })
        .expect(200)
    })
  })

  describe('GET /units', () => {
    test('Should return 403 on load units by companyId without accessToken', async () => {
      await request(app).get('/api/units/any_company_id').expect(403)
    })

    test('Should return 2xx on load units by companyId with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/units/any_company_id')
        .set('x-access-token', accessToken)
        .expect(200 | 204)
    })
  })

  describe('DELETE /units/:unitId', () => {
    test('Should return 403 on delete unit without accessToken', async () => {
      await request(app).delete('/api/companies/any_unit_id').expect(403)
    })

    test('Should return 204 on success', async () => {
      const mongoResponse = await unitCollection.insertOne({
        name: 'any_name',
        companyId: 'any_company_id'
      })
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/units/${mongoResponse.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /units/:unitId', () => {
    test('Should return 403 on update unit without accessToken', async () => {
      await request(app).put('/api/units/any_unit_id').expect(403)
    })

    test('Should return 200 on success', async () => {
      const mongoCompanyResponse = await companyCollection.insertMany([
        {
          name: 'any_name',
          cnpj: 'any_cnpj'
        },
        {
          name: 'other_name',
          cnpj: 'other_cnpj'
        }
      ])

      const companyId = mongoCompanyResponse.insertedIds[0].toHexString()

      const mongoUnitResponse = await unitCollection.insertOne({
        name: 'any_name',
        companyId
      })

      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .put(`/api/units/${mongoUnitResponse.insertedId.toHexString()}`)
        .send({
          name: 'update_name',
          companyId: mongoCompanyResponse.insertedIds[1].toHexString()
        })
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
