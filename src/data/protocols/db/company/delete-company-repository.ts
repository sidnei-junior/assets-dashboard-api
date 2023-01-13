export interface DeleteCompanyRepository {
  delete: (id: string) => Promise<void>
}
