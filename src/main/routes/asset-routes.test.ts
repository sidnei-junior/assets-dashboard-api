import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { sign } from 'jsonwebtoken'

let assetCollection: Collection
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

describe('Asset Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    assetCollection = await MongoHelper.getCollection('assets')
    await assetCollection.deleteMany({})
    unitCollection = await MongoHelper.getCollection('units')
    await unitCollection.deleteMany({})
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /assets', () => {
    test('Should return 403 on add unit without accessToken', async () => {
      await request(app)
        .post('/api/assets')
        .send({
          unitId: 'any_unit_id',
          ownerId: 'any_owner_id',
          name: 'any_name',
          image: 'any_image',
          description: 'any_description',
          model: 'any_model',
          status: 0,
          healthLevel: 100
        })
        .expect(403)
    })

    test('Should return 200 on add asset with valid accessToken', async () => {
      const mongoCompanyResponse = await companyCollection.insertOne({ name: 'TRACTIAN', cnpj: '111.111' })
      const { insertedId: companyId } = mongoCompanyResponse

      const mongoUnitResponse = await unitCollection.insertOne({
        name: 'Canad??',
        companyId
      })
      const { insertedId: unitId } = mongoUnitResponse

      const mongoAccountResponse = await accountCollection.insertOne({
        name: 'Isabel',
        email: 'isabel@mail.com',
        password: '123'
      })
      const { insertedId: ownerId } = mongoAccountResponse

      const accessToken = await makeAccessToken({ role: 'admin' })
      await request(app)
        .post('/api/assets')
        .set('x-access-token', accessToken)
        .send({
          unitId,
          ownerId,
          name: 'any_name',
          image: 'any_image',
          description: 'any_description',
          model: 'any_model',
          status: 0,
          healthLevel: 100
        })
        .expect(200)
    })
  })

  describe('GET /assets/:unitId', () => {
    test('Should return 403 on load assets by unitId without accessToken', async () => {
      await request(app).get('/api/assets/any_unit_id').expect(403)
    })

    test('Should return 2xx on load assets by unitId with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/assets/any_unit_id')
        .set('x-access-token', accessToken)
        .expect(200 | 204)
    })
  })

  describe('GET /assets/units/:companyId', () => {
    test('Should return 403 on load assets by companyId without accessToken', async () => {
      await request(app).get('/api/assets/units/any_company_id').expect(403)
    })

    test('Should return 2xx on load assets by companyId with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/assets/units/any_company_id')
        .set('x-access-token', accessToken)
        .expect(200 | 204)
    })
  })

  describe('DELETE /assets/:assetId', () => {
    test('Should return 403 on delete asset without accessToken', async () => {
      await request(app).delete('/api/assets/any_asset_id').expect(403)
    })

    test('Should return 204 on success', async () => {
      const mongoResponse = await assetCollection.insertOne({
        unitId: 'any_unit_id',
        ownerId: 'any_owner_id',
        name: 'any_name',
        image: 'any_image',
        description: 'any_description',
        model: 'any_model',
        status: 0,
        healthLevel: 100
      })
      const accessToken = await makeAccessToken()
      await request(app)
        .delete(`/api/assets/${mongoResponse.insertedId.toHexString()}`)
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('PUT /assets/:assetId', () => {
    test('Should return 403 on update asset without accessToken', async () => {
      await request(app).put('/api/assets/any_asset_id').expect(403)
    })

    test('Should return 200 on success', async () => {
      const mongoAccountResponse = await accountCollection.insertMany([
        {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'
        },
        {
          name: 'other_name',
          email: 'other_email@mail.com',
          password: 'other_password'
        }
      ])

      const ownerId = mongoAccountResponse.insertedIds[0].toHexString()

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

      const mongoUnitResponse = await unitCollection.insertMany([
        {
          name: 'any_name',
          companyId
        },
        {
          name: 'other_name',
          companyId
        }
      ])

      const unitId = mongoUnitResponse.insertedIds[0].toHexString()

      const mongoAssetResponse = await assetCollection.insertOne({
        unitId,
        ownerId,
        name: 'any_name',
        image: 'any_image',
        description: 'any_description',
        model: 'any_model',
        status: 0,
        healthLevel: 100
      })

      const accessToken = await makeAccessToken()
      await request(app)
        .put(`/api/assets/${mongoAssetResponse.insertedId.toHexString()}`)
        .send({
          unitId: mongoUnitResponse.insertedIds[1].toHexString(),
          ownerId: mongoAccountResponse.insertedIds[1].toHexString(),
          name: 'update_name',
          image: 'update_image',
          description: 'update_description',
          model: 'update_model',
          status: 1,
          healthLevel: 80
        })
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
