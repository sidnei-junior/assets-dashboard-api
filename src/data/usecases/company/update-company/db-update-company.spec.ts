import { UpdateCompanyRepository } from '@/data/protocols/db/company/update-company-repository'
import { CompanyModel } from '@/domain/models/company'
import { UpdateCompanyModel } from '@/domain/usecases/company/update-company'
import { DbUpdateCompany } from './db-update-company'

const makeUpdateCompanyRepository = (): UpdateCompanyRepository => {
  class UpdateCompanyRepositoryStub implements UpdateCompanyRepository {
    async update(companyData: UpdateCompanyModel): Promise<CompanyModel> {
      return makeFakeCompany()
    }
  }
  return new UpdateCompanyRepositoryStub()
}

const makeFakeCompany = (): CompanyModel => ({
  id: 'valid_id',
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

const makeFakeCompanyData = (): UpdateCompanyModel => ({
  name: 'valid_name',
  cnpj: 'valid_cnpj'
})

type SutTypes = {
  sut: DbUpdateCompany
  updateCompanyRepositoryStub: UpdateCompanyRepository
}

const makeSut = (): SutTypes => {
  const updateCompanyRepositoryStub = makeUpdateCompanyRepository()
  const sut = new DbUpdateCompany(updateCompanyRepositoryStub)
  return { sut, updateCompanyRepositoryStub }
}

describe('DbUpdateCompany', () => {
  test('Should call UpdateCompanyRepository with correct values', async () => {
    const { sut, updateCompanyRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCompanyRepositoryStub, 'update')
    await sut.update(makeFakeCompanyData())
    expect(updateSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cnpj: 'valid_cnpj'
    })
  })

  test('Should return a company on success', async () => {
    const { sut } = makeSut()
    const company = await sut.update(makeFakeCompanyData())
    expect(company).toEqual(makeFakeCompany())
  })
})
