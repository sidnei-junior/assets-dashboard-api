import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeUpdateUnitValidation } from './update-unit-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdateUnitValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateUnitValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'companyId']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
