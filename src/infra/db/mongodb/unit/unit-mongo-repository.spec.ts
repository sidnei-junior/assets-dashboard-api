import { Collection } from 'mongodb'

import env from '@/main/config/env'
import { MongoHelper } from '../helper/mongo-helper'
import { UnitMongoRepository } from './unit-mongo-repository'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'

let unitCollection: Collection

const makeFakeUnitsDatas = (): AddUnitModel[] => [
  { name: 'any_name', companyId: 'any_company_id' },
  { name: 'other_name', companyId: 'any_company_id' }
]

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

  describe('loadByCompanyId()', () => {
    test('Should return a list of units on loadByCompanyId success', async () => {
      const sut = makeSut()
      await unitCollection.insertMany([
        {
          name: 'any_name',
          companyId: 'any_company_id'
        },
        {
          name: 'other_name',
          companyId: 'any_company_id'
        }
      ])
      const units = await sut.loadByCompanyId('any_company_id')
      expect(units.length).toBe(2)
      expect(units[0].id).toBeTruthy()
      expect(units[0].name).toBe('any_name')
      expect(units[0].companyId).toBe('any_company_id')
    })
  })

  describe('delete()', () => {
    test('Should delete unit on success', async () => {
      const sut = makeSut()
      const result = await unitCollection.insertMany(makeFakeUnitsDatas())
      const { insertedIds } = result
      await sut.delete(insertedIds[0].toHexString())

      const companies = await sut.loadByCompanyId('any_company_id')

      expect(companies.length).toBe(1)
      expect(companies[0].name).toBe('other_name')
    })

    test('Should return null if mongo return deleteCount 0', async () => {
      const sut = makeSut()
      const response = await sut.delete('63c170afa3a8b2549002bbd8')
      expect(response).toBeNull()
    })
  })
})
