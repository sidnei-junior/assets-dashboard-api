import { Collection } from 'mongodb'

import env from '@/main/config/env'
import { MongoHelper } from '../helper/mongo-helper'
import { UnitMongoRepository } from './unit-mongo-repository'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'

let unitCollection: Collection
let companyCollection: Collection

const makeFakeUnitData = (): AddUnitModel => ({ name: 'any_name', companyId: 'any_company_id' })

const makeFakeCompaniesDatas = (): AddCompanyModel[] => [
  {
    name: 'any_name',
    cnpj: 'any_cnpj'
  },
  {
    name: 'other_name',
    cnpj: 'other_cnpj'
  }
]

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
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
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

  describe('loadById()', () => {
    test('Should return a unit on loadById success', async () => {
      const sut = makeSut()
      const mongoResponse = await unitCollection.insertOne({
        name: 'any_name',
        companyId: 'any_company_id'
      })
      const { insertedId: id } = mongoResponse
      const unit = await sut.loadById(id.toHexString())
      expect(unit).toBeTruthy()
    })

    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const unit = await sut.loadById('63c115f15ae95ba560591c3b')
      expect(unit).toBeFalsy()
    })
  })

  describe('delete()', () => {
    test('Should delete unit on success', async () => {
      const sut = makeSut()
      const result = await unitCollection.insertMany(makeFakeUnitsDatas())
      const { insertedIds } = result
      await sut.delete(insertedIds[0].toHexString())

      const units = await sut.loadByCompanyId('any_company_id')

      expect(units.length).toBe(1)
      expect(units[0].name).toBe('other_name')
    })

    test('Should return null if mongo return deleteCount 0', async () => {
      const sut = makeSut()
      const response = await sut.delete('63c170afa3a8b2549002bbd8')
      expect(response).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update unit on success', async () => {
      const sut = makeSut()

      const companyResult = await companyCollection.insertMany(makeFakeCompaniesDatas())
      const { insertedIds: companiesIds } = companyResult

      const unitResult = await unitCollection.insertOne({
        ...makeFakeUnitData(),
        companyId: companiesIds[0].toHexString()
      })
      const { insertedId } = unitResult

      const unitReturned = await sut.update(
        {
          name: 'update_name',
          companyId: companiesIds[1].toHexString()
        },
        insertedId.toHexString()
      )

      const units = await sut.loadByCompanyId(companiesIds[1].toHexString())

      expect(units.length).toBe(1)
      expect(units[0].name).toBe('update_name')
      expect(units[0].companyId).toBe(companiesIds[1].toHexString())
    })

    test('Should return string unit if mongo return matchedCount 0', async () => {
      const sut = makeSut()
      const response = await sut.update(
        {
          name: 'update_name',
          companyId: 'update_company_id'
        },
        '63c170afa3a8b2549002bbd8'
      )
      expect(response).toBe('unit')
    })
  })
})
