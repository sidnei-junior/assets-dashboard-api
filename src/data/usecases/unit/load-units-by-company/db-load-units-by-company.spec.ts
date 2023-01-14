import { LoadUnitsByCompanyRepository } from '@/data/protocols/db/unit/load-units-by-company-repository'
import { UnitModel } from '@/domain/models/unit'
import { DbLoadUnitsByCompany } from './db-load-units-by-company'

const makeFakeUnitsByCompany = (): UnitModel[] => [
  {
    id: 'any_id',
    name: 'any_name',
    companyId: 'any_company_id'
  },
  {
    id: 'other_id',
    name: 'other_name',
    companyId: 'any_company_id'
  }
]

const makeLoadUnitsByCompanyRepository = (): LoadUnitsByCompanyRepository => {
  class LoadUnitsByCompanyRepositoryStub implements LoadUnitsByCompanyRepository {
    async loadByCompanyId(): Promise<UnitModel[]> {
      return makeFakeUnitsByCompany()
    }
  }

  return new LoadUnitsByCompanyRepositoryStub()
}

type SutTypes = {
  sut: DbLoadUnitsByCompany
  loadUnitsByCompanyRepositoryStub: LoadUnitsByCompanyRepository
}

const makeSut = (): SutTypes => {
  const loadUnitsByCompanyRepositoryStub = makeLoadUnitsByCompanyRepository()
  const sut = new DbLoadUnitsByCompany(loadUnitsByCompanyRepositoryStub)
  return { sut, loadUnitsByCompanyRepositoryStub }
}

describe('DbLoadUnitsByCompany Usecase', () => {
  test('Should call LoadUnitsByCompanyRepository with correct value', async () => {
    const { sut, loadUnitsByCompanyRepositoryStub } = makeSut()
    const loadByCompanyIdSpy = jest.spyOn(loadUnitsByCompanyRepositoryStub, 'loadByCompanyId')
    await sut.load('any_company_id')
    expect(loadByCompanyIdSpy).toHaveBeenCalled()
  })

  test('Should return a list of units on success', async () => {
    const { sut } = makeSut()
    const companies = await sut.load('any_company_id')
    expect(companies).toEqual(makeFakeUnitsByCompany())
  })

  test('Should throw if LoadUnitsByCompanyRepository throws ', async () => {
    const { sut, loadUnitsByCompanyRepositoryStub } = makeSut()
    jest
      .spyOn(loadUnitsByCompanyRepositoryStub, 'loadByCompanyId')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_company_id')
    void expect(promise).rejects.toThrow()
  })
})
