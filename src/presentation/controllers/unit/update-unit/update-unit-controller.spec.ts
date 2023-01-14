import { UnitModel } from '@/domain/models/unit'
import { UpdateUnit, UpdateUnitModel } from '@/domain/usecases/unit/update-unit'
import { HttpRequest, Validation } from '../../account/login/login-controller-protocols'
import {
  badRequest,
  MissingParamError,
  notFound,
  NotFoundError,
  ok,
  ServerError,
  serverError
} from '../../account/signup/signup-controller-protocols'
import { UpdateUnitController } from './update-unit-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    companyId: 'any_company_id'
  },
  params: { unitId: 'any_id' }
})

const makeUpdateUnit = (): UpdateUnit => {
  class UpdateUnitStub implements UpdateUnit {
    async update(unitData: UpdateUnitModel, id: string): Promise<UnitModel | string> {
      return makeFakeUnit()
    }
  }

  return new UpdateUnitStub()
}

const makeFakeUnit = (): UnitModel => ({
  id: 'any_id',
  name: 'any_name',
  companyId: 'any_company_id'
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
  updateUnitStub: UpdateUnit
  validationStub: Validation
  sut: UpdateUnitController
}

const makeSut = (): SutTypes => {
  const updateUnitStub = makeUpdateUnit()
  const validationStub = makeValidation()
  const sut = new UpdateUnitController(updateUnitStub, validationStub)
  return { sut, updateUnitStub, validationStub }
}

describe('UpdateUnit Controller', () => {
  test('Should call UpdateUnit with correct values', async () => {
    const { sut, updateUnitStub } = makeSut()
    const updateSpy = jest.spyOn(updateUnitStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(
      {
        name: 'any_name',
        companyId: 'any_company_id'
      },
      'any_id'
    )
  })

  test('Should return 500 if UpdateUnit throws', async () => {
    const { sut, updateUnitStub } = makeSut()
    jest.spyOn(updateUnitStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404  if UpdateUnit returns string', async () => {
    const { sut, updateUnitStub } = makeSut()
    jest.spyOn(updateUnitStub, 'update').mockReturnValueOnce(new Promise((resolve) => resolve('any_resource')))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound(new NotFoundError('any_resource')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUnit()))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
