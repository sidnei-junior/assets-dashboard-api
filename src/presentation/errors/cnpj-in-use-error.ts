export class CnpjInUseError extends Error {
  constructor() {
    super('The received cnpj is already in use')
    this.name = 'CnpjInUseError'
  }
}
