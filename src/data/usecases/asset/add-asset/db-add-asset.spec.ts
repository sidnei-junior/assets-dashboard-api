import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-company-by-id-repository'
import { AddAssetRepository } from '@/data/protocols/db/asset/add-asset-repository'
import { LoadUnitByIdRepository } from '@/data/protocols/db/unit/load-unit-by-id-repository'
import { AssetModel } from '@/domain/models/asset'
import { UnitModel } from '@/domain/models/unit'
import { AddAssetModel } from '@/domain/usecases/asset/add-asset'
import { AccountModel } from '../../account/add-account/db-add-account-protocols'
import { DbAddAsset } from './db-add-asset'

const makeFakeAsset = (): AssetModel => ({
  id: 'valid_id',
  companyId: 'valid_company_id',
  unitId: 'valid_unit_id',
  ownerId: 'valid_owner_id',
  name: 'valid_name',
  image: 'valid_image',
  description: 'valid_description',
  model: 'valid_model',
  status: 0,
  healthLevel: 100
})

const makeFakeAssetData = (): AddAssetModel => ({
  unitId: 'valid_unit_id',
  ownerId: 'valid_owner_id',
  name: 'valid_name',
  image: 'valid_image',
  description: 'valid_description',
  model: 'valid_model',
  status: 0,
  healthLevel: 100
})

const makeFakeUnit = (): UnitModel => ({
  id: 'valid_id',
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeAddAssetRepository = (): AddAssetRepository => {
  class AddAssetRepositoryStub implements AddAssetRepository {
    async add(AssetData: AddAssetModel): Promise<AssetModel> {
      return makeFakeAsset()
    }
  }

  return new AddAssetRepositoryStub()
}

const makeLoadUnitByIdRepository = (): LoadUnitByIdRepository => {
  class LoadUnitByIdRepositoryStub implements LoadUnitByIdRepository {
    async loadById(id: string): Promise<UnitModel> {
      return makeFakeUnit()
    }
  }

  return new LoadUnitByIdRepositoryStub()
}

const makeLoadAccountByIdRepository = (): LoadAccountByIdRepository => {
  class LoadAccountByIdRepositoryStub implements LoadAccountByIdRepository {
    async loadById(id: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }

  return new LoadAccountByIdRepositoryStub()
}

type SutTypes = {
  sut: DbAddAsset
  addAssetRepositoryStub: AddAssetRepository
  loadUnitByIdRepositoryStub: LoadUnitByIdRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const addAssetRepositoryStub = makeAddAssetRepository()
  const loadUnitByIdRepositoryStub = makeLoadUnitByIdRepository()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbAddAsset(addAssetRepositoryStub, loadUnitByIdRepositoryStub, loadAccountByIdRepositoryStub)
  return { sut, addAssetRepositoryStub, loadUnitByIdRepositoryStub, loadAccountByIdRepositoryStub }
}

describe('DbAddAsset Usecase', () => {
  test('Should call AddAssetRepository with correct values', async () => {
    const { sut, addAssetRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAssetRepositoryStub, 'add')
    await sut.add(makeFakeAssetData())
    expect(addSpy).toHaveBeenCalledWith({
      unitId: 'valid_unit_id',
      ownerId: 'valid_owner_id',
      companyId: 'valid_company_id',
      name: 'valid_name',
      image: 'valid_image',
      description: 'valid_description',
      model: 'valid_model',
      status: 0,
      healthLevel: 100
    })
  })

  test('Should return a asset on success', async () => {
    const { sut } = makeSut()
    const asset = await sut.add(makeFakeAssetData())
    expect(asset).toEqual(makeFakeAsset())
  })

  test('Should call LoadUnitByIdRespository with correct unitId', async () => {
    const { sut, loadUnitByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUnitByIdRepositoryStub, 'loadById')
    await sut.add(makeFakeAssetData())
    expect(loadSpy).toHaveBeenCalledWith('valid_unit_id')
  })

  test('Should return string unit if LoadUnitByIdRespository return null', async () => {
    const { sut, loadUnitByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUnitByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const unit = await sut.add(makeFakeAssetData())
    expect(unit).toBe('unit')
  })

  test('Should call LoadAccountByIdRespository with correct ownerId', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.add(makeFakeAssetData())
    expect(loadSpy).toHaveBeenCalledWith('valid_owner_id')
  })

  test('Should return string owner if LoadAccountByIdRespository return null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const unit = await sut.add(makeFakeAssetData())
    expect(unit).toBe('owner')
  })
})
