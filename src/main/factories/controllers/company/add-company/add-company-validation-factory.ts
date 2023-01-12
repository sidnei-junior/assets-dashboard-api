import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeAddCompanyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cnpj']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
