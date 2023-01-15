import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { AssetMongoRepository } from './asset-mongo-repository'

let assetCollection: Collection

describe('Asset Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    assetCollection = await MongoHelper.getCollection('assets')
    await assetCollection.deleteMany({})
  })

  const makeSut = (): AssetMongoRepository => {
    return new AssetMongoRepository()
  }

  describe('add()', () => {
    test('Should return an asset on add success', async () => {
      const sut = makeSut()
      const asset = await sut.add({
        unitId: 'any_unit_id',
        ownerId: 'any_owner_id',
        companyId: 'any_company_id',
        name: 'any_name',
        image: 'any_image',
        description: 'any_description',
        model: 'any_model',
        status: 0,
        healthLevel: 100
      })
      expect(asset).toBeTruthy()
      expect(asset.id).toBeTruthy()
      expect(asset.unitId).toBe('any_unit_id')
      expect(asset.ownerId).toBe('any_owner_id')
      expect(asset.name).toBe('any_name')
      expect(asset.image).toBe('any_image')
      expect(asset.description).toBe('any_description')
      expect(asset.model).toBe('any_model')
      expect(asset.status).toBe(0)
      expect(asset.healthLevel).toBe(100)
    })
  })

  describe('loadByUnitId()', () => {
    test('Should return a list of assets on loadByUnitId success', async () => {
      const sut = makeSut()
      await assetCollection.insertMany([
        {
          unitId: 'any_unit_id',
          ownerId: 'any_owner_id',
          companyId: 'any_company_id',
          name: 'any_name',
          image: 'any_image',
          description: 'any_description',
          model: 'any_model',
          status: 0,
          healthLevel: 100
        },
        {
          unitId: 'any_unit_id',
          ownerId: 'any_owner_id',
          companyId: 'any_company_id',
          name: 'other_name',
          image: 'other_image',
          description: 'other_description',
          model: 'other_model',
          status: 0,
          healthLevel: 100
        }
      ])
      const units = await sut.loadByUnitId('any_unit_id')
      expect(units.length).toBe(2)
      expect(units[0].id).toBeTruthy()
      expect(units[0].name).toBe('any_name')
      expect(units[0].unitId).toBe('any_unit_id')
    })
  })
})
