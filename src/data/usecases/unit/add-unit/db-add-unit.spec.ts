import { LoadCompanyByIdRepository } from '@/data/protocols/db/company/load-company-by-id-repository'
import { AddUnitRepository } from '@/data/protocols/db/unit/add-unit-repository'
import { CompanyModel } from '@/domain/models/company'
import { UnitModel } from '@/domain/models/unit'
import { AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { DbAddUnit } from './db-add-unit'

const makeFakeUnit = (): UnitModel => ({
  id: 'valid_id',
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeUnitData = (): AddUnitModel => ({
  name: 'valid_name',
  companyId: 'valid_company_id'
})

const makeFakeCompany = (): CompanyModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

const makeAddUnitRepository = (): AddUnitRepository => {
  class AddUnitRepositoryStub implements AddUnitRepository {
    async add(UnitData: AddUnitModel): Promise<UnitModel> {
      return makeFakeUnit()
    }
  }
  return new AddUnitRepositoryStub()
}

const makeLoadCompanyByIdRepository = (): LoadCompanyByIdRepository => {
  class LoadCompanyByIdRepositoryStub implements LoadCompanyByIdRepository {
    async loadById(id: string): Promise<CompanyModel> {
      return makeFakeCompany()
    }
  }

  return new LoadCompanyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbAddUnit
  addUnitRepositoryStub: AddUnitRepository
  loadCompanyByIdRepositoryStub: LoadCompanyByIdRepository
}

const makeSut = (): SutTypes => {
  const addUnitRepositoryStub = makeAddUnitRepository()
  const loadCompanyByIdRepositoryStub = makeLoadCompanyByIdRepository()
  const sut = new DbAddUnit(addUnitRepositoryStub, loadCompanyByIdRepositoryStub)
  return { sut, addUnitRepositoryStub, loadCompanyByIdRepositoryStub }
}

describe('DbAddUnit Usecase', () => {
  test('Should call AddUnitRepository with correct values', async () => {
    const { sut, addUnitRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUnitRepositoryStub, 'add')
    await sut.add(makeFakeUnitData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      companyId: 'valid_company_id'
    })
  })

  test('Should return a unit on success', async () => {
    const { sut } = makeSut()
    const unit = await sut.add(makeFakeUnitData())
    expect(unit).toEqual(makeFakeUnit())
  })

  test('Should call LoadCompanyByIdRespository with correct companyId', async () => {
    const { sut, loadCompanyByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCompanyByIdRepositoryStub, 'loadById')
    await sut.add(makeFakeUnitData())
    expect(loadSpy).toHaveBeenCalledWith('valid_company_id')
  })
})
