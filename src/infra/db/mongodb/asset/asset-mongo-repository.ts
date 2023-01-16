import { AddAssetRepository } from '@/data/protocols/db/asset/add-asset-repository'
import { DeleteAssetRepository } from '@/data/protocols/db/asset/delete-asset-repository'
import { LoadAssetsByCompanyRepository } from '@/data/protocols/db/asset/load-assets-by-company-repository'
import { LoadAssetsByUnitRepository } from '@/data/protocols/db/asset/load-assets-by-unit-repository'
import { AssetModel } from '@/domain/models/asset'
import { AddAssetModel } from '@/domain/usecases/asset/add-asset'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helper/mongo-helper'

export class AssetMongoRepository
  implements AddAssetRepository, LoadAssetsByUnitRepository, LoadAssetsByCompanyRepository, DeleteAssetRepository
{
  async add(assetData: AddAssetModel): Promise<AssetModel> {
    const assetCollection = await MongoHelper.getCollection('assets')
    const result = await assetCollection.insertOne(assetData)
    const { insertedId: id } = result
    const assetById = await assetCollection.findOne({ _id: id })
    const asset = MongoHelper.map(assetById)
    return asset
  }

  async loadByUnitId(unitId: string): Promise<AssetModel[]> {
    const assetCollection = await MongoHelper.getCollection('assets')
    const assets: AssetModel[] = (await assetCollection.find({ unitId }).toArray()) as unknown as AssetModel[]
    return assets.map((asset) => MongoHelper.map(asset))
  }

  async loadByCompanyId(companyId: string): Promise<AssetModel[]> {
    const assetCollection = await MongoHelper.getCollection('assets')
    const assets: AssetModel[] = (await assetCollection.find({ companyId }).toArray()) as unknown as AssetModel[]
    return assets.map((asset) => MongoHelper.map(asset))
  }

  async delete(id: string): Promise<void> {
    const mongoId = new ObjectId(id)
    const assetCollection = await MongoHelper.getCollection('assets')
    const mongoResponse = await assetCollection.deleteOne({ _id: mongoId })
    const { deletedCount } = mongoResponse
    if (deletedCount === 0) {
      return null
    }
  }
}
