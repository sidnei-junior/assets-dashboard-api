import { LoadAccountByIdRepository } from '@/data/protocols/db/account/load-company-by-id-repository'
import { UpdateAssetRepository } from '@/data/protocols/db/asset/update-asset-repository'
import { LoadUnitByIdRepository } from '@/data/protocols/db/unit/load-unit-by-id-repository'
import { AssetModel } from '@/domain/models/asset'
import { UnitModel } from '@/domain/models/unit'
import { UpdateAssetModel } from '@/domain/usecases/asset/update-asset'
import { AccountModel } from '../../account/add-account/db-add-account-protocols'
import { DbUpdateAsset } from './db-update-asset'

const makeUpdateAssetRepository = (): UpdateAssetRepository => {
  class UpdateAssetRepositoryStub implements UpdateAssetRepository {
    async update(assetData: UpdateAssetModel, id: string): Promise<AssetModel | string> {
      return makeFakeAsset()
    }
  }
  return new UpdateAssetRepositoryStub()
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

const makeFakeAssetData = (): UpdateAssetModel => ({
  unitId: 'valid_unit_id',
  ownerId: 'valid_owner_id',
  name: 'valid_name',
  image: 'valid_image',
  description: 'valid_description',
  model: 'valid_model',
  status: 0,
  healthLevel: 100
})

type SutTypes = {
  sut: DbUpdateAsset
  updateAssetRepositoryStub: UpdateAssetRepository
  loadUnitByIdRepositoryStub: LoadUnitByIdRepository
  loadAccountByIdRepositoryStub: LoadAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const updateAssetRepositoryStub = makeUpdateAssetRepository()
  const loadUnitByIdRepositoryStub = makeLoadUnitByIdRepository()
  const loadAccountByIdRepositoryStub = makeLoadAccountByIdRepository()
  const sut = new DbUpdateAsset(updateAssetRepositoryStub, loadUnitByIdRepositoryStub, loadAccountByIdRepositoryStub)
  return { sut, updateAssetRepositoryStub, loadUnitByIdRepositoryStub, loadAccountByIdRepositoryStub }
}

describe('DbUpdateAsset', () => {
  test('Should call UpdateAssetRepository with correct values', async () => {
    const { sut, updateAssetRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAssetRepositoryStub, 'update')
    await sut.update(makeFakeAssetData(), 'any_id')
    expect(updateSpy).toHaveBeenCalledWith(
      {
        unitId: 'valid_unit_id',
        ownerId: 'valid_owner_id',
        companyId: 'valid_company_id',
        name: 'valid_name',
        image: 'valid_image',
        description: 'valid_description',
        model: 'valid_model',
        status: 0,
        healthLevel: 100
      },
      'any_id'
    )
  })

  test('Should return a asset on success', async () => {
    const { sut } = makeSut()
    const asset = await sut.update(makeFakeAssetData(), 'any_id')
    expect(asset).toEqual(makeFakeAsset())
  })

  test('Should call LoadUnitByIdRespository with correct unitId', async () => {
    const { sut, loadUnitByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadUnitByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeAssetData(), 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('valid_unit_id')
  })

  test('Should return string unit if LoadUnitByIdRespository return null', async () => {
    const { sut, loadUnitByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUnitByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const asset = await sut.update(makeFakeAssetData(), 'any_id')
    expect(asset).toBe('unit')
  })

  test('Should call LoadAccountByIdRespository with correct ownerId', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeAssetData(), 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('valid_owner_id')
  })

  test('Should return string owner if LoadAccountByIdRespository return null', async () => {
    const { sut, loadAccountByIdRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const asset = await sut.update(makeFakeAssetData(), 'any_id')
    expect(asset).toBe('owner')
  })
})
