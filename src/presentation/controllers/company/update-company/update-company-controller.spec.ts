import { CompanyModel } from '@/domain/models/company'
import { UpdateCompany, UpdateCompanyModel } from '@/domain/usecases/company/update-company'
import { HttpRequest } from '@/presentation/protocols'
import { UpdateCompanyController } from './update-company-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    cnpj: 'any_cnpj'
  },
  params: { companyId: 'any_id' }
})

const makeUpdateCompany = (): UpdateCompany => {
  class UpdateCompanyStub implements UpdateCompany {
    async update(companyData: UpdateCompanyModel, id: string): Promise<CompanyModel> {
      return makeFakeCompany()
    }
  }

  return new UpdateCompanyStub()
}

const makeFakeCompany = (): CompanyModel => ({
  id: 'any_id',
  name: 'any_name',
  cnpj: 'any_cnpj'
})

type SutTypes = {
  updateCompanyStub: UpdateCompany
  sut: UpdateCompanyController
}

const makeSut = (): SutTypes => {
  const updateCompanyStub = makeUpdateCompany()
  const sut = new UpdateCompanyController(updateCompanyStub)
  return { sut, updateCompanyStub }
}

describe('UpdateCompany Controller', () => {
  test('Should call UpdateCompany with correct values', async () => {
    const { sut, updateCompanyStub } = makeSut()
    const updateSpy = jest.spyOn(updateCompanyStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(
      {
        name: 'any_name',
        cnpj: 'any_cnpj'
      },
      'any_id'
    )
  })
})
