import { InvalidParamError } from '@/presentation/errors'
import { EnumValueValidation } from './enum-value-validation'

enum MockEnum {
  One,
  Two,
  Three
}

const makeSut = (): EnumValueValidation => {
  return new EnumValueValidation('field', MockEnum)
}

describe('Enum Value Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 3 })
    expect(error).toEqual(new InvalidParamError('field'))
    const errorNegativeValue = sut.validate({ field: -1 })
    expect(errorNegativeValue).toEqual(new InvalidParamError('field'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 1 })
    expect(error).toBeFalsy()
  })
})
