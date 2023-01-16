export interface DeleteAssetRepository {
  delete: (id: string) => Promise<void>
}
