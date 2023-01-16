import { AddAssetModel } from '@/domain/usecases/asset/add-asset'
import { AddCompanyModel } from '@/domain/usecases/company/add-company'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'
import { AssetMongoRepository } from './asset-mongo-repository'

const makeFakeAssetsDatas = (): AddAssetModel[] => [
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
]

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

let assetCollection: Collection
let companyCollection: Collection
let unitCollection: Collection

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
    companyCollection = await MongoHelper.getCollection('companies')
    await companyCollection.deleteMany({})
    unitCollection = await MongoHelper.getCollection('units')
    await unitCollection.deleteMany({})
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

  describe('loadByCompanyId()', () => {
    test('Should return a list of assets on loadByCompanyId success', async () => {
      const sut = makeSut()
      await assetCollection.insertMany(makeFakeAssetsDatas())
      const units = await sut.loadByCompanyId('any_company_id')
      expect(units.length).toBe(2)
      expect(units[0].id).toBeTruthy()
      expect(units[0].name).toBe('any_name')
      expect(units[0].companyId).toBe('any_company_id')
    })
  })

  describe('delete()', () => {
    test('Should delete asset on success', async () => {
      const sut = makeSut()
      const result = await assetCollection.insertMany(makeFakeAssetsDatas())
      const { insertedIds } = result
      await sut.delete(insertedIds[0].toHexString())

      const assets = await sut.loadByUnitId('any_unit_id')

      expect(assets.length).toBe(1)
      expect(assets[0].name).toBe('other_name')
    })

    test('Should return null if mongo return deleteCount 0', async () => {
      const sut = makeSut()
      const response = await sut.delete('63c170afa3a8b2549002bbd8')
      expect(response).toBeNull()
    })
  })

  describe('update()', () => {
    test('Should update asset on success', async () => {
      const sut = makeSut()

      const companyResult = await companyCollection.insertMany(makeFakeCompaniesDatas())
      const { insertedIds: companiesIds } = companyResult

      const unitResult = await unitCollection.insertOne({
        ...makeFakeUnitData(),
        companyId: companiesIds[0].toHexString()
      })
      const { insertedId: unitId } = unitResult

      const assetResult = await assetCollection.insertMany(makeFakeAssetsDatas())
      const { insertedIds } = assetResult

      await sut.update(
        {
          unitId: unitId.toHexString(),
          ownerId: 'update_owner_id',
          companyId: companiesIds[1].toHexString(),
          name: 'update_name',
          image: 'update_image',
          description: 'update_description',
          model: 'update_model',
          status: 0,
          healthLevel: 100
        },
        insertedIds[0].toHexString()
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
          unitId: 'any_unit_id',
          ownerId: 'any_owner_id',
          companyId: 'any_company_id',
          name: 'other_name',
          image: 'other_image',
          description: 'other_description',
          model: 'other_model',
          status: 0,
          healthLevel: 100
        },
        '63c170afa3a8b2549002bbd8'
      )
      expect(response).toBe('asset')
    })
  })
})
