import { Collection } from 'mongodb'

import env from '@/main/config/env'
import { MongoHelper } from '../helper/mongo-helper'
import { CompanyMongoRepository } from './company-mongo-repository'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'

let companyCollection: Collection

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

    test('Should return null if loadByCnpj fails', async () => {
      const sut = makeSut()
      const company = await sut.loadByCnpj('any_cnpj')
      expect(company).toBeFalsy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all companies on success', async () => {
      const sut = makeSut()
      await companyCollection.insertMany(makeFakeCompaniesDatas())
      const companies = await sut.loadAll()
      expect(companies.length).toBe(2)
      expect(companies[0].cnpj).toBe('any_cnpj')
      expect(companies[1].cnpj).toBe('other_cnpj')
    })
  })

  describe('delete()', () => {
    test('Should delete companies on success', async () => {
      const sut = makeSut()
      const result = await companyCollection.insertMany(makeFakeCompaniesDatas())
      const { insertedIds } = result
      await sut.delete(insertedIds[0].toHexString())

      const companies = await sut.loadAll()

      expect(companies.length).toBe(1)
      expect(companies[0].cnpj).toBe('other_cnpj')
    })
  })
})
