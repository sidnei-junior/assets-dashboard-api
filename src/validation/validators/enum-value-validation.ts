import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class EnumValueValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly enumStructure: Object) {}

  validate(input: any): Error {
    if (!this.enumStructure[input[this.fieldName]]) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
