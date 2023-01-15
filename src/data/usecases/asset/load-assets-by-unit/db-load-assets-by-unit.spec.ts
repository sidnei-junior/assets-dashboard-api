import { LoadAssetsByUnitRepository } from '@/data/protocols/db/asset/load-assets-by-unit-repository'
import { AssetModel } from '@/domain/models/asset'
import { DbLoadAssetsByUnit } from './db-load-assets-by-unit'

const makeFakeAssetsByUnit = (): AssetModel[] => [
  {
    id: 'any_id',
    companyId: 'any_company_id',
    unitId: 'any_unit_id',
    ownerId: 'any_owner_id',
    name: 'any_name',
    image: 'any_image',
    description: 'any_description',
    model: 'any_model',
    status: 0,
    healthLevel: 100
  },
  {
    id: 'other_id',
    companyId: 'any_company_id',
    unitId: 'any_unit_id',
    ownerId: 'any_owner_id',
    name: 'other_name',
    image: 'other_image',
    description: 'other_description',
    model: 'other_model',
    status: 0,
    healthLevel: 100
  }
]

const makeLoadAssetsByUnitRepository = (): LoadAssetsByUnitRepository => {
  class LoadAssetsByUnitRepositoryStub implements LoadAssetsByUnitRepository {
    async loadByUnitId(): Promise<AssetModel[]> {
      return makeFakeAssetsByUnit()
    }
  }

  return new LoadAssetsByUnitRepositoryStub()
}

type SutTypes = {
  sut: DbLoadAssetsByUnit
  loadAssetsByUnitRepositoryStub: LoadAssetsByUnitRepository
}

const makeSut = (): SutTypes => {
  const loadAssetsByUnitRepositoryStub = makeLoadAssetsByUnitRepository()
  const sut = new DbLoadAssetsByUnit(loadAssetsByUnitRepositoryStub)
  return { sut, loadAssetsByUnitRepositoryStub }
}

describe('DbLoadAssetsByUnit Usecase', () => {
  test('Should call LoadAssetsByUnitRepository with correct value', async () => {
    const { sut, loadAssetsByUnitRepositoryStub } = makeSut()
    const loadByUnitIdSpy = jest.spyOn(loadAssetsByUnitRepositoryStub, 'loadByUnitId')
    await sut.load('any_unit_id')
    expect(loadByUnitIdSpy).toHaveBeenCalledWith('any_unit_id')
  })

  test('Should return a list of assets on success', async () => {
    const { sut } = makeSut()
    const companies = await sut.load('any_unit_id')
    expect(companies).toEqual(makeFakeAssetsByUnit())
  })

  test('Should throw if LoadAssetsByUnitRepository throws ', async () => {
    const { sut, loadAssetsByUnitRepositoryStub } = makeSut()
    jest
      .spyOn(loadAssetsByUnitRepositoryStub, 'loadByUnitId')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_unit_id')
    void expect(promise).rejects.toThrow()
  })
})
