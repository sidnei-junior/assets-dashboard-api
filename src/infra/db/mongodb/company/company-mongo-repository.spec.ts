import { Collection } from 'mongodb'

import env from '@/main/config/env'
import { MongoHelper } from '../helper/mongo-helper'
import { CompanyMongoRepository } from './company-mongo-repository'

let companyCollection: Collection

describe('Company Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
  })

  const makeSut = (): CompanyMongoRepository => {
    return new CompanyMongoRepository()
  }

  describe('add()', () => {
    test('Should return a company on add success', async () => {
      const sut = makeSut()
      const company = await sut.add({
        name: 'any_name',
        cnpj: 'any_cnpj'
      })
      expect(company).toBeTruthy()
      expect(company.id).toBeTruthy()
      expect(company.name).toBe('any_name')
      expect(company.cnpj).toBe('any_cnpj')
    })
  })

  describe('loadByCnpj()', () => {
    test('Should return a company on loadByCnpj success', async () => {
      const sut = makeSut()
      await companyCollection.insertOne({
        name: 'any_name',
        cnpj: 'any_cnpj'
      })
      const company = await sut.loadByCnpj('any_cnpj')
      expect(company).toBeTruthy()
      expect(company.id).toBeTruthy()
      expect(company.name).toBe('any_name')
      expect(company.cnpj).toBe('any_cnpj')
    })
  })
})
