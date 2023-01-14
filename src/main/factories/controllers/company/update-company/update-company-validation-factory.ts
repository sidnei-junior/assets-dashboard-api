import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeUpdateCompanyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cnpj']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
