export enum StatusAsset {
  Running,
  Alerting,
  Stopped
}

export type AssetModel = {
  id: string
  companyId: string
  unitId: string
  ownerId: string
  name: string
  image: string
  description: string
  model: string
  status: StatusAsset
  healthLevel: number
}
