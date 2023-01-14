import { CompanyModel } from '@/domain/models/company'
import { UpdateCompany, UpdateCompanyModel } from '@/domain/usecases/company/update-company'
import { ServerError } from '@/presentation/errors'
import { notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  updateCompanyStub: UpdateCompany
  validationStub: Validation
  sut: UpdateCompanyController
}

const makeSut = (): SutTypes => {
  const updateCompanyStub = makeUpdateCompany()
  const validationStub = makeValidation()
  const sut = new UpdateCompanyController(updateCompanyStub, validationStub)
  return { sut, updateCompanyStub, validationStub }
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

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeCompany()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
