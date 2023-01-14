import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeAddUnitValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'companyId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
