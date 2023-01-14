export interface DeleteUnitRepository {
  delete: (id: string) => Promise<void>
}
