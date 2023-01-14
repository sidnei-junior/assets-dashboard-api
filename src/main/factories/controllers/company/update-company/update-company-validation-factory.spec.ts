import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeUpdateCompanyValidation } from './update-company-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('UpdateCompanyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdateCompanyValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'cnpj']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
