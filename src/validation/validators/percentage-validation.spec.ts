import { InvalidParamError } from '@/presentation/errors'
import { PercentageValidation } from './percentage-validation'

const makeSut = (): PercentageValidation => {
  return new PercentageValidation('field')
}

describe('Percentage Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 101 })
    expect(error).toEqual(new InvalidParamError('field'))
    const errorNegativeValue = sut.validate({ field: -1 })
    expect(errorNegativeValue).toEqual(new InvalidParamError('field'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 50 })
    expect(error).toBeFalsy()
  })
})
