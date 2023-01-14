export class NotFoundError extends Error {
  constructor(param?: string) {
    super(`Not Found${param ? ' ' + param : ''}`)
    this.name = 'NotFoundError'
  }
}
