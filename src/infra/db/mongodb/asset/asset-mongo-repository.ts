import { AddAssetRepository } from '@/data/protocols/db/asset/add-asset-repository'
import { AssetModel } from '@/domain/models/asset'
import { AddAssetModel } from '@/domain/usecases/asset/add-asset'
import { MongoHelper } from '../helper/mongo-helper'

export class AssetMongoRepository implements AddAssetRepository {
  async add(assetData: AddAssetModel): Promise<AssetModel> {
    const assetCollection = await MongoHelper.getCollection('assets')
    const result = await assetCollection.insertOne(assetData)
    const { insertedId: id } = result
    const assetById = await assetCollection.findOne({ _id: id })
    const asset = MongoHelper.map(assetById)
    return asset
  }
}
