import { Collection } from 'mongodb'

import env from '@/main/config/env'
import { MongoHelper } from '../helper/mongo-helper'
import { UnitMongoRepository } from './unit-mongo-repository'

let unitCollection: Collection

describe('Unit Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    unitCollection = await MongoHelper.getCollection('units')
    await unitCollection.deleteMany({})
  })

  const makeSut = (): UnitMongoRepository => {
    return new UnitMongoRepository()
  }

  describe('add()', () => {
    test('Should return an unit on add success', async () => {
      const sut = makeSut()
      const unit = await sut.add({
        name: 'any_name',
        companyId: 'any_company_id'
      })
      expect(unit).toBeTruthy()
      expect(unit.id).toBeTruthy()
      expect(unit.name).toBe('any_name')
      expect(unit.companyId).toBe('any_company_id')
    })
  })
})
