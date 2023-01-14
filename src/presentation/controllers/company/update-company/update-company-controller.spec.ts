import { CompanyModel } from '@/domain/models/company'
import { UpdateCompany, UpdateCompanyModel } from '@/domain/usecases/company/update-company'
import { ServerError } from '@/presentation/errors'
import { notFound, serverError } from '@/presentation/helpers/http/http-helper'
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

  test('Should return 500 if UpdateCompany throws', async () => {
    const { sut, updateCompanyStub } = makeSut()
    jest.spyOn(updateCompanyStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if UpdateCompany returns null', async () => {
    const { sut, updateCompanyStub } = makeSut()
    jest.spyOn(updateCompanyStub, 'update').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound())
  })
})
