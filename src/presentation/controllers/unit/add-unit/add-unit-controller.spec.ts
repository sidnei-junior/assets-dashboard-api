import { UnitModel } from '@/domain/models/unit'
import { AddUnit, AddUnitModel } from '@/domain/usecases/unit/add-unit'
import { HttpRequest, Validation } from '../../account/login/login-controller-protocols'
import { notFound, NotFoundError, ok, ServerError, serverError } from '../../account/signup/signup-controller-protocols'
import { AddUnitController } from './add-unit-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    companyId: 'any_company_id'
  }
})

const makeAddUnit = (): AddUnit => {
  class AddUnitStub implements AddUnit {
    async add(unitData: AddUnitModel): Promise<UnitModel> {
      return makeFakeUnit()
    }
  }

  return new AddUnitStub()
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
  sut: AddUnitController
  addUnitStub: AddUnit
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addUnitStub = makeAddUnit()
  const validationStub = makeValidation()
  const sut = new AddUnitController(addUnitStub, validationStub)
  return { sut, addUnitStub, validationStub }
}

describe('AddUnit Controller', () => {
  test('Should call AddUnit with correct values', async () => {
    const { sut, addUnitStub } = makeSut()
    const addSpy = jest.spyOn(addUnitStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      companyId: 'any_company_id'
    })
  })

  test('Should return 500 if AddUnit throws', async () => {
    const { sut, addUnitStub } = makeSut()
    jest.spyOn(addUnitStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 404 if AddUnit returns null', async () => {
    const { sut, addUnitStub } = makeSut()
    jest.spyOn(addUnitStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound(new NotFoundError('company')))
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
})
