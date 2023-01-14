import { LoadCompanyByIdRepository } from '@/data/protocols/db/company/load-company-by-id-repository'
import { UpdateUnitRepository } from '@/data/protocols/db/unit/update-unit-repository'
import { CompanyModel } from '@/domain/models/company'
import { UnitModel } from '@/domain/models/unit'
import { UpdateUnitModel } from '@/domain/usecases/unit/update-unit'
import { DbUpdateUnit } from './db-update-unit'

const makeUpdateUnitRepository = (): UpdateUnitRepository => {
  class UpdateUnitRepositoryStub implements UpdateUnitRepository {
    async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | string> {
      return makeFakeUnit()
    }
  }
  return new UpdateUnitRepositoryStub()
}

const makeLoadCompanyByIdRepository = (): LoadCompanyByIdRepository => {
  class LoadCompanyByIdRepositoryStub implements LoadCompanyByIdRepository {
    async loadById(id: string): Promise<CompanyModel> {
      return makeFakeCompany()
    }
  }

  return new LoadCompanyByIdRepositoryStub()
}

const makeFakeCompany = (): CompanyModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

const makeFakeUnit = (): UnitModel => ({
  id: 'valid_id',
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeUnitData = (): UpdateUnitModel => ({
  name: 'valid_name',
  companyId: 'valid_company_id'
})

type SutTypes = {
  sut: DbUpdateUnit
  updateUnitRepositoryStub: UpdateUnitRepository
  loadCompanyByIdRepositoryStub: LoadCompanyByIdRepository
}

const makeSut = (): SutTypes => {
  const updateUnitRepositoryStub = makeUpdateUnitRepository()
  const loadCompanyByIdRepositoryStub = makeLoadCompanyByIdRepository()
  const sut = new DbUpdateUnit(updateUnitRepositoryStub, loadCompanyByIdRepositoryStub)
  return { sut, updateUnitRepositoryStub, loadCompanyByIdRepositoryStub }
}

describe('DbUpdateUnit', () => {
  test('Should call UpdateUnitRepository with correct values', async () => {
    const { sut, updateUnitRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateUnitRepositoryStub, 'update')
    await sut.update(makeFakeUnitData(), 'any_id')
    expect(updateSpy).toHaveBeenCalledWith(
      {
        name: 'valid_name',
        companyId: 'valid_company_id'
      },
      'any_id'
    )
  })

  test('Should return a unit on success', async () => {
    const { sut } = makeSut()
    const unit = await sut.update(makeFakeUnitData(), 'any_id')
    expect(unit).toEqual(makeFakeUnit())
  })

  test('Should call LoadCompanyByIdRespository with correct companyId', async () => {
    const { sut, loadCompanyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompanyByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeUnitData(), 'any_id')
    expect(loadSpy).toHaveBeenCalledWith('valid_company_id')
  })

  test('Should return string company if LoadCompanyByIdRespository return null', async () => {
    const { sut, loadCompanyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadCompanyByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const unit = await sut.update(makeFakeUnitData(), 'any_id')
    expect(unit).toBe('company')
  })
})
